import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { NotebookPanel } from '@jupyterlab/notebook';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { reactIcon } from '@jupyterlab/ui-components';
import { requestAPI } from './handler';
import { CounterWidget } from './interface/widget';
import { PasteDetector } from './detector/pasteDetector';
import { LibScanner } from './scanner/libScanner';
import { ActiveCellScanner } from './scanner/activeCellScanner';

namespace CommandIDs {
  export const create = 'create-react-widget';
}

interface questionFlashcard {
  lm_id: number;
  type: "q";
  content: {
    question: string;
    answer: string;
  };
}

interface multipleChoiceFlashcard {
  lm_id: number;
  type: "m";
  content: {
    question: string;
    answer: Array<{ option: string; isCorrect: boolean }>;
  };
}

type flashcard = questionFlashcard | multipleChoiceFlashcard;

interface user {
  user_id: number;
  email: string;
  cards: Array<{
    fc_id: number;
    type: "q" | "m";
    reviewRecord: { // used for "m" only
				gotCorrect: number | null, // used for "m" only
				gotWrong: number | null, // used for "m" only
				passed: number | null, // used for "m" only
				know: number, // updated from mobile app
				forget: number, // updated from mobile app
				oneMore: number, // updated from mobile app
				noMore: number, // updated from mobile app
			},
			seenTime: "YYYYMMDD", // updated from mobile app
			nextReview: "YYYYMMDD", // filled by the SRS algorithm
			createdAt: "", // for this user (mongo)
			updatedAt: "" // for this user (mongo)
  }>;
}

let flashcards: flashcard[] = [];

// Hardcoded for now
let user = {
  user_id: 0,
  email: "example@umich.edu",
  cards: [] as Array<user["cards"]>
}

// Step 1. Get preset flashcards from the backend
const init = async () => {
  const response = await requestAPI<any>('init');
  flashcards = response.flashcards;
  console.log(flashcards);
  for (let i = 0; i < flashcards.length; i++) {
    user.cards.push({
      //@ts-ignore
      fc_id: flashcards[i].lm_id,
      type: flashcards[i].type,
      reviewRecord: {
        gotCorrect: 0,
        gotWrong: 0,
        passed: 0,
        know: 0,
        forget: 0,
        oneMore: 0,
        noMore: 0,
      },
      seenTime: "20200101",
      nextReview: "20200101",
      createdAt: "",
      updatedAt: "",
    });
  }
}

/**
 * Initialization data for the react-widget extension.
 */
const pluginWidget: JupyterFrontEndPlugin<void> = {
  id: 'react-widget',
  autoStart: true,
  optional: [ILauncher, ISettingRegistry],
  activate: (app: JupyterFrontEnd, launcher: ILauncher, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension srs-jupyterlab-extension is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(pluginWidget.id)
        .then(settings => {
          console.log('srs-jupyterlab-extension settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for srs-jupyterlab-extension.', reason);
        });
    }

    const data = {
      "cells": [
        {
          "cell": "Planar data classification with one hidden layer\n" +
            "Welcome to your week 3 programming assignment. It's time to build your first neural network, which will have a hidden layer. You will see a big difference between this model and the one you implemented using logistic regression.\n" +
            "\n" +
            "You will learn how to:\n" +
            "\n" +
            "Implement a 2-class classification neural network with a single hidden layer\n" +
            "Use units with a non-linear activation function, such as tanh\n" +
            "Compute the cross entropy loss\n" +
            "Implement forward and backward propagation\n" +
            "1 - Packages\n" +
            "Let's first import all the packages that you will need during this assignment.\n" +
            "\n" +
            "numpy is the fundamental package for scientific computing with Python.\n" +
            "sklearn provides simple and efficient tools for data mining and data analysis.\n" +
            "matplotlib is a library for plotting graphs in Python.\n" +
            "testCases provides some test examples to assess the correctness of your functions\n" +
            "planar_utils provide various useful functions used in this assignment",
          "celltype": "markdown",
        },
        {
          "cell": "# Package imports\n" +
            "import numpy as np\n" +
            "import matplotlib.pyplot as plt\n" +
            "from testCases_v2 import *\n" +
            "import sklearn\n" +
            "import sklearn.datasets\n" +
            "import sklearn.linear_model\n" +
            "from planar_utils import plot_decision_boundary, sigmoid, load_planar_dataset, load_extra_datasets\n" +
            "\n" +
            "%matplotlib inline\n" +
            "\n" +
            "np.random.seed(1) # set a seed so that the results are consistent",
          "celltype": "code",
        },
        {
          "cell": "First, let's get the dataset you will work on. The following code will load a \"flower\" 2-class dataset into variables X and Y.",
          "celltype": "markdown",
        },
        {
          "cell": "X, Y = load_planar_dataset()",
          "celltype": "code",
        },
        {
          "cell": "Visualize the dataset using matplotlib. The data looks like a \"flower\" with some red (label y=0) and some blue (y=1) points. Your goal is to build a model to fit this data. In other words, we want the classifier to define regions as either red or blue.",
          "celltype": "markdown",
        },
        {
          "cell": "plt.scatter(X[0, :], X[1, :], c=Y, s=40, cmap=plt.cm.Spectral);",
          "celltype": "code",
        },
        {
          "cell": "You have: - a numpy-array (matrix) X that contains your features (x1, x2) - a numpy-array (vector) Y that contains your labels (red:0, blue:1).\n" +
            "\n" +
            "Lets first get a better sense of what our data is like.\n" +
            "\n" +
            "Exercise: How many training examples do you have? In addition, what is the shape of the variables X and Y?\n" +
            "\n" +
            "Hint: How do you get the shape of a numpy array? (help)",
          "celltype": "markdown",
        },
        {
          "cell": "### START CODE HERE ### (≈ 3 lines of code)\n" +
            "shape_X = X.shape\n" +
            "shape_Y = Y.shape\n" +
            "m = (X.size)/shape_X[0]  # training set size\n" +
            "### END CODE HERE ###\n" +
            "\n" +
            "print ('The shape of X is: ' + str(shape_X))\n" +
            "print ('The shape of Y is: ' + str(shape_Y))\n" +
            "print ('I have m = %d training examples!' % (m))",
          "celltype": "code",
        }
      ],
    "metadata": {}
    }

    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    let flashcard: JSON[] = [];

    requestAPI("/data", init)
      .then(response => {
        console.log("Response from server:", response);
        // Change the type of response to the string
        // @ts-ignore
        flashcard = response as JSON[];
      })
      .catch(error => {
        console.error("Error from server:", error);
      });

    const { commands } = app;

    const command = CommandIDs.create;
    commands.addCommand(command, {
      caption: 'Create a new React Widget',
      label: 'React Widget',
      // @ts-ignore
      icon: (args) => (args['isPalette'] ? null : reactIcon),
      execute: () => {
        const content = new CounterWidget(flashcard);
        const widget = new MainAreaWidget<CounterWidget>({ content });
        widget.title.label = 'React Widget';
        widget.title.icon = reactIcon;
        app.shell.add(widget, 'main');
      },
    });

    if (launcher) {
      launcher.add({
        command,
      });
    }
  },
};

const pluginLibScanner: JupyterFrontEndPlugin<void> = {
  id: 'library-detector',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    app.commands.addCommand('library-detector:open', {
      label: 'Library Detector',
      execute: () => {
        console.log('Library Detector activated!');
        const panel = app.shell.currentWidget as NotebookPanel;
        const libDetector = new LibScanner(panel);
        libDetector.detectLib();
    }});

    app.contextMenu.addItem({
      command: 'library-detector:open',
      selector: '.jp-Notebook',
      rank: 0,
    });}
}

const pluginActiveCellScanner: JupyterFrontEndPlugin<void> = {
  id: 'active-cell-detector',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    app.commands.addCommand('active-cell-detector:open', {
      label: 'Active Cell Detector',
      execute: () => {
        console.log('Active Cell Detector activated!');
        const panel = app.shell.currentWidget as NotebookPanel;
        const activeCellDetector = new ActiveCellScanner(panel);
        activeCellDetector.scanActiveCell();
    }});

    app.contextMenu.addItem({
      command: 'active-cell-detector:open',
      selector: '.jp-Notebook',
      rank: 0,
    });
  }
}

const pluginPasteDetector: JupyterFrontEndPlugin<void> = {
  id: 'paste-detector',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    app.commands.addCommand('paste-detector:open', {
      label: 'Paste Detector',
      execute: () => {

        const pasteDetector = new PasteDetector();
        document.addEventListener('paste', (event) => {
          // @ts-ignore
          const clipboardData = event.clipboardData.getData('text/plain');
          if (clipboardData) {
            // Access the clipboard data here
            console.log('Clipboard data:', clipboardData);
          }
          pasteDetector.detectPaste();
        });

    }});

    app.contextMenu.addItem({
      command: 'paste-detector:open',
      selector: '.jp-Notebook',
      rank: 0,
    });
  }
}



export default [pluginWidget, pluginLibScanner, pluginActiveCellScanner, pluginPasteDetector];

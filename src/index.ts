import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
// import { ISettingRegistry } from '@jupyterlab/settingregistry';
// import { MainAreaWidget } from '@jupyterlab/apputils';
// import { ILauncher } from '@jupyterlab/launcher';
// import { reactIcon } from '@jupyterlab/ui-components';
import { requestAPI } from './handler';
// import { CounterWidget } from './interface/widget';
import { LibScanner } from './scanner/libScanner';
import { ActiveCellScanner } from './scanner/activeCellScanner';
import { MdCellScanner } from './scanner/mdCellScanner';
import { ValidateDetector } from './detector/validateDetector';
import { PasteDetector } from './detector/pasteDetector';
// @ts-ignore
import { lm } from './interface/lm';
import { flashcard } from './interface/flashcard';

// namespace CommandIDs {
//   export const create = 'create-react-widget';
// }

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

const init = async (notebookId :number) => {
  const response = await requestAPI<any>('init', {
    method: 'POST',
    body: JSON.stringify({ notebookId })
  });
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

const extension: JupyterFrontEndPlugin<void> = {
  id: 'srs-jupyterlab-extension',
  autoStart: true,
  requires: [INotebookTracker],
  activate: activate
}

function activate(app: JupyterFrontEnd, notebooks: INotebookTracker): void {
  // Whenever a notebook is opened or switched,
  // attach the validator detector to it
  notebooks.currentChanged.connect((_, notebook) => {
    if (notebook) {
      // Get notebook name
      const notebookPath = notebook.context.path;
      // Extract notebook name from path
      const notebookNameArray = notebookPath.split("/");
      const notebookName = notebookNameArray[notebookNameArray.length - 1];
      if (notebookName === "assignment1.ipynb" || notebookName === "assignment2.ipynb") {
        // Grab the id from notebookname
        const notebookId : number = parseInt(notebookName.split(".")[0].split("assignment")[1]);
        // Initialize the flashcards
        init(notebookId).then(() => {
          console.log("Initialization complete");
        });
        const vdetector = new ValidateDetector();
        const pdetector = new PasteDetector();
        // While either validate or paste is detected, activate the scanners
        while (vdetector.detect() || pdetector.detect()) {
          const ascanner = new ActiveCellScanner(notebook);
          const lscanner = new LibScanner(notebook);
          const mscanner = new MdCellScanner(notebook);
          ascanner.scan();
          lscanner.scan();
          mscanner.scan();
          // Generate personalized flashcards
        }
      }
      else {
        console.log("Notebook not supported");
      }
    }
  });
}

// const pluginWidget: JupyterFrontEndPlugin<void> = {
//   id: 'react-widget',
//   autoStart: true,
//   optional: [ILauncher, ISettingRegistry],
//   activate: (app: JupyterFrontEnd, launcher: ILauncher, settingRegistry: ISettingRegistry | null) => {
//     console.log('JupyterLab extension srs-jupyterlab-extension is activated!');
//
//     if (settingRegistry) {
//       settingRegistry
//         .load(pluginWidget.id)
//         .then(settings => {
//           console.log('srs-jupyterlab-extension settings loaded:', settings.composite);
//         })
//         .catch(reason => {
//           console.error('Failed to load settings for srs-jupyterlab-extension.', reason);
//         });
//     }
//
//     const data = {
//       "cells": [
//         {
//           "cell": "Planar data classification with one hidden layer\n" +
//             "Welcome to your week 3 programming assignment. It's time to build your first neural network, which will have a hidden layer. You will see a big difference between this model and the one you implemented using logistic regression.\n" +
//             "\n" +
//             "You will learn how to:\n" +
//             "\n" +
//             "Implement a 2-class classification neural network with a single hidden layer\n" +
//             "Use units with a non-linear activation function, such as tanh\n" +
//             "Compute the cross entropy loss\n" +
//             "Implement forward and backward propagation\n" +
//             "1 - Packages\n" +
//             "Let's first import all the packages that you will need during this assignment.\n" +
//             "\n" +
//             "numpy is the fundamental package for scientific computing with Python.\n" +
//             "sklearn provides simple and efficient tools for data mining and data analysis.\n" +
//             "matplotlib is a library for plotting graphs in Python.\n" +
//             "testCases provides some test examples to assess the correctness of your functions\n" +
//             "planar_utils provide various useful functions used in this assignment",
//           "celltype": "markdown",
//         },
//         {
//           "cell": "# Package imports\n" +
//             "import numpy as np\n" +
//             "import matplotlib.pyplot as plt\n" +
//             "from testCases_v2 import *\n" +
//             "import sklearn\n" +
//             "import sklearn.datasets\n" +
//             "import sklearn.linear_model\n" +
//             "from planar_utils import plot_decision_boundary, sigmoid, load_planar_dataset, load_extra_datasets\n" +
//             "\n" +
//             "%matplotlib inline\n" +
//             "\n" +
//             "np.random.seed(1) # set a seed so that the results are consistent",
//           "celltype": "code",
//         },
//         {
//           "cell": "First, let's get the dataset you will work on. The following code will load a \"flower\" 2-class dataset into variables X and Y.",
//           "celltype": "markdown",
//         },
//         {
//           "cell": "X, Y = load_planar_dataset()",
//           "celltype": "code",
//         },
//         {
//           "cell": "Visualize the dataset using matplotlib. The data looks like a \"flower\" with some red (label y=0) and some blue (y=1) points. Your goal is to build a model to fit this data. In other words, we want the classifier to define regions as either red or blue.",
//           "celltype": "markdown",
//         },
//         {
//           "cell": "plt.scatter(X[0, :], X[1, :], c=Y, s=40, cmap=plt.cm.Spectral);",
//           "celltype": "code",
//         },
//         {
//           "cell": "You have: - a numpy-array (matrix) X that contains your features (x1, x2) - a numpy-array (vector) Y that contains your labels (red:0, blue:1).\n" +
//             "\n" +
//             "Lets first get a better sense of what our data is like.\n" +
//             "\n" +
//             "Exercise: How many training examples do you have? In addition, what is the shape of the variables X and Y?\n" +
//             "\n" +
//             "Hint: How do you get the shape of a numpy array? (help)",
//           "celltype": "markdown",
//         },
//         {
//           "cell": "### START CODE HERE ### (≈ 3 lines of code)\n" +
//             "shape_X = X.shape\n" +
//             "shape_Y = Y.shape\n" +
//             "m = (X.size)/shape_X[0]  # training set size\n" +
//             "### END CODE HERE ###\n" +
//             "\n" +
//             "print ('The shape of X is: ' + str(shape_X))\n" +
//             "print ('The shape of Y is: ' + str(shape_Y))\n" +
//             "print ('I have m = %d training examples!' % (m))",
//           "celltype": "code",
//         }
//       ],
//     "metadata": {}
//     }
//
//     const init = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     };
//
//     let flashcard: JSON[] = [];
//
//     requestAPI("/data", init)
//       .then(response => {
//         console.log("Response from server:", response);
//         // Change the type of response to the string
//         // @ts-ignore
//         flashcard = response as JSON[];
//       })
//       .catch(error => {
//         console.error("Error from server:", error);
//       });
//
//     const { commands } = app;
//
//     const command = CommandIDs.create;
//     commands.addCommand(command, {
//       caption: 'Create a new React Widget',
//       label: 'React Widget',
//       // @ts-ignore
//       icon: (args) => (args['isPalette'] ? null : reactIcon),
//       execute: () => {
//         const content = new CounterWidget(flashcard);
//         const widget = new MainAreaWidget<CounterWidget>({ content });
//         widget.title.label = 'React Widget';
//         widget.title.icon = reactIcon;
//         app.shell.add(widget, 'main');
//       },
//     });
//
//     if (launcher) {
//       launcher.add({
//         command,
//       });
//     }
//   },
// };

// export default [extension, pluginWidget];
export default extension;

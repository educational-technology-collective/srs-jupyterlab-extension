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
import { CounterWidget } from './widget';
import { PasteDetector } from './pasteDetector';
import { LibDetector } from './libDetector';

/**
 * The command IDs used by the react-widget plugin.
 */
namespace CommandIDs {
  export const create = 'create-react-widget';
  export const detectPaste = 'detect-paste';
  export const detectLib = 'detect-lib';
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
          "cell": "Assignment 1\n" +
            "Before you start working on the problems, here is a small example to help you understand how to write your answers. The solution should be written within the function body given, and the final result should be returned. Then the autograder will try to call the function and validate your returned result accordingly. Before submitting to the autograder, see if the tests we have included with this file pass by pressing the Validate button on the toolbar.\n" +
            "Note: For all assignments please write all of your code within the function we define in order to ensure it is run by the autograder correctly",
          "celltype": "markdown",
          // add more key-value pairs as needed
        },
        {
          "cell": "Question 1: names()\n" +
            "Fix the incorrect regex between ### FIX CODE BELOW and ### FIX CODE ABOVE to generate a list of names in the simple_string.",
          "celltype": "markdown",
        },
        {
          "cell": "def names():\n" +
            "    import re\n" +
            "    simple_string = \"\"\"Amy is 5 years old, and her sister Mary is 2 years old. \n" +
            "    Ruth and Peter, their parents, have 3 kids.\"\"\"\n" +
            "\n" +
            "    ### FIX CODE BELOW  \n" +
            "    pattern = r'[A-Za-z]?'\n" +
            "    match = re.finditer(pattern, simple_string)\n" +
            "    ### FIX CODE ABOVE  \n" +
            "    \n" +
            "    ### BEGIN SOLUTION\n" +
            "    pattern = r'[A-Z][a-z]*'\n" +
            "    match = re.findall(pattern, simple_string)\n" +
            "\n" +
            "    # Alternative answers: \n" +
            "    # pattern = r'[A-Z]\\w+'\n" +
            "    # pattern = r'[A-Z]\\S+'\n" +
            "    ### END SOLUTION\n" +
            "    \n" +
            "    return match\n" +
            "    \n" +
            "names()",
          "celltype": "code",
        },
        {
          "cell": "Question 2: student_grades()\n" +
            "The dataset file in assets/grades.txt contains multiple lines of people along with their grades in a class. Fix the incorrect regex between ### FIX CODE BELOW and ### FIX CODE ABOVE to generate a list of just those students who received a B in the course (e.g., ['John Doe', 'Jane Doe'].)",
          "celltype": "markdown",
        },
        {
          "cell": "def student_grades():\n" +
            "    import re\n" +
            "    with open (\"assets/grades.txt\", \"r\") as file:\n" +
            "        grades = file.read()\n" +
            "\n" +
            "    ### FIX CODE BELOW\n" +
            "    pattern = \"\"\"(\\w+)\"\"\"\n" +
            "    matches = re.findall(pattern,grades)\n" +
            "    ### FIX CODE ABOVE\n" +
            "        \n" +
            "        \n" +
            "    ### BEGIN SOLUTION\n" +
            "    pattern = re.compile(r'\\w+\\s\\w+(?=: B)')\n" +
            "    matches = re.findall(pattern,grades)\n" +
            "\n" +
            "    # Alternative answers: \n" +
            "    # pattern = \"\"\"(?P<test>\\w+\\s+\\w+): B\"\"\"\n" +
            "    \n" +
            "    ### END SOLUTION   \n" +
            "\n" +
            "    return matches  \n" +
            "    \n" +
            "student_grades()",
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

    let flashcard;

    requestAPI("/data", init)
      .then(response => {
        console.log("Response from server:", response);
        flashcard = response;
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
        const content = new CounterWidget();
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

const pluginLibraryDetector: JupyterFrontEndPlugin<void> = {
  id: 'library-detector',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    app.commands.addCommand('library-detector:open', {
      label: 'Library Detector',
      execute: () => {
        console.log('Library Detector activated!');
        const panel = app.shell.currentWidget as NotebookPanel;
        const libDetector = new LibDetector(panel);
        libDetector.detectLib();
    }});

    app.contextMenu.addItem({
      command: 'library-detector:open',
      selector: '.jp-Notebook',
      rank: 0,
    });}

}

export default [pluginWidget, pluginPasteDetector, pluginLibraryDetector];

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { ErrorCellDetector } from './detector/errorCellDetector';
import { CopyPasteDetector } from './detector/copyPasteDetector';

function getAssignmentId(currentNotebookPath: string): number {
  const notebookName = currentNotebookPath.split("/")[currentNotebookPath.split("/").length - 1];
  if (notebookName === "assignment1.ipynb" || notebookName === "assignment2.ipynb" || notebookName === "assignment3.ipynb" || notebookName === "assignment4.ipynb") {
    const assignmentId = parseInt(notebookName.split(".")[0].split("assignment")[1]);
    return assignmentId;
  }
  else {
    return -1;
  }
}

function getUserId(notebookPanel: NotebookPanel): string {
  const cell0 = notebookPanel.content.widgets[0];
  let userId = "";
  // Search for string ends with @umich.edu
  // @ts-ignore
  for (let i = 0; i < cell0.model.toJSON()['source'].split("\n").length; i++) {
    // @ts-ignore
    const line = cell0.model.toJSON()['source'].split("\n")[i];
    if (line.endsWith("@umich.edu")) {
      userId = line;
      break;
    }
  }
  return userId;
}

function activate(app: JupyterFrontEnd, iNotebookTracker: INotebookTracker): void {
  console.log('JupyterLab extension srs-jupyterlab-extension is activated!');

  // Each time a notebook is opened, check if it is an assignment notebook
  iNotebookTracker.currentChanged.connect((_, notebookPanel) => {
    const currentNotebookPath = notebookPanel?.context.path;
    if (currentNotebookPath) {
      const assignmentId = getAssignmentId(currentNotebookPath);
      const userId = getUserId(notebookPanel);
      console.log("Assignment ID:", assignmentId);
      console.log("User ID:", userId);
      if (assignmentId !== -1 && userId !== "") {

        if (!CopyPasteDetector.isInitialized()) {
          CopyPasteDetector.initialize(notebookPanel, iNotebookTracker, assignmentId);
        }
        const cp = CopyPasteDetector.getInstance(notebookPanel, iNotebookTracker);
        const ec = new ErrorCellDetector(notebookPanel, iNotebookTracker, assignmentId);
        cp.run();
        ec.run();
      }
      else {
        console.log("Not an assignment notebook!");
      }
    }
  });
}

const srsExtension: JupyterFrontEndPlugin<void> = {
  id: 'srs-jupyterlab-extension',
  autoStart: true,
  requires: [INotebookTracker],
  activate: activate
}

export default srsExtension;

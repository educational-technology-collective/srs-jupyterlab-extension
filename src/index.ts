import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { ErrorCellDetector } from './detector/errorCellDetector';
import { CopyPasteDetector } from './detector/copyPasteDetector';

/*
  * Get assignment ID from notebook path
  * @param {string} currentNotebookPath - The path of the current notebook.
  * @return {number} - The assignment ID.
 */
function getAssignmentId(currentNotebookPath: string): number {
  const notebookName = currentNotebookPath.split("/")[currentNotebookPath.split("/").length - 1];
  let assignmentId = -1;

  if (notebookName === "assignment1.ipynb" || notebookName === "assignment2.ipynb" || notebookName === "assignment3.ipynb" || notebookName === "assignment4.ipynb") {
    assignmentId = parseInt(notebookName.split(".")[0].split("assignment")[1]);
  }

  return assignmentId;
}

/*
  * Get user ID from notebook
  * @param {NotebookPanel} notebookPanel - The current notebook panel.
  * @return {string} - The user ID.
 */
async function getUserId(notebookPanel: NotebookPanel): Promise<string> {
  await notebookPanel.context.ready;
  const cell0 = notebookPanel.content.widgets[0];
  let userId = "";

  // Search for string ends with @umich.edu
  let source = cell0.model.toJSON()['source'];
  if (Array.isArray(source)) {
    source = source.join('\n');
  }
  for (let i = 0; i < source.split("\n").length; i++) {
    const line = source.split("\n")[i];
    if (line.endsWith("@umich.edu")) {
      userId = line;
      break;
    }
  }

  return userId;
}

/*
  * Initialize detectors for the current notebook
  * @param {string} currentNotebookPath - The path of the current notebook.
  * @param {INotebookTracker} iNotebookTracker - The notebook tracker.
  * @param {NotebookPanel} notebookPanel - The current notebook panel.
  * @return {Promise<void>} - A promise that resolves to void.
 */
async function initializeDetectors(currentNotebookPath: string | undefined, iNotebookTracker: INotebookTracker, notebookPanel: NotebookPanel): Promise<void> {
  console.log("Initializing detectors...")
  if (currentNotebookPath) {
    const assignmentId = getAssignmentId(currentNotebookPath);
    const userId = await getUserId(notebookPanel);
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
}

/*
  * Activate the extension
  * @param {JupyterFrontEnd} app - The JupyterLab application instance.
  * @param {INotebookTracker} iNotebookTracker - The notebook tracker.
  * @return {void} - A void.
 */
function activate(app: JupyterFrontEnd, iNotebookTracker: INotebookTracker): void {
  console.log('JupyterLab extension srs-jupyterlab-extension is activated!');

  // Initialize detectors for already opened notebook (if any)
  if (iNotebookTracker.currentWidget) {
    const currentNotebookPath = iNotebookTracker.currentWidget.context.path;
    initializeDetectors(currentNotebookPath, iNotebookTracker, iNotebookTracker.currentWidget);
  }

  // Initialize detectors for newly opened notebooks
  iNotebookTracker.currentChanged.connect((_, notebookPanel) => {
    const currentNotebookPath = notebookPanel?.context.path;
    if (iNotebookTracker.currentWidget) {
      initializeDetectors(currentNotebookPath, iNotebookTracker, iNotebookTracker.currentWidget);
    }
  });
}

/*
 * Initialization data for the srs-jupyterlab-extension extension.
 * @param {JupyterFrontEndPlugin<void>} srsExtension - The extension.
 * @return {void} - A void.
 */
const srsExtension: JupyterFrontEndPlugin<void> = {
  id: 'srs-jupyterlab-extension',
  autoStart: true,
  requires: [INotebookTracker],
  activate: activate
}

export default srsExtension;

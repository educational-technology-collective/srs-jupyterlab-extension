import { BaseDetector } from './baseDetector';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
// import { Clipboard } from '@jupyterlab/apputils';
// import { MimeData } from '@lumino/coreutils';

export class CopyPasteDetector extends BaseDetector{
  private _clipboard: string = '';

  constructor(notebookPanel: NotebookPanel, iNotebookTracker: INotebookTracker) {
    super(notebookPanel, iNotebookTracker);
    console.log('CopyPasteDetector constructor');
  }

  public detect() : Promise<boolean> {
    console.log('Paste detected!');

    return new Promise((resolve) => {
      document.addEventListener('paste', async (event) => {
        // @ts-ignore
        const clipboardData = event.clipboardData.getData('text/plain');
        this._clipboard = clipboardData;
        console.log('Pasted content:', clipboardData);

        if (this.isValidLearningMoment()) {
          const cellId = this.getCurrentCellId();
          const lineNum = this.getLineNum();
          const timestamp = this.getCurrentTimestamp();
          console.log(`Cell ID: ${cellId}`);
          console.log(`Line number: ${lineNum}`);
          console.log(`Timestamp: ${timestamp}`);
        }

        resolve(true);
      });
    });
  }

  public isValidLearningMoment(): boolean {
    console.log('Checking if learning moment is valid...');

    // Check if the paste event is triggered from the notebook by searching the notebook if it has the pasted content
    const pasteContent = this._clipboard;
    // Get text from all cells in the notebook
    const cells = this.notebookPanel.content.widgets;
    let notebookContent = '';
    for (let i = 0; i < cells.length; i++) {
      notebookContent += cells[i].model.toString();
    }
    console.log('Notebook content:', notebookContent);
    // Check if the notebook content contains the pasted content
    if (notebookContent.includes(pasteContent)) {
      console.log('Pasted content is in the notebook!');
    }
    else {
      console.log('Pasted content is not in the notebook!');
    }

    return true;
  }
}

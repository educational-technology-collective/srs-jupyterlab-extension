import { BaseDetector } from './baseDetector';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { Clipboard } from '@jupyterlab/apputils';
import { MimeData } from '@lumino/coreutils';

export class CopyPasteDetector extends BaseDetector{
  private _clipboard: MimeData = Clipboard.getInstance();

  constructor(notebookPanel: NotebookPanel, iNotebookTracker: INotebookTracker) {
    super(notebookPanel, iNotebookTracker);
    console.log('CopyPasteDetector constructor');
  }

  public detect() : boolean {
    console.log('Paste detected!');

    document.addEventListener('paste', (event) => {
    // @ts-ignore
    const clipboardData = event.clipboardData.getData('text/plain');
    if (clipboardData) {
      // Access the clipboard data here
      console.log('Clipboard data:', clipboardData);
      // Check if the paste event is triggered from the notebook
      if (this._clipboard.hasData('application/x-jupyterlab-cell-traceback')) {
        console.log('Paste event triggered from the notebook!');
      }
      else {
        console.log('Paste event triggered from outside the notebook!');
      }
      this._clipboard.setData('text/plain', clipboardData);
    }
    });

    return true;
  }

  public ifLearningMomentIsValid(): boolean {
    return true;
  }
}

import { Clipboard } from '@jupyterlab/apputils';
import { MimeData } from '@lumino/coreutils';

export class PasteDetector {
  private _clipboard: MimeData;

  constructor() {
    this._clipboard = Clipboard.getInstance();
    console.log('PasteDetector constructor called!');
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
}

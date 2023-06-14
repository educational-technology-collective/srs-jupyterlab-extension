import { Clipboard } from '@jupyterlab/apputils';
import { MimeData } from '@lumino/coreutils';

export class PasteDetector {
  private _clipboard: MimeData;


  constructor() {
    this._clipboard = Clipboard.getInstance();
    console.log('PasteDetector constructor called!');
  }

  public detectPaste() {
    console.log('Paste detected!');

    const dataTypes = this._clipboard.types();
    console.log(`Clipboard data types: ${dataTypes}`);

    const dataTypesLength = dataTypes.length;
    console.log(`Clipboard data types length: ${dataTypesLength}`);

    const hasData = this._clipboard.hasData('text/plain');
    console.log(`Clipboard has text/plain data: ${hasData}`);

    const pasteContent = this._clipboard.getData('text/plain');
    console.log(`Paste content: ${pasteContent}`);
  }
}
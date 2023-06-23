import { NotebookPanel } from '@jupyterlab/notebook';

export class ActiveCellScanner {
private _notebookPanel: NotebookPanel;

  constructor(notebookPanel: NotebookPanel) {
    this._notebookPanel = notebookPanel;
    console.log('ActiveCellScanner constructor called!');
  }

  // Grab code from the active cell.
  public scanActiveCell() {
    const notebook = this._notebookPanel.content;
    const activeCell = notebook.activeCell;
    if (activeCell?.model.type === 'markdown') {
      console.log('Markdown cell detected!');
    }
    else if (activeCell?.model.type === 'code') {
      console.log('Code cell detected!');
      // Grab code from the active cell.
      const code = activeCell.model.toJSON().source;
      console.log(`Code: ${code}`);
    }
  }
}
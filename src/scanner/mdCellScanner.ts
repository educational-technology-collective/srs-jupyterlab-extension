import { NotebookPanel } from '@jupyterlab/notebook';

export class MdCellScanner {
  private _notebookPanel: NotebookPanel;

  constructor(notebookPanel: NotebookPanel) {
    this._notebookPanel = notebookPanel;
    console.log('MdCellScanner constructor called!');
  }

  // Scan all markdown cells before the active cell.
  public scan() {
    const notebook = this._notebookPanel.content;
    const activeCell = notebook.activeCell;
    const cells = notebook.widgets;
    const activeCellIndex = cells.findIndex((cell) => cell === activeCell);
    const mdCells = cells.slice(0, activeCellIndex).filter((cell) => cell.model.type === 'markdown');
    console.log(`Number of markdown cells: ${mdCells.length}`);
    mdCells.forEach((cell) => {
      console.log(`Markdown cell: ${cell.model.toJSON().source}`);
    });
  }
}
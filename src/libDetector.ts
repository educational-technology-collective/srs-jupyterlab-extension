import { NotebookPanel } from '@jupyterlab/notebook';

export class LibDetector {
  private _notebookPanel: NotebookPanel;

  constructor(notebookPanel: NotebookPanel) {
    this._notebookPanel = notebookPanel;
    console.log('LibDetector constructor called!');
    console.log(`Notebook panel: ${this._notebookPanel}`);
  }

  // Detect which libraries get imported in the notebook.
  public detectLib() {
    const notebook = this._notebookPanel.content;
    console.log(`Notebook: ${notebook}`)
    const activeCell = notebook.activeCell;
    console.log(`Active cell: ${activeCell}`);
    console.log(`Active cell model: ${activeCell?.model}`)
    console.log(`Active cell model type: ${activeCell?.model.type}`)
    if (activeCell?.model.type === 'markdown') {
      console.log('Markdown cell detected!');
    }
    else if (activeCell?.model.type === 'code') {
      console.log('Code cell detected!');
      // Search for import statements in the code cell.
      const code = activeCell.model.toJSON().source;
      console.log(`Code: ${code}`);
      // If code is string[], join the array into a single string.
      if (Array.isArray(code)) {
        code.join('');
      }
      const importRegex = /import\s+(?:\*\s+as\s+\w+\s+from\s+)?(?:(?:(?:\w+|\{(?:\s*\w+\s*(?:,\s*\w+\s*)*)?\})\s+from\s+)?['"]([^'"]+)['"]|['"]([^'"]+)['"])/g;
      let match;
      while ((match = importRegex.exec(<string>code)) !== null) {
        const lib = match[1] || match[2];
        console.log(`Library detected: ${lib}`);
      }
    }
  }
}
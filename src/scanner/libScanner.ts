import { NotebookPanel } from '@jupyterlab/notebook';

export class LibScanner {
  private _notebookPanel: NotebookPanel;

  constructor(notebookPanel: NotebookPanel) {
    this._notebookPanel = notebookPanel;
    console.log('LibDetector constructor called!');
  }

  // Detect which libraries get imported in the notebook.
  public detectLib() {
    const notebook = this._notebookPanel.content;
    const activeCell = notebook.activeCell;
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
        console.log(`CodeJoined: ${code}`)
      }
      const importRegex = /^\s*import\s+(\w+)(?:\s+as\s+(\w+))?/;
      // @ts-ignore
      const importMatch = code.match(importRegex);
      if (importMatch) {
        console.log(`Import statement detected: ${importMatch[0]}`);
        console.log(`Imported library: ${importMatch[1]}`);
        console.log(`Imported library as: ${importMatch[2]}`);
      }
    }
  }
}

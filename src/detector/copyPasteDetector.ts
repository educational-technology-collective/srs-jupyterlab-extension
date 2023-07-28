import { BaseDetector } from './baseDetector';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { context } from '../interface/context';
import { copyPasteUserActivity } from '../interface/userActivity';
import { learningMoment } from '../interface/learningMoment';
// import { Clipboard } from '@jupyterlab/apputils';
// import { MimeData } from '@lumino/coreutils';

export class CopyPasteDetector extends BaseDetector{
  private _clipboard: string = '';

  constructor(notebookPanel: NotebookPanel, iNotebookTracker: INotebookTracker, assignmentId: number) {
    super(notebookPanel, iNotebookTracker, assignmentId);
    console.log('CopyPasteDetector constructor');
  }

  public run(): void {
    console.log('CopyPasteDetector run');
    const notebookContent = this.getTextFromAllCells();
    document.addEventListener('paste', async (event) => {
      if (event.clipboardData) {
        const clipboardData = event.clipboardData.getData('text/plain');
        this._clipboard = clipboardData;
        const cellId = this.getCurrentCellId();

        if (this.isValidLearningMoment(cellId, notebookContent)) {
          console.log('Valid learning moment!');

          const questionId = this.cellIdToQuestionId(this.getCurrentCellId());
          const context: context = await this.getContext(this.assignmentId, questionId);
          const userActivity: copyPasteUserActivity = {
            cellId: this.getCurrentCellId(),
            lineNum: this.getLineNum(),
            timestamp: this.getCurrentTimestamp(),
            content: {
              pasteContent: this._clipboard
            }
          }

          const lm : learningMoment = {
            platform: 'jupyter',
            contentType: 'copyPaste',
            content: {
              context: context,
              userActivity: userActivity
            },
            visibility: 'dev'
          }

          console.log('Captured Learning Moment:', lm);
          // await this.postLearningMoment(lm);
          // const flashcard = await this.postGPT(lm);
          // await this.postFlashcards(flashcard);
        }
        else {
          console.log('Invalid learning moment!');
        }
      }

    });
  }

  public getTextFromAllCells(): string {
    const cells = this.notebookPanel.content.widgets;
    let notebookContent = '';
    for (let i = 0; i < cells.length; i++) {
      notebookContent += cells[i].model.toJSON()['source'];
    }
    return notebookContent;
  }

  public isValidLearningMoment(cellId: string, notebookContent: string): boolean {
    if (this.cellIdToQuestionId(cellId) === '') {
      console.log('Not a valid learning moment!');
      return false;
    }
    else {
      // Check if the paste event is triggered from the notebook by searching the notebook if it has the pasted content
      const pasteContent = this._clipboard;
      console.log('Pasted content in isValidLearningMoment:', pasteContent)

      // Check if the notebook content contains the pasted content
      if (notebookContent.includes(pasteContent)) {
        console.log('Pasted content is in the notebook!');
        console.log('Not a valid learning moment!');
        return false;
      }
      else {
        console.log('Pasted content is not in the notebook!');
        return true;
      }
    }
  }

}

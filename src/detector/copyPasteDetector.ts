import { BaseDetector } from './baseDetector';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { context } from '../interface/context';
import { copyPasteUserActivity } from '../interface/userActivity';
import { learningMoment } from '../interface/learningMoment';

export class CopyPasteDetector extends BaseDetector{
  private _clipboard: string = '';
  private _notebookContent: string = '';

  constructor(notebookPanel: NotebookPanel, iNotebookTracker: INotebookTracker, assignmentId: number) {
    super(notebookPanel, iNotebookTracker, assignmentId);
    this._notebookContent = this.getTextFromAllCells();
  }

  public run(): void {
    console.log('CopyPasteDetector run');
    const string = this.getTextFromAllCells();
    console.log('Notebook content:', string);

    document.addEventListener('paste', async (event) => {
      if (event.clipboardData) {
        const clipboardData = event.clipboardData.getData('text/plain');
        this._clipboard = clipboardData;

        const cellId = this.getCurrentCellId();
        const lineNum = this.getLineNum();
        const timestamp = this.getCurrentTimestamp();

        if (this.isValidLearningMoment(this.getCurrentCellId())) {
          console.log('Run A');

          const questionId = this.cellIdToQuestionId(this.getCurrentCellId());
          console.log('About to call getContext...');
          const context: context = await this.getContext(this.assignmentId, questionId);
          console.log('About to call getContext...');
          const userActivity: copyPasteUserActivity = {
            cellId: cellId,
            lineNum: lineNum,
            timestamp: timestamp,
            content: {
              pasteContent: this._clipboard
            }
          }

          console.log('Run B');

          const lm : learningMoment = {
            platform: 'jupyter',
            contentType: 'copyPaste',
            content: {
              context: context,
              userActivity: userActivity
            },
            visibility: 'dev'
          }

          console.log('Run D');

          console.log('Captured Learning Moment:', lm);
          // await this.postLearningMoment(lm);
          // const flashcard = await this.postGPT(lm);
          // await this.postFlashcards(flashcard);

          console.log('Run E');
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
    console.log('Notebook content:', notebookContent)
    return notebookContent;
  }

  public isValidLearningMoment(cellId: string): boolean {
    if (this.cellIdToQuestionId(cellId) === '') {
      console.log('Not a valid learning moment!');
      return false;
    }
    else {
      // Check if the paste event is triggered from the notebook by searching the notebook if it has the pasted content
      const pasteContent = this._clipboard;
      console.log("notebook content:", this._notebookContent);

      // Check if the notebook content contains the pasted content
      if (this._notebookContent.includes(pasteContent)) {
        console.log('Not a valid learning moment!');
        return false;
      }
      else {
        console.log('Valid learning moment!');
        return true;
      }
    }
  }

}

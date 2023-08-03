import { BaseDetector } from './baseDetector';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { context } from '../interface/context';
import { copyPasteUserActivity } from '../interface/userActivity';
import { learningMoment } from '../interface/learningMoment';

export class CopyPasteDetector extends BaseDetector{
  private _copiedContent: string = '';
  private _clipboard: string = '';
  private static _instance: CopyPasteDetector | null = null;

  private constructor(notebookPanel: NotebookPanel, iNotebookTracker: INotebookTracker, assignmentId: number, userId: string) {
    super(notebookPanel, iNotebookTracker, assignmentId, userId);
    this.registerEventListeners();

    CopyPasteDetector._instance = this;
  }

  private registerEventListeners(): void {
    document.addEventListener('copy', async (event) => {
      if (event.clipboardData) {
        this._copiedContent = window.getSelection()?.toString() || '';
        console.log('Copied content:', this._copiedContent);
      }
    });


    document.addEventListener('paste', async (event) => {
      if (event.clipboardData) {
        const clipboardData = event.clipboardData.getData('text/plain');
        this._clipboard = clipboardData;
        console.log('Pasted content:', this._clipboard);

        const cellId = this.getCurrentCellId();
        const lineNum = this.getLineNum();
        const timestamp = this.getCurrentTimestamp();

        const boolean = this.isValidLearningMoment(this.getCurrentCellId());

        if (boolean) {
          const questionId = this.cellIdToQuestionId(this.getCurrentCellId());
          const context: context = await this.getContext(this.assignmentId, questionId);
          const userActivity: copyPasteUserActivity = {
            cellId: cellId,
            lineNum: lineNum,
            timestamp: timestamp,
            content: {
              pasteContent: this._clipboard
            }
          }

          const lm : learningMoment = {
            userId: this.userId,
            platform: 'jupyter',
            contentType: 'copyPaste',
            content: {
              context: context,
              userActivity: userActivity
            },
            visibility: 'dev'
          }

          console.log('Captured Learning Moment:', lm);

          await this.postLearningMoment(lm);
          // const flashcard = await this.postGPT(lm);
          // await this.postFlashcards(flashcard);
        }
      }
    });
  }

  public static isInitialized(): boolean {
    return CopyPasteDetector._instance !== null
  }

  public static getInstance(): CopyPasteDetector {
    if (CopyPasteDetector._instance === null) {
      throw new Error('Instance not initialized. Call initialize() first.');
    }
    return CopyPasteDetector._instance;
  }

  public static initialize(notebookPanel: NotebookPanel, iNotebookTracker: INotebookTracker, assignmentId: number, userId: string): CopyPasteDetector {
    if (CopyPasteDetector._instance !== null) {
      throw new Error('Instance already initialized.');
    }
    CopyPasteDetector._instance = new CopyPasteDetector(notebookPanel, iNotebookTracker, assignmentId, userId);
    return CopyPasteDetector._instance;
  }

  public run(): void {
    console.log('CopyPasteDetector is running');
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
      // If the pasted content is the same as the copied content, it is not a valid learning moment
      if (this._clipboard === this._copiedContent) {
        console.log('Not a valid learning moment!');
        return false;
      }
      else {
        console.log('Valid learning moment!');
        return true;
      }
    }
  }

  public isValidPastedContent(notebookContent: string, pasteContent: string): boolean {
    return !notebookContent.includes(pasteContent);
  }

}

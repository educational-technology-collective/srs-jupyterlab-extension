import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { lm } from "../interface/learningMoment";
import { flashcard } from "../interface/flashcard";
// import { context } from '../interface/context';

export abstract class BaseDetector {
  protected notebookPanel: NotebookPanel;
  protected iNotebookTracker: INotebookTracker;
  // protected learningMoment: lm;

  constructor(notebookPanel: NotebookPanel, iNotebookTracker: INotebookTracker) {
    this.notebookPanel = notebookPanel;
    this.iNotebookTracker = iNotebookTracker;
  }

  abstract detect(): boolean;

  abstract ifLearningMomentIsValid(): boolean;

  public run(): void {
    if (this.detect()) {
      if (this.ifLearningMomentIsValid()) {
        const cellId = this.getCurrentCellId();
        const lineNum = this.getLineNum();
        const timestamp = this.getCurrentTimestamp();
        console.log(`Cell ID: ${cellId}`);
        console.log(`Line number: ${lineNum}`);
        console.log(`Timestamp: ${timestamp}`);
      }
    }
  }

  /*
    * Description: Get id of the current notebook.
    * @return {string} - The notebook ID.
   */
  protected getCurrentCellId(): string {
    const cellId = this.iNotebookTracker.activeCell?.model?.id;
    if (cellId) {
      return cellId;
    }
    else {
      return '';
    }
  }

  /*
    * Description: Get the current line number.
    * @return {number} - The current line number.
   */
  protected getLineNum(): number | undefined {
    const lineNum = this.iNotebookTracker.activeCell?.editor?.getCursorPosition().line;
    return lineNum;
  }

  /*
    * Description: Get the current timestamp.
    * @return {number} - The current timestamp.
   */
  protected getCurrentTimestamp(): number {
    const timestamp = Date.now();
    return timestamp;
  }

  /*
    * Description: Deduce the question ID given assignmentId and cellId.
    * @param {number} assignmentId - The assignment ID.
    * @param {number} cellId - The cell ID.
    * @return {number} - The question ID.
   */
  protected getQuestionId(assignmentId: number, cellId: number): number {
    return 0;
  }

  /*
    * Description: GET the context given assignmentId and questionId.
    * @param {number} assignmentId - The assignment ID.
    * @param {string} questionId - The question ID.
    * @return {Promise<string>} - A promise that resolves to the context.
   */
  protected async getContext(assignmentId: number, questionId: string): Promise<string> {
    const url = `/context/${assignmentId}/${questionId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch context. Status: ${response.status}`);
    }
    const context = await response.text();
    return context;
  }

  /*
    * Description: POST the learning moment to mongoDB.
    * @param {lm} content - The learning moment to be posted to mongoDB.
    * @return {Promise<void>} - A promise that resolves when the content is successfully posted to mongoDB.
   */
  protected async postLearningMoment(content: lm): Promise<void> {
    const url = "/learning-moments/";
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    };
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`Failed to post learning moment. Status: ${response.status}`);
    }
  }

  /*
    * Description: POST the content to the GPT service.
    * @param {object} content - The content to be posted to the GPT service.
    * @return {Promise<void>} - A promise that resolves when the content is successfully posted to the GPT service.
   */
  protected async postGPT(content: object): Promise<void> {
    const url = "/gpt/";
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    };
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`Failed to post to GPT service. Status: ${response.status}`);
    }
  }

  /*
    * Description: PUSH the generated flashcards to mongoDB.
    * @param {JSON[]} flashcards - The flashcards to be pushed to mongoDB.
    * @return {Promise<void>} - A promise that resolves when the flashcards are successfully pushed to mongoDB.
   */
  protected async pushFlashcards(flashcards: flashcard[]): Promise<void> {
    const url = "/flashcards/";
    const init = {
      method: "PUSH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flashcards }),
    };
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`Failed to push flashcards. Status: ${response.status}`);
    }
  }
}

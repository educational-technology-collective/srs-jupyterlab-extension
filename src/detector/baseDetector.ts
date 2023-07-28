import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { learningMoment } from '../interface/learningMoment';
import { flashcard } from '../interface/flashcard';
import { context } from '../interface/context';

export abstract class BaseDetector {
  protected notebookPanel: NotebookPanel;
  protected iNotebookTracker: INotebookTracker;
  protected assignmentId: number;
  // protected learningMoment: lm;

  protected constructor(
    notebookPanel: NotebookPanel,
    iNotebookTracker: INotebookTracker,
    assignmentId: number
  ) {
    this.notebookPanel = notebookPanel;
    this.iNotebookTracker = iNotebookTracker;
    this.assignmentId = assignmentId;
  }

  /*
   * Description: Check if the learning moment is valid, implement this method in the child class.
   * @return {boolean} - True if the learning moment is valid, false otherwise.
   */
  abstract isValidLearningMoment(cellId: string): boolean;

  /*
   * Description: Run the detector.
   * @return {void} - Nothing.
   */
  public abstract run(): void;

  abstract cellIdToQuestionId(cellId: string): number;

  /*
   * Description: Get id of the current notebook.
   * @return {string} - The notebook ID.
   */
  protected getCurrentCellId(): string {
    const cellId = this.iNotebookTracker.activeCell?.model?.id;
    if (cellId) {
      return cellId;
    } else {
      return '';
    }
  }

  /*
   * Description: Get the current line number.
   * @return {number} - The current line number.
   */
  protected getLineNum(): number | undefined {
    const lineNum =
      this.iNotebookTracker.activeCell?.editor?.getCursorPosition().line;
    return lineNum;
  }

  /*
   * Description: Get the current timestamp.
   * @return {number} - The current timestamp.
   */
  protected getCurrentTimestamp(): string {
    return new Date().toISOString();
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
  protected async getContext(
    assignmentId: number,
    questionId: number
  ): Promise<context> {
    const url = `/context/${assignmentId}/${questionId}`;
    // const url = `https://i7oxbucot1.execute-api.us-east-1.amazonaws.com/dev/dev/context/${assignmentId}/${questionId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch context. Status: ${response.status}`);
    }
    const context = await response.json();
    return context;
  }

  /*
   * Description: POST the learning moment to mongoDB.
   * @param {lm} content - The learning moment to be posted to mongoDB.
   * @return {Promise<void>} - A promise that resolves when the content is successfully posted to mongoDB.
   */
  protected async postLearningMoment(content: learningMoment): Promise<void> {
    const url = '/learning-moments/';
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    };
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(
        `Failed to post learning moment. Status: ${response.status}`
      );
    }
  }

  /*
   * Description: POST the content to the GPT service.
   * @param {object} content - The content to be posted to the GPT service.
   * @return {Promise<void>} - A promise that resolves when the content is successfully posted to the GPT service.
   */
  protected async postGPT(content: learningMoment): Promise<Array<flashcard>> {
    const url = '/gpt/';
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    };
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(
        `Failed to post to GPT service. Status: ${response.status}`
      );
    }
    const flashcard = await response.json();
    return flashcard;
  }

  /*
   * Description: POST the generated flashcards to mongoDB.
   * @param {JSON[]} flashcards - The flashcards to be pushed to mongoDB.
   * @return {Promise<void>} - A promise that resolves when the flashcards are successfully pushed to mongoDB.
   */
  protected async postFlashcards(flashcards: flashcard[]): Promise<void> {
    const url = '/flashcards/';
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ flashcards })
    };
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`Failed to push flashcards. Status: ${response.status}`);
    }
  }
}

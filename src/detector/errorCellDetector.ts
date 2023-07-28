import { BaseDetector } from './baseDetector';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';

export class ErrorCellDetector extends BaseDetector{
  private errorMessage: string = '';
  private errorType: string = '';
  private errorLineNum: number = 0;
  private errorTraceback: string = '';
  private errorCode: string = '';

  constructor(notebookPanel: NotebookPanel, iNotebookTracker: INotebookTracker, assignmentId: number) {
    super(notebookPanel, iNotebookTracker, assignmentId);
    console.log('ErrorCellDetector constructor');
  }

  public run(): void {

  }

  cellIdToQuestionId(cellId: string): number {
    return 0;
  }

  public detect() : Promise<boolean> {
    console.log('Error detected!');

    return new Promise((resolve) => {
      document.addEventListener('error', (event) => {
        // @ts-ignore
        const errorData = event.error;
        this.errorMessage = errorData.message;
        this.errorType = errorData.name;
        this.errorLineNum = errorData.lineNumber;
        this.errorTraceback = errorData.traceback;
        this.errorCode = errorData.code;
        console.log('Error message:', this.errorMessage);
        console.log('Error type:', this.errorType);
        console.log('Error line number:', this.errorLineNum);
        console.log('Error traceback:', this.errorTraceback);
        console.log('Error code:', this.errorCode);
        resolve(true);
      });
    });
  }

  public isValidLearningMoment(): boolean {
    return true;
  }
}

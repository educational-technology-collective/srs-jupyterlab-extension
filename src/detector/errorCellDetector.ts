import { BaseDetector } from './baseDetector';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';

export class ErrorCellDetector extends BaseDetector{

  constructor(notebookPanel: NotebookPanel, iNotebookTracker: INotebookTracker, assignmentId: number) {
    super(notebookPanel, iNotebookTracker, assignmentId, '123');
    console.log('ErrorCellDetector constructor');
  }

  public run(): void {
    console.log('ErrorCellDetector run');

    // Capture each run cell event and pick out the error data
    const runCell = this.notebookPanel.content.activeCell;
    if (runCell) {
      runCell.model.stateChanged.connect((sender, args) => {
        if (args.name === 'metadata') {
          // @ts-ignore
          const errorData = runCell.model.metadata.get('error');
          console.log('errorData:', errorData);
        }
      });
    }

    document.addEventListener('error', (event) => {
      const errorData = event.error;

      const cellId = this.getCurrentCellId();
      const lineNum = this.getLineNum();
      const timestamp = this.getCurrentTimestamp();

      if (this.isValidLearningMoment()) {
        const questionId = this.cellIdToQuestionId(this.getCurrentCellId());
        const context = this.getContext(this.assignmentId, questionId);
        const userActivity = {
          cellId: cellId,
          lineNum: lineNum,
          timestamp: timestamp,
          content: {
            error: errorData,
            error_type: errorData.name,
            error_line: errorData.lineNumber,
            error_message: errorData.message,
            error_traceback: errorData.traceback,
            error_code: errorData.code
          }
        }

        const lm = {
          platform: 'jupyter',
          contentType: 'error',
          content: {
            context: context,
            userActivity: userActivity
          },
          visibility: 'dev'
        }

        console.log('Captured Learning Moment:', lm);
      }

    });

  }

  public isValidLearningMoment(): boolean {
    return true;
  }
}

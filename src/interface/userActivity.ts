interface errorUserActivity {
  assignment_id: number;
  question_id: number;
  error: string;
  error_type: string;
  error_line: number;
  error_message: string;
  error_traceback: string;
  error_code: string;
}

interface copyPasteUserActivity {
  assignment_id: number;
  question_id: number;
  pasteContent: string;
}

export type userActivity = errorUserActivity | copyPasteUserActivity;

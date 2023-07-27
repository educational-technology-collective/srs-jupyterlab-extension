export interface userActivity {
  cellId: string;
  lineNum: number | undefined;
  timestamp: string;
  content: object;
}

export interface errorUserActivity extends userActivity {
  content: {
    error: string;
    error_type: string;
    error_line: number;
    error_message: string;
    error_traceback: string;
    error_code: string;
  }
}

export interface copyPasteUserActivity extends userActivity {
  content: {
    pasteContent: string;
  }
}

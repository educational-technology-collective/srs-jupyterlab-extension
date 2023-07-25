export interface flashcard {
  lm_id: number;
  type: "q" | "m";
  content: object;
  visibility: "development" | "review" | "production";
  source: string;
}

export interface questionFlashcard extends flashcard {
  type: "q"; // This specific interface is of type "q"
  content: {
    question: string; // Question is limited to 200 characters
    answer: string; // Answer is limited to 200 characters
  };
}

export interface multipleChoiceFlashcard extends flashcard {
  type: "m"; // This specific interface is of type "m"
  content: {
    question: string; // Question is limited to 200 characters
    answer: Array<{ option: string; isCorrect: boolean }>; // Option is limited to 45 characters
  };
}

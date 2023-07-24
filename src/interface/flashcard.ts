interface questionFlashcard {
  lm_id: number;
  type: "q";
  content: {
    question: string; // Question is limited to 200 characters
    answer: string; // Answer is limited to 200 characters
  };
  visibility: "public" | "dev" | "private";
  source?: string;
}

interface multipleChoiceFlashcard {
  lm_id: number;
  type: "m";
  content: {
    question: string; // Question is limited to 200 characters
    answer: Array<{ option: string; isCorrect: boolean }>; // Option is limited to 45 characters
  };
  visibility: "public" | "dev" | "private";
  source?: string;
}

export type flashcard = questionFlashcard | multipleChoiceFlashcard;

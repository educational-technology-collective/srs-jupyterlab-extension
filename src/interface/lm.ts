import { staticFlashcards, a1_static_flashcards, a2_static_flashcards } from './flashcard';

interface assignmentContent {
  assignment_id: number;
  assignment_name: string;
  question_id: number;
  description: string;
  source: string;
  solution: string;
}

export interface lm {
  lm_id: number;
  platform: "jupyter";
  content_type: "copy" | "error";
  content: {
    assignment: assignmentContent;
    flashcards: staticFlashcards;
    content: Array<string>;
  },
  visibility: "public" | "dev" | "private";
}

export default function getLM(assignmentId: number, questionId: number) : lm {
    if (assignmentId == 1) {
        return {
            assignment: assignmentId,
            flashcards: a1_static_flashcards
        }
    } else if (assignmentId == 2) {
        return {
            assignment: assignmentId,
            flashcards: a2_static_flashcards
        }
    } else {
        return {
            assignment: assignmentId,
            flashcards: a1_static_flashcards
        }
    }
}

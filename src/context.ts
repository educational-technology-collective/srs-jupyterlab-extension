import { flashcard } from './index';

interface assignmentContent {
  assignment_id: number;
  title: string;
  description: string;
  source: string;
  solution: string;
}

type staticFlashcards = Array<flashcard>;

type context = assignmentContent | staticFlashcards;

export default context;
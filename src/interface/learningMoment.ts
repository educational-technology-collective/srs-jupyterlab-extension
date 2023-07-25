import { context } from './context';
import { userActivity } from './userActivity';

export interface lm {
  _id: number;
  platform: "jupyter";
  contentType: "copyPaste" | "errorCell";
  content: {
    context: context;
    userActivitiy: userActivity;
  },
  visibility: "public" | "dev" | "private";
}

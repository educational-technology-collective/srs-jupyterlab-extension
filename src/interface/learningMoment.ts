import { context } from './context';
import { userActivity } from './userActivity';

export interface lm {
  lm_id: number;
  platform: "jupyter";
  content_type: "copy_paste" | "error";
  content: {
    context: context;
    userActivitiy: userActivity;
  },
  visibility: "public" | "dev" | "private";
}

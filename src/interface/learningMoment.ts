import { context } from './context';
import { userActivity } from './userActivity';

export interface learningMoment {
  _id: number;
  platform: 'jupyter';
  contentType: 'copyPaste' | 'errorCell';
  content: {
    context: context;
    userActivitiy: userActivity;
  };
  visibility: 'public' | 'dev' | 'private';
}

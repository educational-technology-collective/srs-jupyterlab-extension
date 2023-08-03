import { context } from './context';
import { userActivity } from './userActivity';

export interface learningMoment {
  userId: string;
  platform: 'jupyter';
  contentType: 'copyPaste' | 'errorCell';
  content: {
    context: context;
    userActivity: userActivity;
  };
  visibility: 'public' | 'dev' | 'private';
}

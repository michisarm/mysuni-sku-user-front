import { PatronKey } from '@nara.platform/accent';
import TaskDetailBody from './TaskDetailBody';

export default interface TaskDetailPost {
  title: string;
  writer: string;
  readCount: number;
  registeredTime: number;
  commentFeedbackId: string;
  boardId: string;
  replies: [];
  deleted: boolean;
  id: string;
  contents: string;
  fileBoxId: string;
  pinned: number; // postpinned -> number = 0
  patronKey: PatronKey;
}

export default interface TaskDetail {
  post?: TaskDetailPost;
  postBody?: TaskDetailBody;
}

export default interface TaskDetailComment {
  title: string;
  time: number;
  id: string;
}

import { IdName } from 'shared/model';
import { PatronKey } from '@nara.platform/accent';

export default interface TaskItem {
  title: string;
  writer: string;
  patronKey: PatronKey;
  readCount: number;
  registeredTime: number;
  commentFeedbackId: string;
  boardId: string;
  replies: [];
  deleted: boolean;
  id: string;
  pinned: number; // postpinned -> number = 0
}

export default interface Task {
  empty: boolean;
  results: TaskItem[];
  totalCount: number;
}

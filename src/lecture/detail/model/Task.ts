import { IdName } from 'shared/model';

export default interface TaskItem {
  title: string;
  writer: string;
  readCount: number;
  time: number;
  commentFeedbackId: string;
  boardId: string;
  replies: [];
  deleted: boolean;
  id: string;
  pinned: boolean;
}

export default interface Task {
  empty: boolean;
  results: TaskItem[];
  totalCount: number;
}

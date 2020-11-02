import { IdName } from 'shared/model';

export default interface TaskDetail {
  title: string;
  writer: string;
  readCount: number;
  time: number;
  commentFeedbackId: string;
  boardId: string;
  replies: [];
  deleted: boolean;
  id: string;
}

export default interface TaskDetailBody {
  contents: string;
  fileBoxId: string;
  id: string;
}

export default interface TaskDetailComment {
  title: string;
  time: number;
  id: string;
}

// export default interface Task {
//   empty: boolean;
//   results: TaskItem[];
//   totalCount: number;
// }

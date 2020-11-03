import TaskDetailBody from './TaskDetailBody';

export default interface TaskDetailPost {
  title: string;
  writer: string;
  readCount: number;
  time: number;
  commentFeedbackId: string;
  boardId: string;
  replies: [];
  deleted: boolean;
  id: string;
  contents: string;
}

export default interface TaskDetail {
  post: TaskDetailPost;
  postBody: TaskDetailBody;
}

export default interface TaskDetailComment {
  title: string;
  time: number;
  id: string;
}

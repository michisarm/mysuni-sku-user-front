import { IdName } from 'shared/model';

export interface PostCdo {
  title: string;
  writer: string;
  commentFeedbackId: string;
  boardId: string;
  pinned: boolean;
  contents: string;
  fileBoxId: string;
}
export interface PostBodyCdo {
  postId: string;
  contents: string;
  fileBoxId: string;
}

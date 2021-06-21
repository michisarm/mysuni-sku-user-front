import { PatronKey } from '@nara.platform/accent';

export default interface TaskChildItem {
  title: string;
  contents: string;
  writer: string;
  patronKey: PatronKey;
  readCount: number;
  time: number;
  commentFeedbackId: string;
  postId: string;
  fileBoxId: string;
  deleted: boolean;
  id: string;
}

export default interface TaskChild {
  results: TaskChildItem[];
}

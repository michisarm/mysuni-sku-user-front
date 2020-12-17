import { IdName } from 'shared/model';

export default interface TaskCdo {
  postCdo: {
    title: string,
    writer: string,
    commentFeedbackId: string,
    boardId: string,
    pinned: boolean
  },
  postBodyCdo:
  {
    contents: string,
    fileBoxId: string
  }
}
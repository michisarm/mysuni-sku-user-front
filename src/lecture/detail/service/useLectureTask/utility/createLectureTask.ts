import { patronInfo } from '@nara.platform/dock';
import { getLectureTaskCreateItem } from 'lecture/detail/store/LectureTaskCreateStore';
import {
  registerPost,
  registerPostBody,
  postReply,
} from '../../../api/cubeApi';
import { PostBodyCdo, PostCdo } from '../../../model/TaskCdo';
import { TaskChildCdo } from '../../../model/TaskChildCdo';

export async function createLectureTask(
  isReply: boolean,
  detailTaskId: string
): Promise<void> {
  const taskCreateItem = getLectureTaskCreateItem();
  const name = patronInfo.getPatronName() || '';

  if (taskCreateItem !== undefined) {
    if (!isReply) {
      const postCdo: PostCdo = {
        title: taskCreateItem.title,
        writer: name,
        commentFeedbackId: taskCreateItem.commentFeedbackId,
        boardId: taskCreateItem.id,
        pinned: taskCreateItem.notice,
        contents: taskCreateItem.contents,
        fileBoxId: taskCreateItem.fileBoxId,
      };
      await registerPost(postCdo);
    }

    if (isReply) {
      const postCdo: TaskChildCdo = {
        title: taskCreateItem.title,
        writer: name,
        commentFeedbackId: taskCreateItem.commentFeedbackId,
        postId: detailTaskId,
        contents: taskCreateItem.contents,
        fileBoxId: taskCreateItem.fileBoxId,
      };

      await postReply(postCdo);
    }
  }
}

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
      };

      const postId = await registerPost(postCdo);
      if (postId !== undefined) {
        const postBodyCdo: PostBodyCdo = {
          postId,
          contents: taskCreateItem.contents,
          fileBoxId: taskCreateItem.fileBoxId,
        };
        await registerPostBody(postBodyCdo);
      }
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

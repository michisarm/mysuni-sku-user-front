import { patronInfo } from '@nara.platform/dock';
import { getLectureTaskCreateItem } from 'lecture/detail/store/LectureTaskCreateStore';
import { registerPost, registerPostBody } from '../../../api/cubeApi';
import { PostBodyCdo, PostCdo } from '../../../model/TaskCdo';

export async function createLectureTask(): Promise<void> {
  const taskCreateItem = getLectureTaskCreateItem();
  const name = patronInfo.getPatronName() || '';

  if (taskCreateItem !== undefined) {
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
}

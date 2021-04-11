import { getLectureTaskDetail } from 'lecture/detail/store/LectureTaskStore';
import { modifyPost, modifyPostBody } from '../../../api/cubeApi';

export async function updateLectureTask(
  postId: string,
  postBodyId: string
): Promise<void> {
  const taskDetailItem = getLectureTaskDetail();
  if (taskDetailItem !== undefined) {
    const postNameValueList = {
      nameValues: [
        { name: 'title', value: taskDetailItem.title },
        { name: 'commentFeedbackId', value: taskDetailItem.commentFeedbackId },
        { name: 'deleted', value: 'false' },
      ],
    };
    const postBodyNameValueList = {
      nameValues: [
        { name: 'contents', value: taskDetailItem.contents },
        { name: 'fileBoxId', value: taskDetailItem.fileBoxId },
      ],
    };
    await modifyPost(postId, postNameValueList);
    await modifyPostBody(postBodyId, postBodyNameValueList);
  }
}

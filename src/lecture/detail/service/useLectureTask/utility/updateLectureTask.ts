import { getLectureTaskDetail } from 'lecture/detail/store/LectureTaskStore';
import { modifyPost, modifyPostBody, modifyReply } from '../../../api/cubeApi';

export async function updateLectureTask(
  postId: string,
  isReply: boolean
): Promise<void> {
  const taskDetailItem = getLectureTaskDetail();
  if (taskDetailItem !== undefined) {
    if (!isReply) {
      const postNameValueList = {
        nameValues: [
          { name: 'title', value: taskDetailItem.title },
          {
            name: 'commentFeedbackId',
            value: taskDetailItem.commentFeedbackId,
          },
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
      await modifyPostBody(postId, postBodyNameValueList);
    }

    if (isReply) {
      const postNameValueList = {
        nameValues: [
          { name: 'title', value: taskDetailItem.title },
          {
            name: 'commentFeedbackId',
            value: taskDetailItem.commentFeedbackId,
          },
          { name: 'contents', value: taskDetailItem.contents },
          { name: 'fileBoxId', value: taskDetailItem.fileBoxId },
          { name: 'deleted', value: 'false' },
        ],
      };

      await modifyReply(postId, postNameValueList);
    }
  }
}

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
          { name: 'contents', value: taskDetailItem.contents },
          { name: 'fileBoxId', value: taskDetailItem.fileBoxId },
        ],
      };

      await modifyPost(postId, postNameValueList);
    }

    if (isReply) {
      //namevalue list modify1
      const postNameValueList = {
        nameValues: [
          { name: 'title', value: taskDetailItem.title },
          { name: 'contents', value: taskDetailItem.contents },
          { name: 'fileBoxId', value: taskDetailItem.fileBoxId },
        ],
      };

      await modifyReply(postId, postNameValueList);
    }
  }
}

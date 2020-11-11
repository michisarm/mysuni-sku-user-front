import { patronInfo } from "@nara.platform/dock";
import { modifyCommunityPost, registerCommunityCommentPost, registerCommunityPost } from "community/api/communityApi";
import { getCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { createTaskPost, updateTaskPost } from "lecture/detail/api/mPersonalCubeApi";
import TaskCdo from "lecture/detail/model/TaskCdo";
import { getLectureTaskCreateItem } from "lecture/detail/store/LectureTaskCreateStore";
import { getLectureTaskDetail } from "lecture/detail/store/LectureTaskStore";

export async function updateLectureTask(postId: string): Promise<void> { 

    const taskDetailItem = getLectureTaskDetail()
    if(taskDetailItem !== undefined) {
        const postCdo: any = {
          postBodyNameValueList: {
            nameValues: [
              { name: 'contents', value: taskDetailItem.contents },
              { name: 'fileBoxId', value: taskDetailItem.fileBoxId }
            ]
          },
          postNameValueList: {
            nameValues: [
              { name: 'title', value: taskDetailItem.title },
              { name: 'commentFeedbackId', value: taskDetailItem.commentFeedbackId },
              { name: 'deleted', value: "false" }
            ]
          }
        };
        updateTaskPost(postCdo, postId);
    }
}
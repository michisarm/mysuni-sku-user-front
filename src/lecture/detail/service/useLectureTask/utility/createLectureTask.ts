import { patronInfo } from "@nara.platform/dock";
import { modifyCommunityPost, registerCommunityCommentPost, registerPost } from "community/api/communityApi";
import { getCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { createTaskPost } from "lecture/detail/api/mPersonalCubeApi";
import TaskCdo from "lecture/detail/model/TaskCdo";
import { getLectureTaskCreateItem } from "lecture/detail/store/LectureTaskCreateStore";

export async function createLectureTask(): Promise<void> {
  const taskCreateItem = getLectureTaskCreateItem()
  const name = patronInfo.getPatronName() || '';

  if (taskCreateItem !== undefined) {
    const postCdo: TaskCdo = {
      postCdo: {
        title: taskCreateItem.title,
        writer: name,
        commentFeedbackId: taskCreateItem.commentFeedbackId,
        boardId: taskCreateItem.id
      },
      postBodyCdo:
      {
        contents: taskCreateItem.contents,
        fileBoxId: taskCreateItem.fileBoxId
      }
    };
    return createTaskPost(postCdo);
  }
}
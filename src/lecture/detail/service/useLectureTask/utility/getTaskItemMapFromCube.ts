/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import {
  findPersonalCube,
  findTask,
  findTaskChild,
  findTaskCommentCount,
} from 'lecture/detail/api/mPersonalCubeApi';
import PersonalCube from '../../../model/PersonalCube';
import Task from 'lecture/detail/model/Task';
import {
  getLectureTaskItem,
  // setLectureChildTaskItem,
  setLectureTaskItem,
} from 'lecture/detail/store/LectureTaskStore';
import {
  LectureTask,
  // LectureTaskChild,
} from 'lecture/detail/viewModel/LectureTask';
import { compareAscendingByTime } from '../../../utility/lectureTaskHelper';

function getPersonalCubeByParams(cubeId: string): Promise<PersonalCube> {
  return findPersonalCube(cubeId);
}

async function getTaskItem(
  boardId: string,
  offset: number,
  limit: number,
  addflag?: boolean,
  tabType?: string
) {
  const lectureTask: LectureTask = {
    items: [],
    totalCount: 0,
    empty: false,
    offset: 0,
    limit: 0,
  };
  //TODO api 수정되면 바꿀 예정
  if (boardId !== '') {
    {
      const findTaskData = await findTask(boardId, offset, limit, tabType!);
      if (findTaskData) {
        lectureTask.totalCount = findTaskData.totalCount;
        lectureTask.offset = offset;
        const old = getLectureTaskItem();
        if (findTaskData.results.length !== 0) {
          if (addflag && old) {
            findTaskData.results.forEach(task => {
              old.items.push({
                id: task.id,
                boardId: task.boardId,
                readCount: task.readCount,
                title: task.title,
                writer: task.writer,
                time: task.time,
                child: false,
                count: 0,
                commentFeedbackId: task.commentFeedbackId,
                childItems: [],
                delete: task.deleted,
                pinned: task.pinned
              });
            });

            lectureTask.items = [...old.items];
            setLectureTaskItem(old);
          } else {
            findTaskData.results.forEach(task => {
              lectureTask.items.push({
                id: task.id,
                boardId: task.boardId,
                readCount: task.readCount,
                title: task.title,
                writer: task.writer,
                time: task.time,
                child: false,
                count: 0,
                commentFeedbackId: task.commentFeedbackId,
                childItems: [],
                delete: task.deleted,
                pinned: task.pinned
              });
            });
            setLectureTaskItem(lectureTask);
          }

          const idArr: string[] = [];
          lectureTask.items.map(item => {
            idArr.push(item.id);
          });

          //자식 리스트 api
          const findChildTaskData = await findTaskChild(idArr);

          if (findChildTaskData.results !== null) {
            lectureTask.items.forEach(parent => {
              parent.childItems = [];
            });
            findChildTaskData.results.forEach(child => {
              lectureTask.items.forEach(parent => {
                if (parent.id === child.postId) {
                  parent.childItems.push({
                    id: child.id,
                    postId: child.postId,
                    readCount: child.readCount,
                    title: child.title,
                    writer: child.writer,
                    time: child.time,
                    commentFeedbackId: child.commentFeedbackId,
                    count: 0,
                  });
                }
              });
            });
          }

          lectureTask.items.forEach(value => {
            value.childItems.sort(compareAscendingByTime);
          });

          const commentFeedbackIdArr: string[] = [];
          lectureTask.items.map((item, idx) => {
            if (item.commentFeedbackId) {
              commentFeedbackIdArr.push(item.commentFeedbackId);
            }
            if (item.childItems) {
              item.childItems.map(childeItem => {
                if (childeItem.commentFeedbackId) {
                  commentFeedbackIdArr.push(childeItem.commentFeedbackId);
                }
              });
            }
          });

          // 댓글 count api
          const commentCount = await findTaskCommentCount(commentFeedbackIdArr);
          if (commentCount !== null) {
            commentCount.forEach(comment => {
              lectureTask.items.forEach(parent => {
                if (parent.commentFeedbackId === comment.feedbackId) {
                  parent.count = comment.count;
                }
                if (parent.childItems) {
                  parent.childItems.forEach(child => {
                    if (child.commentFeedbackId === comment.feedbackId) {
                      child.count = comment.count;
                    }
                  });
                }
              });
            });
          }
        }
        return lectureTask;
      }
    }
  }
}

export async function getTaskItemMapFromCube(
  cubeId: string,
  lectureCardId: string,
  offset: number,
  limit: number,
  tabType: string
): Promise<void> {
  // void : return이 없는 경우 undefined
  if (cubeId) {
    const addflag = !!getLectureTaskItem();
    const personalCube = await getPersonalCubeByParams(cubeId);
    const examId =
      personalCube && personalCube.contents && personalCube.contents.examId;
    const boardId =
      personalCube &&
      personalCube.contents &&
      personalCube.contents.contents &&
      personalCube.contents.contents.id;
    if (lectureCardId !== undefined) {
      if (boardId !== undefined) {
        const taskItem = await getTaskItem(
          boardId,
          offset,
          limit,
          addflag,
          tabType
        );
        if (taskItem !== undefined) {
          setLectureTaskItem({ ...taskItem });
        }
      }
    }
  }
}

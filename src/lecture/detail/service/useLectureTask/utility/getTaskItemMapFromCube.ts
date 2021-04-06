/* eslint-disable consistent-return */
import {
  findTask,
  findTaskChild,
  findTaskCommentCount,
} from 'lecture/detail/api/mPersonalCubeApi';
import {
  getLectureTaskItem,
  setLectureTaskItem,
} from 'lecture/detail/store/LectureTaskStore';
import { LectureTask } from 'lecture/detail/viewModel/LectureTask';
import { compareAscendingByTime } from '../../../utility/lectureTaskHelper';
import { findCubeDetailCache } from '../../../api/cubeApi';

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
                pinned: task.pinned,
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
                pinned: task.pinned,
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
  offset: number,
  limit: number,
  tabType: string
): Promise<void> {
  const cubeDetail = await findCubeDetailCache(cubeId);
  if (cubeDetail !== undefined && cubeDetail.cubeMaterial.board !== null) {
    if (cubeDetail.cubeMaterial.board.id !== null) {
      const addflag = !!getLectureTaskItem();
      const taskItem = await getTaskItem(
        cubeDetail.cubeMaterial.board.id,
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

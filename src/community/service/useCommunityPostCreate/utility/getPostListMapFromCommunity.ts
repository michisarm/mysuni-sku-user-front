/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import {
  findPersonalCube,
  findTask,
} from 'lecture/detail/api/mPersonalCubeApi';
import {
  getLectureTaskItem,
  // setLectureChildTaskItem,
  setLectureTaskItem,
} from 'lecture/detail/store/LectureTaskStore';
import {
  LectureTask,
  // LectureTaskChild,
} from 'lecture/detail/viewModel/LectureTask';


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
                delete: task.deleted
              });
            });

            lectureTask.items = [...old.items];
            setLectureTaskItem(old);
          }
          // 댓글 count api
        }
        return lectureTask;
      }
    }
  }
}

export async function getPostListMapFromCommunity(
  communityId: string,
  offset: number,
  limit: number,
  sortType: string,
  searchType: string,
  searchText: string
): Promise<void> {
  // void : return이 없는 경우 undefined

    if (communityId !== undefined) {
      const addflag = !!getLectureTaskItem();
      // const taskItem = await getTaskItem(
      //   boardId,
      //   offset,
      //   limit,
      //   addflag,
      //   tabType
      // );
      // if (taskItem !== undefined) {
      //   setLectureTaskItem({ ...taskItem });
      // }
    }
  }

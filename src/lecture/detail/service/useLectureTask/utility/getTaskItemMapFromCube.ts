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
import SkProfileApi from '../../../../../../src/profile/present/apiclient/SkProfileApi';

async function getTaskItem(
  boardId: string,
  offset: number,
  limit: number,
  addflag?: boolean,
  tabType?: string,
  sort?: string
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
      const findTaskData = await findTask(boardId, offset, limit, tabType!, sort);
      if (findTaskData) {
        lectureTask.totalCount = findTaskData.totalCount;
        lectureTask.offset = offset;
        const old = getLectureTaskItem();
        if (findTaskData.results.length !== 0) {
          // if (addflag && old) {
          //   findTaskData.results.forEach(task => {
          //     old.items.push({
          //       id: task.id,
          //       boardId: task.boardId,
          //       readCount: task.readCount,
          //       title: task.title,
          //       writer: task.writer,
          //       time: task.time,
          //       child: false,
          //       count: 0,
          //       commentFeedbackId: task.commentFeedbackId,
          //       childItems: [],
          //       delete: task.deleted,
          //       pinned: task.pinned,
          //     });
          //   });

          //   lectureTask.items = [...old.items];
          //   setLectureTaskItem(old);
          // } else {
          //   findTaskData.results.forEach(task => {
          //     lectureTask.items.push({
          //       id: task.id,
          //       boardId: task.boardId,
          //       readCount: task.readCount,
          //       title: task.title,
          //       writer: task.writer,
          //       time: task.time,
          //       child: false,
          //       count: 0,
          //       commentFeedbackId: task.commentFeedbackId,
          //       childItems: [],
          //       delete: task.deleted,
          //       pinned: task.pinned,
          //     });
          //   });
          //   setLectureTaskItem(lectureTask);
          // }

          const patronKeys: string[] = [];
          findTaskData.results.map(task => {
            if(task.patronKey &&
                task.patronKey.keyString !== ''
            ){
              patronKeys.push(task.patronKey.keyString);
            } 
          });

          const writerProfile = await SkProfileApi.instance.findProfiles(patronKeys);
          findTaskData.results.forEach(task => {

            // 실명 닉네임 여부에 따른 이름 설정
            let nickName = '';
            if(writerProfile && 
                writerProfile.length > 0 &&
                task.patronKey &&
                task.patronKey.keyString !== ''
            ){
              writerProfile.some((m: any) => {
                if (m.id === task.patronKey.keyString) {
                  if(m.nickName){
                    nickName = m.nickName
                  } 
                  return true
                }
              })
            }

            lectureTask.items.push({
              id: task.id,
              boardId: task.boardId,
              readCount: task.readCount,
              title: task.title,
              writer: nickName || task.writer,
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

          const idArr: string[] = [];
          lectureTask.items.map(item => {
            idArr.push(item.id);
          });

          //자식 리스트 api
          const findChildTaskData = await findTaskChild(idArr);

          if (findChildTaskData.results !== null) {

            const childPatronKeys: string[] = [];
            findChildTaskData.results.map(task => {
              if(task.patronKey &&
                  task.patronKey.keyString !== ''
              ){
                childPatronKeys.push(task.patronKey.keyString);
              } 
            });

            const childWriterProfile = await SkProfileApi.instance.findProfiles(childPatronKeys);

            lectureTask.items.forEach(parent => {
              parent.childItems = [];
            });
            findChildTaskData.results.forEach(child => {

              // 실명 닉네임 여부에 따른 이름 설정
              let childNickName = '';
              if(childWriterProfile && 
                childWriterProfile.length > 0 &&
                  child.patronKey &&
                  child.patronKey.keyString !== ''
              ){
                childWriterProfile.some((m: any) => {
                  if (m.id === child.patronKey.keyString) {
                    if(m.nickName){
                      childNickName = m.nickName
                    } 
                    return true
                  }
                })
              }

              lectureTask.items.forEach(parent => {
                if (parent.id === child.postId) {
                  parent.childItems.push({
                    id: child.id,
                    postId: child.postId,
                    readCount: child.readCount,
                    title: child.title,
                    writer: childNickName || child.writer,
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
  tabType: string,
  sort?: string
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
        tabType,
        sort
      );
      if (taskItem !== undefined) {
        setLectureTaskItem({ ...taskItem });
      }
    }
  }
}

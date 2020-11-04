import { useLectureTask } from 'lecture/detail/service/useLectureTask/useLectureTask';
import React, { useCallback, useEffect, useState } from 'react';
import LectureTaskView from '../view/LectureTaskView/LectureTaskView';
import {
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskViewType,
} from '../../store/LectureTaskStore';
import { ContentLayout } from 'shared';
import LectureTaskDetailView from '../view/LectureTaskView/LectureTaskDetailView';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useLectuerCubeOverview } from 'lecture/detail/service/useLectuerCubeOverview/useLectuerCubeOverview';
import { useLectureTaskDetail } from 'lecture/detail/service/useLectureTask/useLectureTaskDetail';
import LectureTaskCreateView from '../view/LectureTaskView/LectureTaskCreateView';
import {
  deleteCubeLectureTaskPost,
  getCubeLectureTaskLearningCardId,
} from 'lecture/detail/service/useLectureTask/utility/getCubeLectureTaskDetail';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import LectureTaskReplyView from '../view/LectureTaskView/LectureTaskReplyView';
import { useLectureDescription } from 'lecture/detail/service/useLectureCourseOverview/useLectureDescription';
import { useLectureSubcategory } from 'lecture/detail/service/useLectureCourseOverview/useLectureSubcategory';
import { useLectureFile } from 'lecture/detail/service/useLectureFile';
import { useLectureTags } from 'lecture/detail/service/useLectureCourseOverview/useLectureTags';
import { useLectureTaskViewType } from 'lecture/detail/service/useLectureTask/useLectureTaskViewType';
import LectureTaskEditView from '../view/LectureTaskView/LectureTaskEditView';

function LectureTaskContainer() {
  const [taskItem] = useLectureTask();
  const [taskDetail] = useLectureTaskDetail();
  const params = useLectureRouterParams();
  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [lectureFile] = useLectureFile();
  const [lectureTags] = useLectureTags();
  const [viewType] = useLectureTaskViewType();
  const [detailTaskId, setDetailTaskId] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');
  const [create, setCreate] = useState<boolean>();
  const [edit, setEdit] = useState<boolean>();
  const [detailType, setDetailType] = useState<string>('');

  useLectuerCubeOverview();

  const moreView = useCallback((offset: number) => {
    const nextOffset = offset + 10;
    setLectureTaskOffset(nextOffset);
  }, []);

  const moveToDetail = useCallback((param: any) => {
    setLectureTaskViewType(param);
    setDetailTaskId(param.id);
    setDetailType(param.type);
    //게시글 부모인지 자식인지
  }, []);

  const onClickList = useCallback(() => {
    setLectureTaskViewType('list');
  }, []);

  const onHandleSave = useCallback(() => {
    setLectureTaskViewType('list');
  }, []);

  const onHandleReply = useCallback(() => {
    setLectureTaskViewType('list');
  }, []);

  const onClickModify = useCallback(() => {
    setCreate(true);
    setLectureTaskViewType('edit');
  }, []);

  const onClickReplies = useCallback(() => {
    setLectureTaskViewType('reply');
  }, []);

  const onClickDelete = useCallback((id: string, type: string) => {
    setLectureTaskViewType('list');
    deletePost(id, type);
  }, []);

  const listHashLink = useCallback((hash: string) => {
    setLectureTaskTab(hash);
    setLectureTaskViewType('list');
    const element = document.getElementById(hash);
    if (element !== null) {
      element.scrollIntoView();
    }
  }, []);

  const overviewHashLink = useCallback((hash: string) => {
    setLectureTaskTab(hash);
    setLectureTaskViewType('Overview');
    const element = document.getElementById(hash);
    if (element !== null) {
      element.scrollIntoView();
    }
  }, []);

  const handelClickCreateTask = useCallback(() => {
    console.log('create');
    setCreate(true);
    setLectureTaskViewType('create');
  }, []);

  useEffect(() => {
    async function getContentId() {
      if (params === undefined) {
        return;
      }
      const contentData = await getCubeLectureTaskLearningCardId(
        params.contentId
      );

      setBoardId(contentData.contents.contents.id);
    }
    getContentId();
  }, [create, edit]);

  async function deletePost(id: string, type: string) {
    await deleteCubeLectureTaskPost(id, type);
  }

  return (
    <>
      <div id="Posts" />
      {viewType === 'list' && taskItem !== undefined && (
        <>
          <LectureCubeSummaryContainer />
          <ContentLayout className="support">
            <LectureTaskView
              handelClickCreateTask={handelClickCreateTask}
              taskItem={taskItem}
              moreView={moreView}
              handleClickTaskRow={moveToDetail}
              listHashLink={listHashLink}
              overviewHashLink={overviewHashLink}
              lectureDescription={lectureDescription}
              lectureSubcategory={lectureSubcategory}
              lectureTags={lectureTags}
              lectureFile={lectureFile}
            />
          </ContentLayout>
        </>
      )}
      {viewType !== 'list' && viewType !== 'create' && viewType !== 'edit' && (
        <>
          <LectureTaskDetailView
            taskId={detailTaskId}
            taskDetail={taskDetail!}
            detailType={detailType}
            handleOnClickList={onClickList}
            handleOnClickModify={onClickModify}
            handleOnClickReplies={onClickReplies}
            handleOnClickDelete={onClickDelete}
          />
        </>
      )}
      {viewType === 'create' && (
        <>
          <LectureTaskCreateView
            postId=""
            boardId={boardId}
            handleOnClickList={onHandleSave}
            handleCloseClick={onClickList}
          />
        </>
      )}
      {viewType === 'edit' && (
        <>
          <LectureTaskEditView
            postId={detailTaskId}
            boardId={boardId}
            detailType={detailType}
            handleOnClickList={onHandleSave}
            handleCloseClick={onClickList}
          />
        </>
      )}
      {viewType === 'reply' && (
        <LectureTaskReplyView
          postId={detailTaskId}
          boardId={boardId}
          handleOnClickList={onHandleReply}
          handleCloseClick={onClickList}
        />
      )}
      {viewType === 'Overview' && (
        <>
          <LectureCubeSummaryContainer />
          <ContentLayout className="support">
            <LectureTaskView
              lectureDescription={lectureDescription}
              lectureSubcategory={lectureSubcategory}
              lectureTags={lectureTags}
              lectureFile={lectureFile}
              listHashLink={listHashLink}
              overviewHashLink={overviewHashLink}
            />
          </ContentLayout>
        </>
      )}
    </>
  );
}

export default LectureTaskContainer;

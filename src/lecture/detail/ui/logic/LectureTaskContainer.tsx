import { useLectureTask } from 'lecture/detail/service/useLectureTask/useLectureTask';
import React, { useCallback, useEffect, useState } from 'react';
import LectureTaskView from '../view/LectureTaskView/LectureTaskView';
import {
  getLectureTaskDetail,
  getLectureTaskViewType,
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
import { getCubeLectureTaskLearningCardId } from 'lecture/detail/service/useLectureTask/utility/getCubeLectureTaskDetail';
import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import LectureTaskReplyView from '../view/LectureTaskView/LectureTaskReplyView';
import { useLectureDescription } from 'lecture/detail/service/useLectureCourseOverview/useLectureDescription';
import { useLectureSubcategory } from 'lecture/detail/service/useLectureCourseOverview/useLectureSubcategory';
import { useLectureFile } from 'lecture/detail/service/useLectureFile';
import { useLectureTags } from 'lecture/detail/service/useLectureCourseOverview/useLectureTags';
import { useLectureTaskViewType } from 'lecture/detail/service/useLectureTask/useLectureTaskViewType';

function LectureTaskContainer() {
  const [taskItem] = useLectureTask();
  const [taskDetail] = useLectureTaskDetail();
  const [detailTaskId, setDetailTaskId] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');
  const [create, setCreate] = useState<boolean>();
  const params = useLectureRouterParams();
  const [lectureDescription] = useLectureDescription();
  const [lectureSubcategory] = useLectureSubcategory();
  const [lectureFile] = useLectureFile();
  const [lectureTags] = useLectureTags();
  const [viewType] = useLectureTaskViewType();

  useLectuerCubeOverview();

  const moreView = (offset: number) => {
    const nextOffset = offset + 10;
    setLectureTaskOffset(nextOffset);
  };

  const moveToDetail = (param: any) => {
    setLectureTaskViewType(param);
    setDetailTaskId(param.id);
  };

  const onClickList = () => {
    setLectureTaskViewType('list');
  };

  const onHandleSave = () => {
    setLectureTaskViewType('list');
  };

  const onHandleReply = () => {
    setLectureTaskViewType('list');
  };

  const onClickModify = (id: string) => {
    setLectureTaskViewType('edit');
  };

  const onClickReplies = (id: string) => {
    setLectureTaskViewType('reply');
  };

  const listHashLink = (hash: string) => {
    console.log('hash', hash);
    setLectureTaskTab(hash);
    setLectureTaskViewType('list');
    const element = document.getElementById(hash);
    if (element !== null) {
      element.scrollIntoView();
    }
  };

  const overviewHashLink = (hash: string) => {
    console.log('hash', hash);
    setLectureTaskTab(hash);
    setLectureTaskViewType('Overview');
    const element = document.getElementById(hash);
    if (element !== null) {
      element.scrollIntoView();
    }
  };

  const handelClickCreateTask = () => {
    setCreate(true);
    setLectureTaskViewType('create');
  };

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
  }, [create]);

  console.log('getLectureTaskViewType()', getLectureTaskViewType());
  console.log('taskItem', taskItem);

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
        <LectureTaskDetailView
          taskId={detailTaskId}
          taskDetail={taskDetail!}
          handleOnClickList={onClickList}
          handleOnClickModify={onClickModify}
          handleOnClickReplies={onClickReplies}
        />
      )}
      {viewType === 'create' && (
        <LectureTaskCreateView
          postId=""
          boardId={boardId}
          handleOnClickList={onHandleSave}
          handleCloseClick={onClickList}
        />
      )}
      {viewType === 'edit' && (
        <LectureTaskCreateView
          postId={detailTaskId}
          boardId={boardId}
          handleOnClickList={onHandleSave}
          handleCloseClick={onClickList}
        />
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

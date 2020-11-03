import { useLectureTask } from 'lecture/detail/service/useLectureTask/useLectureTask';
import React, { useCallback, useEffect, useState } from 'react';
import LectureTaskView from '../view/LectureTaskView/LectureTaskView';
import {
  getLectureTaskDetail,
  getLectureTaskViewType,
  setLectureTaskOffset,
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

function LectureTaskContainer() {
  const [taskItem] = useLectureTask();
  const [taskDetail] = useLectureTaskDetail();
  const [detailTaskId, setDetailTaskId] = useState<string>('');
  const [boardId, setBoardId] = useState<string>('');
  const [create, setCreate] = useState<boolean>();
  const params = useLectureRouterParams();
  console.log('params', params);

  useLectuerCubeOverview();

  const moreView = (offset: number) => {
    const nextOffset = offset + 2;
    setLectureTaskOffset(nextOffset);
  };

  const moveToDetail = (param: any) => {
    console.log('param', param);
    // if (param.id) {
    //   setLectureTaskViewType(param);
    // } else {
    //   setLectureTaskViewType(param);
    // }
    setLectureTaskViewType(param);
    setDetailTaskId(param.id);
  };

  const onClickList = () => {
    setLectureTaskViewType('list');
  };

  const onHandleSave = () => {
    setLectureTaskViewType('init');
  };

  const onClickModify = (id: string) => {
    console.log('onClickModify -> onClickModify', id);
    setLectureTaskViewType('edit');
  };

  const hashLink = (hash: string) => {
    console.log('hash', hash);
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
      console.log('contentData', contentData);
      // setBoardId(test);

      setBoardId(contentData.contents.contents.id);
    }
    getContentId();
  }, [create]);

  return (
    <>
      <div id="Posts" />
      {getLectureTaskViewType() === 'list' && taskItem !== undefined && (
        <>
          <LectureCubeSummaryContainer />
          <ContentLayout className="support">
            <LectureTaskView
              handelClickCreateTask={handelClickCreateTask}
              taskItem={taskItem}
              moreView={moreView}
              handleClickTaskRow={moveToDetail}
              hashLink={hashLink}
            />
          </ContentLayout>
        </>
      )}
      {getLectureTaskViewType() !== 'list' &&
        getLectureTaskViewType() !== 'create' &&
        getLectureTaskViewType() !== 'edit' && (
          <LectureTaskDetailView
            taskId={detailTaskId}
            taskDetail={taskDetail!}
            handleOnClickList={onClickList}
            handleOnClickModify={onClickModify}
          />
        )}
      {getLectureTaskViewType() === 'create' && (
        <LectureTaskCreateView
          postId={detailTaskId}
          boardId={boardId}
          handleOnClickList={onHandleSave}
          handleCloseClick={onClickList}
        />
      )}
      {getLectureTaskViewType() === 'edit' && (
        <LectureTaskCreateView
          postId={detailTaskId}
          boardId={boardId}
          handleOnClickList={onHandleSave}
          handleCloseClick={onClickList}
        />
      )}
    </>
  );
}

export default LectureTaskContainer;

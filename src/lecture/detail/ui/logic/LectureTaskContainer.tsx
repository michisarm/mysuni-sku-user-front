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
    if (param.id) {
      setLectureTaskViewType(param);
    } else {
      setLectureTaskViewType(param);
    }
    setDetailTaskId(param.id);
  };

  const onClickList = () => {
    setLectureTaskViewType('list');
  };

  const hashLink = (hash: string) => {
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
        getLectureTaskViewType() !== 'create' && (
          <LectureTaskDetailView
            taskId={detailTaskId}
            taskDetail={taskDetail!}
            handleOnClickList={onClickList}
          />
        )}
      {getLectureTaskViewType() === 'create' && (
        <LectureTaskCreateView
          taskId={detailTaskId}
          postId={detailTaskId}
          boardId={boardId}
          handleOnClickList={onClickList}
          handleCloseClick={onClickList}
        />
      )}
    </>
  );
}

export default LectureTaskContainer;

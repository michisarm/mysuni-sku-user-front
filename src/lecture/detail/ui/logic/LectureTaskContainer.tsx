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

function LectureTaskContainer() {
  const [taskItem] = useLectureTask();
  const [taskDetail] = useLectureTaskDetail();
  const [detailTaskId, setDetailTaskId] = useState<string>('');

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
    console.log('taskDetail', taskDetail);
    console.log('detailTaskId', detailTaskId);
    getLearningCardId();
    setLectureTaskViewType('create');
  };

  const getLearningCardId = useCallback(() => {
    console.log('00000');

    const id = getCubeLectureTaskLearningCardId();
    console.log('id', id);
  }, []);

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
          boardId={detailTaskId}
          handleOnClickList={onClickList}
          handleCloseClick={onClickList}
        />
      )}
    </>
  );
}

export default LectureTaskContainer;

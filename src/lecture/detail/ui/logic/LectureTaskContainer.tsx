import { useLectureTask } from 'lecture/detail/service/useLectureTask/useLectureTask';
import React, { useEffect, useState } from 'react';
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

function LectureTaskContainer() {
  const [taskItem] = useLectureTask();
  const [taskDetail] = useLectureTaskDetail();
  const [detailTaskId, setDetailTaskId] = useState<string>('');

  useLectuerCubeOverview();

  const moreView = (offset: number) => {
    const nextOffset = offset + 2;
    setLectureTaskOffset(nextOffset);
  };

  const moveToDetail = (type: string) => {
    if (type) {
      setLectureTaskViewType(type);
    } else {
      setLectureTaskViewType(type);
    }
    setDetailTaskId(type);
  };

  return (
    <>
      {getLectureTaskViewType() === 'list' && taskItem !== undefined && (
        <>
          <LectureCubeSummaryContainer />
          <ContentLayout className="support">
            <LectureTaskView
              taskItem={taskItem}
              moreView={moreView}
              handleClickTaskRow={moveToDetail}
            />
          </ContentLayout>
        </>
      )}
      {getLectureTaskViewType() !== 'list' && (
        // <ContentLayout breadcrumb={[{ text: 'Support' }, { text: 'Notice' }]}>
        <LectureTaskDetailView
          taskId={detailTaskId}
          taskDetail={getLectureTaskDetail()}
        />
        // </ContentLayout>
      )}
    </>
  );
}

export default LectureTaskContainer;

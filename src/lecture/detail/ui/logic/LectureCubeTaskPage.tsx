import React, { useEffect } from 'react';
import LectureTaskContainer from './LectureTaskContainer';
import {
  setLectureTaskDetail,
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskViewType,
  setLectureTaskOrder,
} from '../../store/LectureTaskStore';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';
import { useLectureParams } from '../../store/LectureParamsStore';
import { useLectureState } from '../../store/LectureStateStore';

function LectureCubeTaskPage() {
  const params = useLectureParams();

  useEffect(() => {
    return () => {
      setLectureTaskOrder('new');
      setLectureTaskOffset(0);
      setLectureTaskViewType('list');
      setLectureTaskDetail();
      // setLectureTaskTab('Overview');
      setLectureTaskTab('Posts');
    };
  }, [params?.cubeId]);

  useCubeViewEvent();

  return <LectureTaskContainer />;
}

export default LectureCubeTaskPage;

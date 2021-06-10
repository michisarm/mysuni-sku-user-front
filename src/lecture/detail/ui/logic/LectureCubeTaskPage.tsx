import React, { useEffect } from 'react';
import LectureTaskContainer from './LectureTaskContainer';
import {
  setLectureTaskDetail,
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskViewType,
  setLectureTaskOrder,
} from '../../store/LectureTaskStore';
import { useLectureParams } from '../../store/LectureParamsStore';

function LectureCubeTaskPage() {
  const params = useLectureParams();

  useEffect(() => {
    return () => {
      setLectureTaskOrder('new');
      setLectureTaskOffset(0);
      setLectureTaskViewType('list');
      setLectureTaskDetail();
      setLectureTaskTab('Posts');
    };
  }, [params?.cubeId]);

  return <LectureTaskContainer />;
}

export default LectureCubeTaskPage;

import React, { useEffect } from 'react';
import LectureTaskContainer from './LectureTaskContainer';
import {
  setLectureTaskDetail,
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskViewType,
} from '../../store/LectureTaskStore';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';
import { useLectureParams } from '../../store/LectureParamsStore';

function LectureCubeTaskPage() {
  const params = useLectureParams();

  useEffect(() => {
    return () => {
      setLectureTaskOffset(0);
      setLectureTaskViewType('list');
      setLectureTaskDetail();
      setLectureTaskTab('Overview');
    };
  }, [params?.cubeId]);

  useCubeViewEvent();

  // jz - 여기도 코드 이상했음, 왜 lecturesStructure 를 검사했지?
  return <LectureTaskContainer />;
}

export default LectureCubeTaskPage;

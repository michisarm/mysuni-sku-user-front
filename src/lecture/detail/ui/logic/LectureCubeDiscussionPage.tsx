import React, { useEffect } from 'react';
import LectureCubeDiscussionContainer from './LectureCubeDiscussionContainer';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';
import { useLectureParams } from '../../store/LectureParamsStore';

function LectureCubeDiscussionPage() {
  const params = useLectureParams();

  useEffect(() => {
    console.log("LectureCubeDiscussionPage", params)
  }, [params?.cubeId]);

  useCubeViewEvent();

  return <LectureCubeDiscussionContainer />;
}

export default LectureCubeDiscussionPage;

import React from 'react';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';

function LectureCubeElearningPage() {
  useCubeViewEvent();

  return (
    <>
      <LectureCubeSummaryContainer />
      <LectureCubeContentContainer />
    </>
  );
}

export default LectureCubeElearningPage;

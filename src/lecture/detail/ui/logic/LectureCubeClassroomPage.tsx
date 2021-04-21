import React, { Fragment, useEffect } from 'react';
import { useCubeViewEvent } from '../../service/useActionLog/useCubeViewEvent';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeClassroomPage() {
  useCubeViewEvent();

  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      <LectureCubeContentContainer />
    </Fragment>
  );
}

export default LectureCubeClassroomPage;

import React, { Fragment } from 'react';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeClassroomPage() {
  return (
    <Fragment>
      <LectureCubeSummaryContainer />
      <LectureCubeContentContainer />
    </Fragment>
  );
}

export default LectureCubeClassroomPage;

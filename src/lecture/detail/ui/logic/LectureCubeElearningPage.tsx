import React from 'react';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeElearningPage() {
  return (
    <>
      <LectureCubeSummaryContainer />
      <LectureCubeContentContainer />
    </>
  );
}

export default LectureCubeElearningPage;

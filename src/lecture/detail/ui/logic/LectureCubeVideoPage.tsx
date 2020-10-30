import { useLectuerCubeOverview } from 'lecture/detail/service/useLectuerCubeOverview/useLectuerCubeOverview';
import React from 'react';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import LectureVideoContainer from './LectureVideoContainer';

function LectureCubeVideoPage() {
  useLectuerCubeOverview();
  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      <LectureVideoContainer />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeVideoPage;

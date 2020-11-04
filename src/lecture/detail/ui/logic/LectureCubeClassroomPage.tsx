import React from 'react';
import { useLectuerCubeOverview } from '../../service/useLectuerCubeOverview/useLectuerCubeOverview';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeClassroomPage() {
  useLectuerCubeOverview();
  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeClassroomPage;

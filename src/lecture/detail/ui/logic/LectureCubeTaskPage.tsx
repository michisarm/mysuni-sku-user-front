import { useLectuerCubeOverview } from 'lecture/detail/service/useLectuerCubeOverview/useLectuerCubeOverview';
import React, { useState } from 'react';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import LectureTaskContainer from './LectureTaskContainer';

function LectureCubeTaskPage() {
  useLectuerCubeOverview();
  return (
    <LectureDetailLayout>
      <LectureTaskContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeTaskPage;

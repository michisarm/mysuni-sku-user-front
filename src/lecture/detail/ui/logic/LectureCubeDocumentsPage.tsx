import React from 'react';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureCubeDocumentsContainer from './LectureCubeDocumentsContainer';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeDocumentsPage() {
  useLectureMedia();

  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      <LectureCubeDocumentsContainer />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeDocumentsPage;

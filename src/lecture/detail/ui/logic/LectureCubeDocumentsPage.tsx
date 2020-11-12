import React from 'react';
import { useLectuerCubeOverview } from '../../service/useLectuerCubeOverview/useLectuerCubeOverview';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureDocumentsView from '../view/LectureDocumentsView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';
import LectureCubeDocumentsContainer from './LectureCubeDocumentsContainer';

function LectureCubeDocumentsPage() {
  useLectuerCubeOverview();

  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      <LectureCubeDocumentsContainer />
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeDocumentsPage;

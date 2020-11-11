import React from 'react';
import { useLectuerCubeOverview } from '../../service/useLectuerCubeOverview/useLectuerCubeOverview';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import { useLectureMedia } from '../../service/useLectureMedia/useLectureMedia';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureDocumentsView from '../view/LectureDocumentsView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeDocumentsPage() {
  useLectuerCubeOverview();
  useLectureMedia();
  const [lectureWebpage] = useLectureWebpage();
  return (
    <LectureDetailLayout>
      <LectureCubeSummaryContainer />
      {lectureWebpage && <LectureDocumentsView {...lectureWebpage} />}
      <LectureCubeContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureCubeDocumentsPage;

/**
 * http://ma.mysuni.sk.com/api/action-log-collector/events/study
 * http://ma.mysuni.sk.com/api/lecture/students/flow
 * http://ma.mysuni.sk.com/api/mytraining/mytraining/mytrainings/byState/filterWithJoinedValue
 */

import React from 'react';
import { useLectuerCubeOverview } from '../../service/useLectuerCubeOverview/useLectuerCubeOverview';
import { useLectureWebpage } from '../../service/useLectureWebpage/useLectureWebpage';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureDocumentsView from '../view/LectureDocumentsView';
import LectureCubeContentContainer from './LectureCubeOverview/LectureCubeContentContainer';
import LectureCubeSummaryContainer from './LectureCubeOverview/LectureCubeSummaryContainer';

function LectureCubeDocumentsPage() {
  useLectuerCubeOverview();
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

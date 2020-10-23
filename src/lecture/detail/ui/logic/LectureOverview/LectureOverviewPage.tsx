import { useLectureOverview } from 'lecture/detail/service/useLectureOverview/useLectureOverview';
import React from 'react';
import LectureDetailLayout from '../../view/LectureDetailLayout';
import LectureDescriptionContainer from './LectureDescriptionContainer';
import LectureSummaryContainer from './LectureSummaryContainer';

function LectureOverviewPage() {
  useLectureOverview();
  return (
    <LectureDetailLayout>
      <LectureSummaryContainer />
      <LectureDescriptionContainer />
    </LectureDetailLayout>
  );
}

export default LectureOverviewPage;

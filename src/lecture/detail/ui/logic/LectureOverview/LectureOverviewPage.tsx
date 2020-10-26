import { useLectureOverview } from 'lecture/detail/service/useLectureOverview/useLectureOverview';
import React from 'react';
import LectureDetailLayout from '../../view/LectureDetailLayout';
import LectureContentContainer from './LectureContentContainer';
import LectureSummaryContainer from './LectureSummaryContainer';

function LectureOverviewPage() {
  useLectureOverview();
  return (
    <LectureDetailLayout>
      <LectureSummaryContainer />
      <LectureContentContainer />
    </LectureDetailLayout>
  );
}

export default LectureOverviewPage;

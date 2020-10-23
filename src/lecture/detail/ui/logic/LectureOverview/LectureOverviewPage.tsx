import { useLectureOverview } from 'lecture/detail/service/useLectureOverview/useLectureOverview';
import React from 'react';
import LectureDetailLayout from '../../view/LectureDetailLayout';
import LectureSummaryContainer from './LectureSummaryContainer';

function LectureOverviewPage() {
  useLectureOverview();
  return (
    <LectureDetailLayout>
      <LectureSummaryContainer />
    </LectureDetailLayout>
  );
}

export default LectureOverviewPage;

import { useLectureSummary } from 'lecture/detail/service/useLectureOverview/useLectureSummary';
import React from 'react';
import LectureSummaryView from '../../view/LectureOverview/LectureSummaryView';

function LectureSummaryContainer() {
  const [lectureSummary] = useLectureSummary();
  return (
    <>
      {lectureSummary && <LectureSummaryView lectureSummary={lectureSummary} />}
    </>
  );
}

export default LectureSummaryContainer;

import React from 'react';
import { useLectureCourseSummary } from '../../../service/useLectureCourseOverview/useLectureCourseSummary';
import LectureCourseSummaryView from '../../view/LectureOverview/LectureCourseSummaryView';

function LectureCourseSummaryContainer() {
  const [lectureSummary] = useLectureCourseSummary();
  return (
    <>
      {lectureSummary && (
        <LectureCourseSummaryView lectureSummary={lectureSummary} />
      )}
    </>
  );
}

export default LectureCourseSummaryContainer;

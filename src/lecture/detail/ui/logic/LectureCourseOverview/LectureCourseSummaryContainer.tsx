import React from 'react';
import { useLectureReview } from '../../../service/useLectuerCubeOverview/useLectureReview';
import { useLectureCourseSummary } from '../../../service/useLectureCourseOverview/useLectureCourseSummary';
import LectureCourseSummaryView from '../../view/LectureOverview/LectureCourseSummaryView';

function LectureCourseSummaryContainer() {
  const [lectureSummary] = useLectureCourseSummary();
  const [lectureReview] = useLectureReview();
  return (
    <>
      {lectureSummary && (
        <LectureCourseSummaryView
          lectureSummary={lectureSummary}
          lectureReview={lectureReview}
        />
      )}
    </>
  );
}

export default LectureCourseSummaryContainer;

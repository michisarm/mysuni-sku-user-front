import React from 'react';
import { useLectureReview } from '../../../service/useLectuerCubeOverview/useLectureReview';
import { useLectureCubeSummary } from '../../../service/useLectureCourseOverview/useLectureCubeSummary';
import { useLectureInstructor } from '../../../service/useLectureCourseOverview/useLectureInstructor';
import LectureCubeSummaryView from '../../view/LectureOverview/LectureCubeSummaryView';

function LectureCubeSummaryContainer() {
  const [lectureSummary] = useLectureCubeSummary();
  const [lectureInstructor] = useLectureInstructor();
  const [lectureReview] = useLectureReview();
  return (
    <>
      {lectureSummary && (
        <LectureCubeSummaryView
          lectureSummary={lectureSummary}
          lectureInstructor={lectureInstructor}
          lectureReview={lectureReview}
        />
      )}
    </>
  );
}

export default LectureCubeSummaryContainer;

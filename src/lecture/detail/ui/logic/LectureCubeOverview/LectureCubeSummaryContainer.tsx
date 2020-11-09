import React from 'react';
import { useLectureReview } from '../../../service/useLectuerCubeOverview/useLectureReview';
import { useLectureClassroom } from '../../../service/useLectureClassroom/useLectureClassroom';
import { useLectureCubeSummary } from '../../../service/useLectureCourseOverview/useLectureCubeSummary';
import { useLectureInstructor } from '../../../service/useLectureCourseOverview/useLectureInstructor';
import LectureCubeSummaryView from '../../view/LectureOverview/LectureCubeSummaryView';

function LectureCubeSummaryContainer() {
  const [lectureSummary] = useLectureCubeSummary();
  const [lectureInstructor] = useLectureInstructor();
  const [lectureReview] = useLectureReview();
  const [lectureClassroom] = useLectureClassroom();
  return (
    <>
      {lectureSummary && (
        <LectureCubeSummaryView
          lectureSummary={lectureSummary}
          lectureInstructor={lectureInstructor}
          lectureReview={lectureReview}
          lectureClassroom={lectureClassroom}
        />
      )}
    </>
  );
}

export default LectureCubeSummaryContainer;

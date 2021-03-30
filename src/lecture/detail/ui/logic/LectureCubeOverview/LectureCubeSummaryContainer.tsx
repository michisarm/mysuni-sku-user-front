import { useLectureCourseSummary } from 'lecture/detail/service/useLectureCourseOverview/useLectureCourseSummary';
import React from 'react';
import { useLectureReview } from '../../../service/useLectuerCubeOverview/useLectureReview';
import { useLectureClassroom } from '../../../service/useLectureClassroom/useLectureClassroom';
import { useLectureCourseOverview } from '../../../service/useLectureCourseOverview/useLectureCourseOverview';
import { useLectureCubeSummary } from '../../../service/useLectureCourseOverview/useLectureCubeSummary';
import { useLectureInstructor } from '../../../service/useLectureCourseOverview/useLectureInstructor';
import LectureCubeSummaryView from '../../view/LectureOverview/LectureCubeSummaryView';

function LectureCubeSummaryContainer() {
  useLectureCourseOverview();
  const [lectureSummary] = useLectureCubeSummary();
  const [lectureCourseSummary] = useLectureCourseSummary();
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
          lectureCourseSummary={lectureCourseSummary}
        />
      )}
    </>
  );
}

export default LectureCubeSummaryContainer;

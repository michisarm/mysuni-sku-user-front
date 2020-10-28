import React from 'react';
import { useLectureCubeSummary } from '../../../service/useLectureCourseOverview/useLectureCubeSummary';
import { useLectureInstructor } from '../../../service/useLectureCourseOverview/useLectureInstructor';
import LectureCubeSummaryView from '../../view/LectureOverview/LectureCubeSummaryView';

function LectureCubeSummaryContainer() {
  const [lectureSummary] = useLectureCubeSummary();
  const [lectureInstructor] = useLectureInstructor();
  return (
    <>
      {lectureSummary && (
        <LectureCubeSummaryView
          lectureSummary={lectureSummary}
          lectureInstructor={lectureInstructor}
        />
      )}
    </>
  );
}

export default LectureCubeSummaryContainer;

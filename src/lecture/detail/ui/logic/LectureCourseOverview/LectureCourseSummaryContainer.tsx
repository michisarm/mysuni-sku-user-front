import React, { useEffect } from 'react';
import { useLectureReview } from '../../../service/useLectuerCubeOverview/useLectureReview';
import { useLectureCourseSummary, getCourseLectureSummary } from '../../../service/useLectureCourseOverview/useLectureCourseSummary';
import LectureCourseSummaryView from '../../view/LectureOverview/LectureCourseSummaryView';

import { useLectureRouterParams } from 'lecture/detail/service/useLectureRouterParams';
import LectureRouterParams from 'lecture/detail/viewModel/LectureRouterParams';
import { getLectureCourseSummaryLearningState } from '../../../store/LectureOverviewStore';

function LectureCourseSummaryContainer() {
  const [lectureSummary] = useLectureCourseSummary();
  const [lectureReview] = useLectureReview();

  const params: any = useLectureRouterParams();
  getCourseLectureSummary(params);

  const lectureLearningState = getLectureCourseSummaryLearningState();

  return (
    <>
      {lectureSummary && (
        <LectureCourseSummaryView
          lectureSummary={lectureSummary}
          lectureReview={lectureReview}
          lectureLearningState={lectureLearningState}
        />
      )}
    </>
  );
}

export default LectureCourseSummaryContainer;

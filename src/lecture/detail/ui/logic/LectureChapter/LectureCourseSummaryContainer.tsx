import React from 'react';
import { useLectureReview } from '../../../service/useLectuerCubeOverview/useLectureReview';
import LectureCourseSummaryView from '../../view/LectureOverview/LectureCourseSummaryView';

import { useLectureStructure } from '../../../store/LectureStructureStore';
import { useLectureCardSummary } from '../../../store/LectureOverviewStore';

function LectureCardSummaryContainer() {
  const lectureSummary = useLectureCardSummary();
  const [lectureReview] = useLectureReview();
  const lectureStructure = useLectureStructure();
  // jz - 이게 머야????
  // const params: any = useLectureParams();
  // getCardLectureSummary(params);

  // const lectureLearningState = getLectureCardSummaryLearningState();

  return (
    <>
      {lectureSummary && lectureStructure && (
        <LectureCourseSummaryView
          lectureSummary={lectureSummary}
          lectureReview={lectureReview}
          lectureStructure={lectureStructure}
        />
      )}
    </>
  );
}

export default LectureCardSummaryContainer;

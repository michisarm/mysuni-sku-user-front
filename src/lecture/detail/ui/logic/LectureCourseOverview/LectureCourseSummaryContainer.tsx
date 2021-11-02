import React, { useEffect, useState } from 'react';
import { useLectureReview } from '../../../service/useLectuerCubeOverview/useLectureReview';
import LectureCourseSummaryView from '../../view/LectureOverview/LectureCourseSummaryView';

import { useLectureStructure } from '../../../store/LectureStructureStore';
import { useLectureCardSummary } from '../../../store/LectureOverviewStore';
import findAvailablePageElements from '../../../../shared/api/arrangeApi';
import { PageElement } from '../../../../shared/model/PageElement';
import { isExternalInstructor } from '../../../../../shared/helper/findUserRole';

function LectureCardSummaryContainer() {
  const lectureSummary = useLectureCardSummary();
  const [lectureReview] = useLectureReview();
  const lectureStructure = useLectureStructure();
  // jz - 이게 머야????
  // const params: any = useLectureParams();
  // getCardLectureSummary(params);

  // const lectureLearningState = getLectureCardSummaryLearningState();
  const [menuAuth, setMenuAuth] = useState<PageElement[]>([]);

  useEffect(() => {
    //const axios = getAxios();
    const fetchMenu = async () => {
      const response = await findAvailablePageElements();
      setMenuAuth(response);
    };
    fetchMenu();
  }, []);

  return (
    <>
      {lectureSummary && lectureStructure && (
        <LectureCourseSummaryView
          lectureSummary={lectureSummary}
          lectureReview={lectureReview}
          lectureStructure={lectureStructure}
          menuAuth={menuAuth}
        />
      )}
    </>
  );
}

export default LectureCardSummaryContainer;

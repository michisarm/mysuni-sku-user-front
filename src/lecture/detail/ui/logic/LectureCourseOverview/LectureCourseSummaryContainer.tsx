import React, { useEffect, useState } from 'react';
import { findAvailablePageElementsCache } from '../../../../shared/api/arrangeApi';
import { PageElement } from '../../../../shared/model/PageElement';
import { useLectureCardSummary } from '../../../store/LectureOverviewStore';
import { useLectureStructure } from '../../../store/LectureStructureStore';
import LectureCourseSummaryView from '../../view/LectureOverview/LectureCourseSummaryView';

function LectureCardSummaryContainer() {
  const lectureSummary = useLectureCardSummary();
  const lectureStructure = useLectureStructure();
  // jz - 이게 머야????
  // const params: any = useLectureParams();
  // getCardLectureSummary(params);

  // const lectureLearningState = getLectureCardSummaryLearningState();
  const [menuAuth, setMenuAuth] = useState<PageElement[]>([]);

  useEffect(() => {
    //const axios = getAxios();
    const fetchMenu = async () => {
      const response = await findAvailablePageElementsCache();
      if (response !== undefined) {
        setMenuAuth(response);
      }
    };
    fetchMenu();
  }, []);

  return (
    <>
      {lectureSummary && lectureStructure && (
        <LectureCourseSummaryView
          lectureSummary={lectureSummary}
          lectureStructure={lectureStructure}
          menuAuth={menuAuth}
        />
      )}
    </>
  );
}

export default LectureCardSummaryContainer;

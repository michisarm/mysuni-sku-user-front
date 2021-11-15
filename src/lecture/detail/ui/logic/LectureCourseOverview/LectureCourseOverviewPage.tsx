import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRequestLectureCardOverview } from '../../../service/useLectureCourseOverview/useRequestLectureCourseOverview';
import { useLectureStructure } from '../../../store/LectureStructureStore';
import LectureCubeNavigatorView from '../../view/LectureOverview/LectureCubeNavigatorView';
import LectureCourseContentContainer from './LectureCourseContentContainer';
import LectureCourseSummaryContainer from './LectureCourseSummaryContainer';
import { onOpenLectureCardPisAgreementModal } from '../../../service/LectureCardAgreementModal/useLectureAgreemenetModal';
import { LectureCardAgreementModalView } from '../../view/LectureStateView/LectureCardAgreementModalView';
import { isPisAgreementPassed } from '../../../service/useLectureStructure/utility/requestCardLectureStructure';

export async function isOpenPassedPisAgreementModal(cardId: string) {
  const { isPisAgreement } = await isPisAgreementPassed(cardId);

  // console.log(isPisAgreement);

  if (!isPisAgreement) {
    // Model 띄우기
    onOpenLectureCardPisAgreementModal(true);
    // onOpenLectureCardPisAgreementModal();
  }
}

function LectureCourseOverviewPage() {
  useRequestLectureCardOverview();
  const lectureStructure = useLectureStructure();

  const history = useHistory();
  useEffect(() => {
    if (lectureStructure === undefined) {
      return;
    }
    if (
      lectureStructure.cubes.length === 1 &&
      lectureStructure.items.length === 1 &&
      lectureStructure.card.test === undefined &&
      lectureStructure.card.report === undefined &&
      lectureStructure.card.survey === undefined
    ) {
      history.replace(lectureStructure.cubes[0].path);
    }
    isOpenPassedPisAgreementModal(lectureStructure.card.cardId);
  }, [lectureStructure]);

  return (
    <Fragment>
      {lectureStructure !== undefined && (
        <>
          <LectureCubeNavigatorView lectureStructure={lectureStructure} />
          <LectureCardAgreementModalView
            cardId={lectureStructure.card.cardId}
          />
        </>
      )}
      <LectureCourseSummaryContainer />
      <LectureCourseContentContainer />
    </Fragment>
  );
}

export default LectureCourseOverviewPage;

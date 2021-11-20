import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { isOpenPassedPreCourseModal } from './LectureDetailCubeSubRoutes';
import { setLectureParams } from './store/LectureParamsStore';
import LectureChapterPage from './ui/logic/LectureChapter/LectureChapterPage';
import LectureDiscussionPage from './ui/logic/LectureDiscussionPage';
import LectureParams from './viewModel/LectureParams';

// export async function isOpenPassedPisAgreementModal(cardId: string) {
//   const isPisAgreement = await isPisAgreementPassed(cardId);
//
//   if (!isPisAgreement) {
//     // Model 띄우기
//     onOpenLectureCardPisAgreementModal();
//   }
// }

function LectureDetailCourseSubRoutes() {
  const params = useParams<LectureParams>();
  const { viewType, cardId } = params;
  const { pathname } = useLocation();

  // viewType === 'discussion'
  //   ? isOpenPassedPreCourseModal(cardId)
  //   : isOpenPassedPisAgreementModal(cardId);

  viewType === 'discussion' && isOpenPassedPreCourseModal(cardId);

  useEffect(() => {
    setLectureParams({ ...params, pathname });
  }, [params, pathname]);

  return (
    <>
      {viewType === 'chapter' && <LectureChapterPage />}
      {viewType === 'discussion' && <LectureDiscussionPage />}
    </>
  );
}

export default LectureDetailCourseSubRoutes;

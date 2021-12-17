import React, { useEffect, useState } from 'react';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import LectureCubeAudioPage from './ui/logic/LectureCubeAudioPage';
import LectureCubeClassroomPage from './ui/logic/LectureCubeClassroomPage';
import LectureCubeDocumentsPage from './ui/logic/LectureCubeDocumentsPage';
import LectureCubeElearningPage from './ui/logic/LectureCubeElearningPage';
import LectureCubeTaskPage from './ui/logic/LectureCubeTaskPage';
import LectureCubeVideoPage from './ui/logic/LectureCubeVideoPage';
import LectureCubeWebPagePage from './ui/logic/LectureCubeWebPagePage';
import { useHistory, useParams } from 'react-router';
import LectureParams from './viewModel/LectureParams';
import LectureCubeCohortPage from './ui/logic/LectureCubeCohortPage';
import LectureCubeDiscussionPage from './ui/logic/LectureCubeDiscussionPage';
import lecturePath from '../routePaths';
import { getPreCourseFailCardId } from './service/useLectureStructure/utility/requestCardLectureStructure';
import { getCurrentHistory } from '../../shared/store/HistoryStore';
import { getPolyglotText } from '../../shared/ui/logic/PolyglotText';
import { isPisAgreementPassed } from './service/useLectureStructure/utility/requestCardLectureStructure';
import { LectureCardAgreementModalView } from './ui/view/LectureStateView/LectureCardAgreementModalView';
import { onOpenLectureCardPisAgreementModal } from './service/LectureCardAgreementModal/useLectureAgreemenetModal';
import { requestLectureSurvey } from './service/useLectureSurvey/utility/getLectureSurvey';

export async function isOpenPassedPreCourseModal(cardId: string) {
  const failCardId = await getPreCourseFailCardId(cardId);

  const { isPisAgreement, singleCube } = await isPisAgreementPassed(cardId);
  const history = getCurrentHistory();

  if (failCardId === null) {
    reactAlert({
      title: '안내',
      message: '알수 없는 오류가 발생했습니다',
      // onClose: () => history?.push(lecturePath.lectureCard(cardId)),
    });
  }

  if (failCardId !== '' && failCardId !== null) {
    // reactAlert({
    //   title: '안내',
    //   message: '선수 학습 완료 후 진행이 가능합니다.',
    //   onClose: () => history?.push(lecturePath.lectureCard(cardId)),
    // });

    reactConfirm({
      title: getPolyglotText('안내', 'lecture-preCard-confirm-title'),
      message: getPolyglotText(
        '선수 학습 완료 후 진행이 가능합니다. 선수 학습으로 이동하시겠습니까?',
        'lecture-preCard-confirm-message'
      ),
      onOk: () => history?.push(lecturePath.lectureCard(failCardId)),
      onCancel: () => {
        history?.push(lecturePath.lectureCard(cardId));
      },
    });
  }

  if (!isPisAgreement) {
    // Model 띄우기
    onOpenLectureCardPisAgreementModal(singleCube);
    // onOpenLectureCardPisAgreementModal();
  }
}

function LectureDetailCubeSubRoutes() {
  const { cubeType, cardId, cubeId } = useParams<LectureParams>();
  isOpenPassedPreCourseModal(cardId);
  requestLectureSurvey();

  return (
    <>
      {cubeType === 'Video' && <LectureCubeVideoPage />}
      {cubeType === 'Audio' && <LectureCubeAudioPage />}
      {cubeType === 'WebPage' && <LectureCubeWebPagePage />}
      {cubeType === 'Experiential' && <LectureCubeWebPagePage />}
      {cubeType === 'ELearning' && <LectureCubeElearningPage />}
      {cubeType === 'Task' && <LectureCubeTaskPage />}
      {cubeType === 'Documents' && <LectureCubeDocumentsPage />}
      {cubeType === 'ClassRoomLecture' && <LectureCubeClassroomPage />}
      {cubeType === 'Cohort' && <LectureCubeCohortPage />}
      {cubeType === 'Discussion' && <LectureCubeDiscussionPage />}
      <LectureCardAgreementModalView cardId={cardId} />
    </>
  );
}

export default LectureDetailCubeSubRoutes;

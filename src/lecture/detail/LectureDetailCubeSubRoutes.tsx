import React, { useEffect, useState } from 'react';
import { reactAlert } from '@nara.platform/accent';
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
import {
  isPisAgreementPassed,
  isPrecoursePassed,
} from './service/useLectureStructure/utility/requestCardLectureStructure';
import { getCurrentHistory } from '../../shared/store/HistoryStore';
import { LectureCardAgreementModalView } from './ui/view/LectureStateView/LectureCardAgreementModalView';
import { onOpenLectureCardPisAgreementModal } from './service/LectureCardAgreementModal/useLectureAgreemenetModal';

export async function isOpenPassedPreCourseModal(cardId: string) {
  const isPassed = await isPrecoursePassed(cardId);
  const { isPisAgreement, singleCube } = await isPisAgreementPassed(cardId);
  const history = getCurrentHistory();

  if (!isPassed) {
    reactAlert({
      title: '안내',
      message: '선수 학습 완료 후 진행이 가능합니다.',
      onClose: () => history?.push(lecturePath.lectureCard(cardId)),
    });
  }

  if (!isPisAgreement) {
    // Model 띄우기
    onOpenLectureCardPisAgreementModal(singleCube);
  }
}

function LectureDetailCubeSubRoutes() {
  const { cubeType, cardId } = useParams<LectureParams>();
  isOpenPassedPreCourseModal(cardId);

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

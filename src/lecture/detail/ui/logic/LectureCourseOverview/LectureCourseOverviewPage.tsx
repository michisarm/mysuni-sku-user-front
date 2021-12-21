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
import { useLectureSurvey } from 'lecture/detail/service/useLectureSurvey/useLectureSurvey';
import { requestLectureCouseFeedback } from 'lecture/detail/service/useLectureCourseFeedbackView/utility/requestLectureCouseFeedback';
import { useLectureSurveyAnswerSheet } from 'lecture/detail/store/LectureSurveyStore';

export async function isOpenPassedPisAgreementModal(cardId: string) {
  const { isPisAgreement } = await isPisAgreementPassed(cardId);

  if (!isPisAgreement) {
    // Model 띄우기
    onOpenLectureCardPisAgreementModal(true);
    // onOpenLectureCardPisAgreementModal();
  }
}

function LectureCourseOverviewPage() {
  const lectureStructure = useLectureStructure();
  const [lectureSurvey] = useLectureSurvey();
  const answerSheet = useLectureSurveyAnswerSheet();

  useEffect(() => {
    lectureSurvey && requestLectureCouseFeedback(lectureSurvey);
  }, [lectureSurvey, answerSheet]);

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
      return;
    }
    if (
      // eslint-disable-next-line
      location.pathname.endsWith('/redirect-cube') &&
      lectureStructure.cubes.length !== 0 &&
      lectureStructure.cubes.some(
        (c) => c.state === 'Progress' || c.state === 'Completed'
      )
    ) {
      // 모두 학습 완료인 경우
      if (lectureStructure.cubes.every((c) => c.state === 'Completed')) {
        if (
          lectureStructure.card.report?.state === 'None' ||
          lectureStructure.card.report?.state === 'Progress'
        ) {
          history.push(lectureStructure.card.report.path);
          return;
        }
        if (
          lectureStructure.card.test?.state === 'None' ||
          lectureStructure.card.test?.state === 'Progress'
        ) {
          history.push(lectureStructure.card.test.path);
          return;
        }
        if (
          lectureStructure.card.survey?.state === 'None' ||
          lectureStructure.card.survey?.state === 'Progress'
        ) {
          history.push(lectureStructure.card.survey.path);
          return;
        }
      }
      // 학습 중인 큐브가 없어서, 새로운 큐브로 이동
      else if (!lectureStructure.cubes.some((c) => c.state === 'Progress')) {
        const cube = lectureStructure.cubes.find(
          (c) => c.state !== 'Progress' && c.state !== 'Completed'
        );
        if (cube !== undefined) {
          history.push(cube.path);
          return;
        }
      }
      // 최근 학습 중인 큐브로 이동
      else {
        let modifiedTime = 0;
        let path: string | null = null;
        lectureStructure.cubes
          .filter((c) => c.state === 'Progress')
          .forEach((c) => {
            if (c.student !== undefined) {
              if (c.student.modifiedTime > modifiedTime) {
                modifiedTime = c.student.modifiedTime;
                path = c.path;
              }
            }
          });
        if (path !== null) {
          history.replace(path);
          return;
        }
      }
    }

    if (lectureStructure.card.cardId !== '') {
      isOpenPassedPisAgreementModal(lectureStructure.card.cardId);
    }
  }, [history, lectureStructure]);

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

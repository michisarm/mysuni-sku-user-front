import React, { useCallback, useState } from 'react';
import { Modal, Image } from 'semantic-ui-react';
import LectureSurvey from 'lecture/detail/viewModel/LectureSurvey';
import LectureSurveySummaryChoiceView from './LectureSurveySummaryChoiceView';
import LectureSurveySummaryEssayView from './LectureSurveySummaryEssayView';
import LectureSurveySummaryDateView from './LectureSurveySummaryDateView';
import { useLectureSurveySummary } from 'lecture/detail/store/LectureSurveyStore';
import LectureSurveyState from 'lecture/detail/viewModel/LectureSurveyState';
import LectureSurveySummaryBooleanView from './LectureSurveySummaryBooleanView';
import LectureSurveySummaryCriterionView from './LectureSurveySummaryCriterionView';
import LectureSurveySummaryMatrixView from './LectureSurveySummaryMatrixView';
import { requestLectureSurveySummary } from '../../../service/useLectureSurvey/utility/getLectureSurvey';
import CommunityMenu from 'community/model/CommunityMenu';
import { LectureStructure } from 'lecture/detail/viewModel/LectureStructure';
import { finishLectureSurveyState } from 'lecture/detail/service/useLectureSurvey/utility/saveLectureSurveyState';

interface Props {
  trigger: React.ReactNode;
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
  currentMenu?: CommunityMenu;
  lectureStructure?: LectureStructure;
}

const LectureSurveyResultModalView: React.FC<Props> = function LectureSurveyResultModalView({
  trigger,
  lectureSurvey,
  lectureSurveyState,
  currentMenu,
  lectureStructure,
}) {
  const { title, surveyId, surveyCaseId, surveyItems } = lectureSurvey;
  const lectureSurveySummary = useLectureSurveySummary();
  const [open, setOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setOpen(true);
    requestLectureSurveySummary(surveyId, surveyCaseId);
  }, [surveyId, surveyCaseId]);

  const onClose = useCallback(() => {
    setOpen(false);
    finishLectureSurveyState();
  }, []);

  const onCancel = useCallback(() => {
    onClose();
  }, []);

  const respondCount = lectureSurveySummary?.respondentCount.respondentCount;
  const surveyCommunityTitle = currentMenu?.name;
  const surveyCourseTitle = lectureStructure?.course?.name;
  const surveyCubeTitle = lectureStructure?.cube?.name;
  const surveyTitle =
    surveyCommunityTitle === undefined
      ? surveyCourseTitle || surveyCubeTitle
      : surveyCommunityTitle;

  return (
    <>
      <Modal
        open={open}
        trigger={trigger}
        onOpen={onOpen}
        onClose={onClose}
        style={{ height: '840px', width: '1010px' }}
      >
        <Modal.Header style={{ height: '61px', lineHeight: '1.2rem' }}>
          <span className="course-survey-new-modal-header">{surveyTitle}</span>
          <div className="course-survey-new-modal-header-img">
            <Image
              style={{ display: 'inline-block', verticalAlign: 'text-top' }}
              src={`${process.env.PUBLIC_URL}/images/all/survey-popup-title.png`}
            />
          </div>
          <span className="course-survey-new-modal-header">
            총{' '}
            <span className="course-survey-new-modal-header-boldText">
              {respondCount}
            </span>{' '}
            참여
          </span>
          <Modal.Actions style={{ display: 'inline' }}>
            <button
              className="course-survey-new-modal-header-closeBtn"
              onClick={onCancel}
            >
              <Image
                style={{ display: 'inline-block' }}
                src={`${process.env.PUBLIC_URL}/images/all/icon-close-player-28-px.png`}
              />
              Close
            </button>
          </Modal.Actions>
        </Modal.Header>
        <Modal.Content scrolling={true} style={{ maxHeight: '80vh' }}>
          {lectureSurvey.surveyItems.map(lectureSurveyItem => {
            if (lectureSurveyItem.type === 'Choice') {
              return (
                <>
                  <LectureSurveySummaryChoiceView
                    lectureSurveyItem={lectureSurveyItem}
                    lectureSurveyAnswerItem={
                      lectureSurveyState &&
                      lectureSurveyState.answerItem.find(
                        c =>
                          c.questionNumber === lectureSurveyItem.questionNumber
                      )
                    }
                    key={lectureSurveyItem.id}
                  />
                </>
              );
            }
            if (lectureSurveyItem.type === 'Essay') {
              return (
                <LectureSurveySummaryEssayView
                  lectureSurveyItem={lectureSurveyItem}
                  lectureSurveyAnswerItem={
                    lectureSurveyState &&
                    lectureSurveyState.answerItem.find(
                      c => c.questionNumber === lectureSurveyItem.questionNumber
                    )
                  }
                  key={lectureSurveyItem.id}
                />
              );
            }
            if (lectureSurveyItem.type === 'Date') {
              return (
                <LectureSurveySummaryDateView
                  lectureSurveyItem={lectureSurveyItem}
                  lectureSurveyAnswerItem={
                    lectureSurveyState &&
                    lectureSurveyState.answerItem.find(
                      c => c.questionNumber === lectureSurveyItem.questionNumber
                    )
                  }
                  key={lectureSurveyItem.id}
                />
              );
            }
            if (lectureSurveyItem.type === 'Boolean') {
              return (
                <LectureSurveySummaryBooleanView
                  lectureSurveyItem={lectureSurveyItem}
                  lectureSurveyAnswerItem={
                    lectureSurveyState &&
                    lectureSurveyState.answerItem.find(
                      c => c.questionNumber === lectureSurveyItem.questionNumber
                    )
                  }
                  key={lectureSurveyItem.id}
                />
              );
            }
            if (lectureSurveyItem.type === 'Matrix') {
              return (
                <LectureSurveySummaryMatrixView
                  lectureSurveyItem={lectureSurveyItem}
                  lectureSurveyAnswerItem={
                    lectureSurveyState &&
                    lectureSurveyState.answerItem.find(
                      c => c.questionNumber === lectureSurveyItem.questionNumber
                    )
                  }
                  key={lectureSurveyItem.id}
                />
              );
            }
            if (lectureSurveyItem.type === 'Criterion') {
              return (
                <LectureSurveySummaryCriterionView
                  lectureSurveyItem={lectureSurveyItem}
                  lectureSurveyAnswerItem={
                    lectureSurveyState &&
                    lectureSurveyState.answerItem.find(
                      c => c.questionNumber === lectureSurveyItem.questionNumber
                    )
                  }
                  key={lectureSurveyItem.id}
                />
              );
            }
          })}
        </Modal.Content>
      </Modal>
    </>
  );
};

export default LectureSurveyResultModalView;

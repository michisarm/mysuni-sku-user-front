import { reactConfirm } from '@nara.platform/accent';
import { saveTestAnswerSheet } from 'lecture/detail/service/useLectureTest/utility/saveCubeLectureTest';
import {
  getLectureTestAnswerItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';
import React, { useCallback } from 'react';
import {
  LectureTestAnswerItem,
  LectureTestItem,
} from '../../../viewModel/LectureTest';
import TestQuestionView from './TestQuestionView';

interface LectureTestViewProps {
  testItem: LectureTestItem;
  answerItem?: LectureTestAnswerItem;
}

const LectureTestView: React.FC<LectureTestViewProps> = function LectureTestView({
  testItem,
  answerItem,
}) {
  const saveAnswerSheet = useCallback(() => {
    let answerItemId = '';
    if (answerItem !== undefined) {
      answerItemId = answerItem.id;
    }

    saveTestAnswerSheet(answerItemId, false, false);
  }, [answerItem]);
  const submitAnswerSheet = useCallback(() => {
    let answerItemId = '';
    if (answerItem !== undefined) {
      answerItemId = answerItem.id;
    }

    if (answerItem!.answers.some(element => element.answer === '')) {
      alert('빈 답안을 작성해주세요!');
    } else {
      reactConfirm({
        title: '알림',
        message: 'Test를 최종 제출 하시겠습니까?',
        onOk: () => {
          answerItem!.submitAnswers = answerItem!.answers;
          setLectureTestAnswerItem(answerItem!);
          saveTestAnswerSheet(answerItemId, true, true);
        },
      });
    }
  }, [answerItem]);

  return (
    <>
      <div className="course-info-detail responsive-course">
        <div className="course-detail-center">
          <div className="main-wrap">
            <div className="scrolling-area area2 ">
              <div className="ui segment full">
                {testItem && (
                  <>
                    <div className="course-info-header">
                      <div className="survey-header">
                        <div className="survey-header-left">
                          {testItem.name}
                        </div>
                        <div className="survey-header-right">
                          <button className="ui button free submit p18">
                            검수중
                          </button>
                        </div>
                        <div className="test-text">
                          <div className="test-text-box">
                            <span>합격점</span>
                            <span>{testItem.successPoint}점</span>
                          </div>
                          <div className="test-text-box">
                            <span>총점</span>
                            <span>{testItem.totalPoint}점</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {testItem &&
                      testItem.questions &&
                      testItem.questions.map(question => {
                        let answer: string = '';
                        if (answerItem !== undefined) {
                          answerItem.answers.map(result => {
                            if (result.questionNo === question.questionNo) {
                              answer = result.answer;
                            }
                          });
                        }
                        return (
                          <TestQuestionView
                            key={'question_' + question.questionNo}
                            question={question}
                            answer={answer}
                          />
                        );
                      })}
                    <div className="survey-preview">
                      <button
                        className="ui button fix line"
                        onClick={saveAnswerSheet}
                      >
                        저장
                      </button>
                      <button
                        className="ui button fix bg"
                        onClick={submitAnswerSheet}
                      >
                        제출
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureTestView;

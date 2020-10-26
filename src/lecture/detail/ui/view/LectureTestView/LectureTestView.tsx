import React from 'react';
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
  return (
    <>
      <div className="course-info-detail responsive-course">
        <div className="course-detail-center">
          <div className="main-wrap">
            <div className="scrolling-area area2 ">
              <div className="ui segment full test-complete">
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
                      <button className="ui button fix line">저장</button>
                      <button className="ui button fix bg">제출</button>
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

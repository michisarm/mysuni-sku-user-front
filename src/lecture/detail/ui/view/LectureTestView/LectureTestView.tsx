import { QuestionType } from 'assistant/paper/model/QuestionType';
import React from 'react';
import TestSingleChoiceView from './TestSingleChoiceView';
import TestMultiChoiceView from './TestMultiChoiceView';
import { LectureTest } from '../../../viewModel/LectureTest';

interface LectureTestViewProps {
  lectureStructure: LectureTest;
}

const LectureTestView: React.FC<LectureTestViewProps> = function LectureTestView({
  lectureStructure,
}) {

  return (
    <>
      <div className="course-info-detail responsive-course">
        <div className="course-detail-center">
          <div className="main-wrap">
            <div className="scrolling-area area2 ">
              <div className="ui segment full">
              { (lectureStructure && lectureStructure.test && (
                <>
                  <div className="course-info-header">
                    
                    <div className="survey-header">
                      <div className="survey-header-left">{lectureStructure.test.name}</div>
                      <div className="survey-header-right">
                        <button className="ui button free submit p18">검수중</button>
                      </div>
                      <div className="test-text">
                        <div className="test-text-box">
                          <span>합격점</span>
                          <span>{lectureStructure.test.successPoint}점</span>
                        </div>
                        <div className="test-text-box">
                          <span>총점</span>
                          <span>{lectureStructure.test.totalPoint}점</span>
                        </div>
                      </div>
                    </div>

                  </div>
                  { lectureStructure && lectureStructure.test && lectureStructure.test.questions &&
                  lectureStructure.test.questions.map((question,index) => (
                    <>
                      <div key={index} className="course-radio-survey">
                        <p>
                          <span>{question.questionNo}</span>{question.direction} ({question.allocatedPoint}점)
                        </p>
                        {question.questionType === QuestionType.SingleChoice && (
                          <TestSingleChoiceView
                            question={question}
                          />
                        ) || ''}
                        {question.questionType === QuestionType.MultiChoice && (
                          <TestMultiChoiceView
                            question={question}
                          />
                        ) || ''}
                        {question.questionType === QuestionType.ShortAnswer && (
                          <>
                            {/*<ShortAnswerView />*/}
                            ShortAnswerView
                          </>
                        ) || ''}
                        {question.questionType === QuestionType.Essay && (
                          <>
                            {/*<EssayView />*/}
                            EssayView
                          </>
                        ) || ''}
                      </div>
                    </>
                  )) }
                  <div className="survey-preview">
                    <button className="ui button fix line">저장</button>
                    <button className="ui button fix bg">제출</button>
                  </div>
                </>
              )) || ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LectureTestView;

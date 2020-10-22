import { QuestionType } from 'assistant/paper/model/QuestionType';
import React from 'react';
import { Checkbox, Form, Icon, Radio } from 'semantic-ui-react';
import { useLectureStructure } from '../../service/useLectureStructure';

function LectureTestContainer() {
  const lectureStructure = useLectureStructure()[0]!;

  return (
    <>
      <div className="course-info-detail responsive-course">
        <div className="course-detail-center">
          <div className="main-wrap">
            <div className="scrolling-area area2 ">
              <div className="ui segment full">
                {/* Header */}
                <div className="course-info-header">
                  {/*<Contentsheader />*/}

                </div>
                { lectureStructure && lectureStructure.test && lectureStructure.test.questions &&
                lectureStructure.test.questions.map((question,index) => (
                  <>
                    <div key={index} className="course-radio-survey">
                      <p>
                        <span>{question.questionNo}</span>{question.direction} ({question.allocatedPoint}점)
                      </p>
                      {question.questionType === QuestionType.SingleChoice && (
                        <div className="course-survey-list">
                          {question.items.map((item,idx) => (
                            <>
                              {/*<SingleChoiceView />*/}
                              <Radio
                                key={idx}
                                className="base"
                                label={item.itemText}
                                name={`test_${question.questionNo}`}
                                value={item.itemNo}
                                /*checked={this.state.value === "value01"*/
                                /*onChange={this.handleChange*/
                              />
                            </>
                          ))}
                        </div>
                      ) || ''}
                      {question.questionType === QuestionType.MultiChoice && (
                        <div className="course-survey-list">
                          {question.items.map((item,idx) => (
                            <>
                              {/*<MultiChoiceView />*/}
                              <Checkbox
                                key={idx}
                                className="base"
                                label={item.itemText}
                                name="radioGroup"
                                value={item.itemNo}
                              />
                            </>
                          ))}
                        </div>
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
              </div>
              <div className="survey-preview">
                <button className="ui button fix line">저장</button>
                <button className="ui button fix bg">제출</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LectureTestContainer;

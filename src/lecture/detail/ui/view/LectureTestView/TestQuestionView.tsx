import React, { useEffect, useState } from 'react';
import TestSingleChoiceView from './TestSingleChoiceView';
import TestMultiChoiceView from './TestMultiChoiceView';
import TestShortAnswerView from './TestShortAnswerView';
import TestEssayView from './TestEssayView';
import {
  getLectureTestAnswerItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';
import LearningState from 'lecture/detail/model/LearningState';
import LectureParams from '../../../viewModel/LectureParams';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import ExamQuestion from '../../../model/ExamQuestion';
import { Button, Icon } from 'semantic-ui-react';
import Image from 'shared/components/Image';

interface TestQuestionViewProps {
  question: ExamQuestion;
  indexNo: number;
  answer?: string;
  answerResult?: boolean;
  readOnly: boolean;
  learningState?: LearningState;
  submitOk: boolean;
  setSubmitOk: (submitOk: boolean) => void;
  dataLoadTime?: Number;
  params: LectureParams;
  obtainedScore: number;
}

function setAnswer(questionNo: number, value: string) {
  const answerItem = getLectureTestAnswerItem();
  if (answerItem === undefined) {
    return;
  }
  const nextAnswers = answerItem.answers.map((answer) => {
    if (questionNo === answer.sequence) {
      return { ...answer, answer: value };
    }
    return answer;
  });
  //if (!nextAnswers.some(answer => answer.questionNo === questionNo)) {
  //  nextAnswers.push({ questionNo, answer: value });
  //}
  const nextAnswerItem = { ...answerItem, answers: nextAnswers };
  setLectureTestAnswerItem(nextAnswerItem);
}

const TestQuestionView: React.FC<TestQuestionViewProps> =
  function TestQuestionView({
    question,
    indexNo,
    answer,
    answerResult,
    readOnly,
    learningState,
    submitOk,
    setSubmitOk,
    dataLoadTime,
    params,
    obtainedScore,
  }) {
    let questionClassName = ' course-radio-survey ';
    if (
      question.questionType === 'ShortAnswer' ||
      question.questionType === 'Essay'
    ) {
      questionClassName += ' survey-radio-img ';
    }
    if (
      question.questionType === 'SingleChoice' ||
      question.questionType === 'MultiChoice' ||
      question.questionType === 'ShortAnswer'
    ) {
      //if (submitted) {
      const lectureStructureItem = getActiveStructureItem(params.pathname);
      if (lectureStructureItem?.student?.extraWork.testStatus === 'PASS') {
        // 답안을 전송했을 경우 채점
        if (answerResult) {
          questionClassName += ' correct ';
        } else {
          questionClassName += ' wrong ';
        }
      }
      //}
      if (question.imagePath !== undefined && question.imagePath !== '') {
        questionClassName += ' survey-radio-img ';
      }
    }
    useEffect(() => {
      if (
        question.questionType === 'SingleChoice' ||
        question.questionType === 'MultiChoice' ||
        question.questionType === 'ShortAnswer'
      ) {
        if (submitOk) {
          if (!answerResult) {
            const lectureStructureItem = getActiveStructureItem(
              params.pathname
            );
            if (
              lectureStructureItem?.student?.extraWork.testStatus === 'FAIL' ||
              lectureStructureItem?.student?.extraWork.testStatus === 'SUBMIT'
            ) {
              setAnswer(question.sequence, ''); // 미이수 로딩시 틀린답안 표시 안함
            }
          }
        }
      }
    }, [
      params.pathname,
      question.sequence,
      learningState,
      submitOk,
      dataLoadTime,
    ]); // 배열에는 변경을 감지할 항목(제출 후 미이수시)

    const lectureStructureItem = getActiveStructureItem(params.pathname);

    const showScore =
      lectureStructureItem &&
      lectureStructureItem.student?.extraWork.testStatus === 'PASS'
        ? true
        : false;

    const [useAnswerView, setUseAnswerView] = useState<boolean>(true);

    let strAnswer = '';
    if (lectureStructureItem?.student?.extraWork.testStatus === 'PASS') {
      if (question.questionType === 'SingleChoice') {
        strAnswer = question.questionAnswer?.answer + '번';
      } else if (question.questionType === 'MultiChoice') {
        question.questionAnswer?.answer
          .split(',')
          .map((result: string, index: number) => {
            if (index === 0) {
              strAnswer = '' + result + '번';
            } else {
              strAnswer += ', ' + result + '번';
            }
          });
      } else if (question.questionType === 'ShortAnswer') {
        strAnswer = question.questionAnswer?.answer;
      }
    }

    return (
      <>
        <div key={question.id} className={questionClassName}>
          <p>
            <span>{indexNo + 1}</span>
            {(question.imagePath && (
              <p>
                <span
                  className="copy"
                  dangerouslySetInnerHTML={{
                    __html: `${question.question} (${question.point}점)`,
                  }}
                />
              </p>
            )) || (
              <>
                <span
                  className="copy"
                  dangerouslySetInnerHTML={{
                    __html: `${question.question} (${question.point}점)`,
                  }}
                />
              </>
            )}
          </p>
          {question.imagePath !== undefined && question.imagePath !== '' && (
            <Image src={question.imagePath} />
          )}
          {question.questionType === 'SingleChoice' && (
            <TestSingleChoiceView
              question={question}
              answer={answer}
              setAnswer={setAnswer}
              readOnly={readOnly}
              setSubmitOk={setSubmitOk}
            />
          )}
          {question.questionType === 'MultiChoice' && (
            <TestMultiChoiceView
              question={question}
              answer={answer}
              setAnswer={setAnswer}
              readOnly={readOnly}
              setSubmitOk={setSubmitOk}
            />
          )}
          {question.questionType === 'ShortAnswer' && (
            <TestShortAnswerView
              question={question}
              answer={answer}
              setAnswer={setAnswer}
              readOnly={readOnly}
            />
          )}
          {question.questionType === 'Essay' && (
            <TestEssayView
              question={question}
              answer={answer}
              setAnswer={setAnswer}
              readOnly={readOnly}
              showScore={showScore}
              obtainedScore={obtainedScore}
            />
          )}

          {lectureStructureItem?.student?.extraWork.testStatus === 'PASS' &&
            question.questionType !== 'Essay' && (
              <>
                {!useAnswerView && (
                  <div className="survey-explain">
                    <Button
                      className="ui icon button right btn-blue"
                      onClick={() => setUseAnswerView(true)}
                    >
                      해설 보기
                      <Icon
                        aria-hidden="true"
                        className="morelink more2 view-down"
                      />
                    </Button>
                  </div>
                )}
                {useAnswerView && (
                  <div className="survey-explain">
                    <Button
                      className="ui icon button right btn-blue"
                      onClick={() => setUseAnswerView(false)}
                    >
                      해설 닫기
                      <Icon aria-hidden="true" className="morelink more2" />
                    </Button>
                    <div className="survey-answer">
                      <span>정답</span>
                      <span>{strAnswer}</span>
                    </div>
                    {question.questionAnswer.explanation && (
                      <div className="survey-answer">
                        <span>해설</span>
                        <span>{question.questionAnswer.explanation}</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
        </div>
      </>
    );
  };

export default TestQuestionView;

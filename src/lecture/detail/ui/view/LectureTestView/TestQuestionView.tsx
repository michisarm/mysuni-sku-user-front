import React, { useEffect } from 'react';
import TestSingleChoiceView from './TestSingleChoiceView';
import TestMultiChoiceView from './TestMultiChoiceView';
import TestShortAnswerView from './TestShortAnswerView';
import TestEssayView from './TestEssayView';
import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import {
  getLectureTestAnswerItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';
import LearningState from 'lecture/detail/model/LearningState';

interface TestQuestionViewProps {
  question: ExamQuestion;
  answer?: string;
  answerResult?: boolean;
  submitted?: boolean;
  readOnly: boolean;
  learningState?: LearningState;
}

function setAnswer(questionNo: string, value: string) {
  const answerItem = getLectureTestAnswerItem();
  if (answerItem === undefined) {
    return;
  }
  const nextAnswers = answerItem.answers.map(answer => {
    if (questionNo === answer.questionNo) {
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

const TestQuestionView: React.FC<TestQuestionViewProps> = function TestQuestionView({
  question,
  answer,
  answerResult,
  submitted,
  readOnly,
  learningState,
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
    question.questionType === 'MultiChoice'
  ) {
    if (submitted) {
      if (answerResult) {
        questionClassName += ' correct ';
      } else {
        questionClassName += ' wrong ';
      }
    }
    if (
      question.questionImgSrc !== undefined &&
      question.questionImgSrc !== ''
    ) {
      questionClassName += ' survey-radio-img ';
    }
  }
  useEffect(() => {
    if (
      question.questionType === 'SingleChoice' ||
      question.questionType === 'MultiChoice'
    ) {
      if (submitted) {
        if (answerResult) {
          questionClassName += ' correct ';
        } else {
          questionClassName += ' wrong ';
          if (learningState === 'Failed') {
            setAnswer(question.questionNo, '');  // 미이수 로딩시 틀린답안 표시 안함
          }
        }
      }
    }
  }, [submitted,learningState]);  // 배열에는 변경을 감지할 항목(제출 후 미이수시)
  return (
    <>
      <div key={question.id} className={questionClassName}>
        <p>
          <span>{question.questionNo}</span>
          {(question.questionImgSrc && (
            <p>
              <span className="copy" dangerouslySetInnerHTML={{__html:`${question.direction} (${question.allocatedPoint}점)`}}/>
            </p>
          )) || (
            <>
              <span className="copy" dangerouslySetInnerHTML={{__html:`${question.direction} (${question.allocatedPoint}점)`}}/>
            </>
          )}
        </p>
        {question.questionImgSrc !== undefined &&
          question.questionImgSrc !== '' && (
            <img src={question.questionImgSrc} />
          )}
        {question.questionType === 'SingleChoice' && (
          <TestSingleChoiceView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
            readOnly={readOnly}
          />
        )}
        {question.questionType === 'MultiChoice' && (
          <TestMultiChoiceView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
            readOnly={readOnly}
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
          />
        )}
      </div>
    </>
  );
};

export default TestQuestionView;

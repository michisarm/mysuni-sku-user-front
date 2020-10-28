import React from 'react';
import TestSingleChoiceView from './TestSingleChoiceView';
import TestMultiChoiceView from './TestMultiChoiceView';
import TestShortAnswerView from './TestShortAnswerView';
import TestEssayView from './TestEssayView';
import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import {
  getLectureTestAnswerItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';

interface TestQuestionViewProps {
  question: ExamQuestion;
  answer?: string;
  answerResult?: boolean;
  submitted?: boolean;
  readOnly: boolean;
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
}) {
  let questionClassName = ' course-radio-survey ';
  if (
    question.questionType === 'ShortAnswer' ||
    question.questionType === 'Essay'
  ) {
    questionClassName += ' survey-text ';
  }
  if (
    submitted &&
    (question.questionType === 'SingleChoice' ||
      question.questionType === 'MultiChoice')
  ) {
    if (answerResult) {
      questionClassName += ' correct ';
    } else {
      questionClassName += ' wrong ';
    }
  }
  return (
    <>
      <div key={question.id} className={questionClassName}>
        <p>
          <span>{question.questionNo}</span>
          {question.direction} ({question.allocatedPoint}
          점)
        </p>
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

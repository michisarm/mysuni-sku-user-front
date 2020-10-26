import { QuestionType } from 'assistant/paper/model/QuestionType';
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
}

function setAnswer(questionNo: string, value: string) {
  const answerItem = getLectureTestAnswerItem();
  const nextAnswer = answerItem.answers.map(answer => {
    if (questionNo === answer.questionNo) {
      return { ...answer, answer: value };
    }
    return answer;
  });
  const nextAnswerItem = { ...answerItem, answer: nextAnswer };
  setLectureTestAnswerItem(nextAnswerItem);
}

const TestQuestionView: React.FC<TestQuestionViewProps> = function TestQuestionView({
  question,
  answer,
}) {
  return (
    <>
      <div key={question.id} className="course-radio-survey">
        <p>
          <span>{question.questionNo}</span>
          {question.direction} ({question.allocatedPoint}
          점)
        </p>
        {question.questionType === QuestionType.SingleChoice && (
          <TestSingleChoiceView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
          />
        )}
        {question.questionType === QuestionType.MultiChoice && (
          <TestMultiChoiceView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
          />
        )}
        {question.questionType === QuestionType.ShortAnswer && (
          <TestShortAnswerView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
          />
        )}
        {question.questionType === QuestionType.Essay && (
          <TestEssayView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
          />
        )}
      </div>
    </>
  );
};

export default TestQuestionView;

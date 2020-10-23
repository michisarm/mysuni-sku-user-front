import { QuestionType } from 'assistant/paper/model/QuestionType';
import React from 'react';
import TestSingleChoiceView from './TestSingleChoiceView';
import TestMultiChoiceView from './TestMultiChoiceView';
import ExamQuestion from 'lecture/detail/model/ExamQuestion';

interface TestQuestionViewProps {
  question: ExamQuestion;
  answer?: string;
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
          <TestSingleChoiceView question={question} answer={answer} />
        )}
        {question.questionType === QuestionType.MultiChoice && (
          <TestMultiChoiceView question={question} answer={answer} />
        )}
        {question.questionType === QuestionType.ShortAnswer && (
          <>
            {/*<ShortAnswerView />*/}
            ShortAnswerView
          </>
        )}
        {question.questionType === QuestionType.Essay && (
          <>
            {/*<EssayView />*/}
            EssayView
          </>
        )}
      </div>
    </>
  );
};

export default TestQuestionView;

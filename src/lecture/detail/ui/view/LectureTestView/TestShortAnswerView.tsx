import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import React from 'react';
import { Form, Icon } from 'semantic-ui-react';

interface TestSingleChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
  setAnswer: (questionNo: string, value: string) => void;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> = function TestSingleChoiceView({
  question,
  answer,
  setAnswer,
}) {
  return (
    <Form>
      <Form.Field>
        <div className="ui right-top-count input">
          <span className="count">
            <span className="now">{answer!.length}</span>/
            <span className="max">100</span>
          </span>
          <input
            type="text"
            placeholder="답변을 입력해주세요. (최대 100자 입력 가능)"
            value={answer}
            onChange={(data: any) => setAnswer(question.questionNo, data.value)}
          />
          <Icon className="clear link" />
          <span className="validation">
            You can enter up to 100 characters.
          </span>
        </div>
      </Form.Field>
    </Form>
  );
};

export default TestSingleChoiceView;

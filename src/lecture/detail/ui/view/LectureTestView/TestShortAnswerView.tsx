import ExamQuestion from '../../../model/ExamQuestion';
import React from 'react';
import { Form, Icon } from 'semantic-ui-react';

interface TestSingleChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
  setAnswer: (questionNo: number, value: string) => void;
  readOnly: boolean;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> = function TestSingleChoiceView({
  question,
  answer,
  setAnswer,
  readOnly,
}) {
  const maxLength = 100;

  return (
    <Form>
      <Form.Field>
        <div className="ui right-top-count input">
          <span className="count">
            <span className="now">
              {answer && answer.length}
              {!answer && '0'}
            </span>
            /<span className="max">{maxLength}</span>
          </span>
          <input
            type="text"
            placeholder={
              '답변을 입력해주세요. (최대 ' + maxLength + '자 입력 가능)'
            }
            value={answer}
            onChange={(e: any) => {
              if (e.target.value.length <= maxLength) {
                setAnswer(question.sequence, e.target.value);
              }
            }}
            readOnly={readOnly}
          />
          <Icon className="clear link" />
          <span className="validation">
            You can enter up to {maxLength} characters.
          </span>
        </div>
      </Form.Field>
    </Form>
  );
};

export default TestSingleChoiceView;

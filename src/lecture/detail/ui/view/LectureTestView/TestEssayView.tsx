import React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import ExamQuestion from '../../../model/ExamQuestion';

interface TestSingleChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
  obtainedScore: number;
  setAnswer: (questionNo: number, value: string) => void;
  readOnly: boolean;
  showScore?: boolean;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> =
  function TestSingleChoiceView({
    question,
    answer,
    obtainedScore,
    setAnswer,
    readOnly,
    showScore,
  }) {
    const maxLength = 1000;

    return (
      <Form>
        <Form.Field>
          <div className="ui right-top-count input">
            {(showScore && (
              <span className="count count2">
                <span className="score">평가점수</span>
                <span className="score_value">{obtainedScore}</span>
              </span>
            )) || (
              <span className="count">
                <span className="now">
                  {answer && answer.length}
                  {!answer && '0'}
                </span>
                /<span className="max">{maxLength}</span>
              </span>
            )}
            <textarea
              placeholder="답변을 입력해주세요."
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

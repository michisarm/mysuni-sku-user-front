import ExamQuestion from '../../../model/ExamQuestion';
import React, { useCallback } from 'react';
import { Checkbox } from 'semantic-ui-react';

interface TestMultiChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
  setAnswer: (questionNo: number, value: string) => void;
  readOnly: boolean;
  setSubmitOk: (submitOk: boolean) => void;
}

const TestMultiChoiceView: React.FC<TestMultiChoiceViewProps> = function TestMultiChoiceView({
  question,
  answer,
  setAnswer,
  readOnly,
  setSubmitOk,
}) {
  const setAnswerFromCheckbox = useCallback(
    (e: any, data: any) => {
      const answers = (answer && answer.length && answer.split(',')) || [];
      const value = data.value;
      let newAnswers = [];
      let newAnswer = '';
      if (answers.includes(value)) {
        newAnswers = answers.filter(ans => ans !== value);
      } else {
        newAnswers = answers.concat([value]);
      }
      newAnswers
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(ans => {
          if (newAnswer) newAnswer += `,${ans}`;
          else newAnswer = ans;
        });
      setAnswer(question.sequence, newAnswer);
    },
    [answer] // answer 변경시 useCallback 내부의 answer 데이터도 변경
  );

  return (
    <div className="course-survey-list">
      {question.items.map(item => (
        <>
          <Checkbox
            key={question.sequence + '_' + item.itemNo}
            className="base"
            label={item.itemText}
            name={`test_${question.sequence}`}
            value={item.itemNo}
            checked={answer?.includes(item.itemNo)}
            onChange={setAnswerFromCheckbox}
            readOnly={readOnly}
            onClick={() => setSubmitOk(false)}
          />
          {item.imgSrc !== undefined && item.imgSrc !== '' && (
            <img src={item.imgSrc} />
          )}
        </>
      ))}
    </div>
  );
};

export default TestMultiChoiceView;

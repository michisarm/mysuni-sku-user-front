import ExamQuestion from '../../../model/ExamQuestion';
import React, { useCallback } from 'react';
import { Radio } from 'semantic-ui-react';

interface TestSingleChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
  setAnswer: (questionNo: number, value: string) => void;
  readOnly: boolean;
  setSubmitOk: (submitOk: boolean) => void;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> = function TestSingleChoiceView({
  question,
  answer,
  setAnswer,
  readOnly,
  setSubmitOk,
}) {
  const setAnswerFromRadio = useCallback((e: any, data: any) => {
    setAnswer(question.sequence, data.value);
  }, []);

  return (
    <div className="course-survey-list">
      {question.items?.map(item => (
        <>
          <Radio
            key={question.sequence + '_' + item.itemNo}
            className="base"
            label={
              (readOnly && item.itemNo + '. ' + item.itemText) || item.itemText
            }
            name={`test_${question.sequence}`}
            value={item.itemNo}
            checked={item.itemNo === answer}
            onChange={setAnswerFromRadio}
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

export default TestSingleChoiceView;

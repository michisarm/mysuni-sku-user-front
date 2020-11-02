import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import React, { useCallback } from 'react';
import { Radio } from 'semantic-ui-react';

interface TestSingleChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
  setAnswer: (questionNo: string, value: string) => void;
  readOnly: boolean;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> = function TestSingleChoiceView({
  question,
  answer,
  setAnswer,
  readOnly,
}) {
  const setAnswerFromRadio = useCallback((e: any, data: any) => {
    setAnswer(question.questionNo, data.value);
  }, []);

  return (
    <div className="course-survey-list">
      {question.items.map(item => (
        <div className="radio-survey-list">
          <Radio
            key={question.questionNo + '_' + item.itemNo}
            className="base"
            label={item.itemText}
            name={`test_${question.questionNo}`}
            value={item.itemNo}
            checked={item.itemNo === answer}
            onChange={setAnswerFromRadio}
            readOnly={readOnly}
          />
          {item.imgSrc !== 'undefined' && item.imgSrc !== '' && (
            <img src={item.imgSrc} />
          )}
        </div>
      ))}
    </div>
  );
};

export default TestSingleChoiceView;

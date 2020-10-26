import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import React from 'react';
import { Checkbox } from 'semantic-ui-react';

interface TestMultiChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
}

const TestMultiChoiceView: React.FC<TestMultiChoiceViewProps> = function TestMultiChoiceView({
  question,
  answer,
}) {
  return (
    <div className="course-survey-list">
      {question.items.map(item => (
        <Checkbox
          key={question.questionNo + '_' + item.itemNo}
          className="base"
          label={item.itemText}
          name={`test_${question.questionNo}`}
          value={item.itemNo}
          checked={answer?.includes(item.itemNo)}
        />
      ))}
    </div>
  );
};

export default TestMultiChoiceView;

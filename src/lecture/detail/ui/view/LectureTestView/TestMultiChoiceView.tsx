import { ExamQuestionModel } from 'assistant/paper/model/ExamQuestionModel';
import React from 'react';
import { Checkbox, Radio } from 'semantic-ui-react';

interface TestMultiChoiceViewProps {
  question: ExamQuestionModel;
}

const TestMultiChoiceView: React.FC<TestMultiChoiceViewProps> = function TestMultiChoiceView({
  question,
}) {
    
  return (
    <div className="course-survey-list">
      {question.items.map((item,idx) => (
        <Checkbox
          key={idx}
          className="base"
          label={item.itemText}
          name="radioGroup"
          value={item.itemNo}
        />
      ))}
    </div>
  );
}

export default TestMultiChoiceView;

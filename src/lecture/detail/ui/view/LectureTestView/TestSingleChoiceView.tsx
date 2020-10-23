import { ExamQuestionModel } from 'assistant/paper/model/ExamQuestionModel';
import React from 'react';
import { Radio } from 'semantic-ui-react';

interface TestSingleChoiceViewProps {
  question: ExamQuestionModel;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> = function TestSingleChoiceView({
  question,
}) {
    
  return (
    <div className="course-survey-list">
      {question.items.map((item,idx) => (
        <Radio
          key={idx}
          className="base"
          label={item.itemText}
          name={`test_${question.questionNo}`}
          value={item.itemNo}
          /*checked={this.state.value === "value01"*/
          /*onChange={this.handleChange*/
        />
      ))}
    </div>
  );
}

export default TestSingleChoiceView;

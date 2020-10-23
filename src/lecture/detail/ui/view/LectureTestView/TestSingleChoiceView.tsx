import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import React from 'react';
import { Radio } from 'semantic-ui-react';

interface TestSingleChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> = function TestSingleChoiceView({
  question,
  answer,
}) {
  return (
    <div className="course-survey-list">
      {question.items.map(item => (
        <Radio
          key={question.questionNo + '_' + item.itemNo}
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
};

export default TestSingleChoiceView;

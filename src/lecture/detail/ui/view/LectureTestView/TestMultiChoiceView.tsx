import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import React, { useCallback } from 'react';
import { Checkbox } from 'semantic-ui-react';

interface TestMultiChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
  setAnswer: (questionNo: string, value: string) => void;
}

const TestMultiChoiceView: React.FC<TestMultiChoiceViewProps> = function TestMultiChoiceView({
  question,
  answer,
  setAnswer,
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
      newAnswers.map(ans => {
        if (newAnswer) newAnswer += `,${ans}`;
        else newAnswer = ans;
      });
      setAnswer(question.questionNo, newAnswer);
    },
    [answer] // answer 변경시 useCallback 내부의 answer 데이터도 변경
  );

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
          onChange={setAnswerFromCheckbox}
        />
      ))}
    </div>
  );
};

export default TestMultiChoiceView;

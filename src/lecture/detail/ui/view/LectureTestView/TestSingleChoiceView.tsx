import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import { getLectureTestAnswerItem } from 'lecture/detail/store/LectureTestStore';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { Radio } from 'semantic-ui-react';

function getAnswer(questionNo: string) {
  const answerItem = getLectureTestAnswerItem();
  let value: string = '';

  if (answerItem) {
    answerItem.answers.map(answer => {
      if (questionNo === answer.questionNo) {
        value = answer.answer;
      }
    });
  }
  console.log('getAnswer', value);
  return value;
}

interface TestSingleChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
  setAnswer: (questionNo: string, value: string) => void;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> = function TestSingleChoiceView({
  question,
  answer,
  setAnswer,
}) {
  //const [test, setTest] = useState<string>();
  const setAnswerFromRadio = useCallback((e: any, data: any) => {
    //setTest(data.value)
    setAnswer(question.questionNo, data.value);
  }, []);

  return (
    <div className="course-survey-list">
      {question.items.map(item => (
        <Radio
          key={question.questionNo + '_' + item.itemNo}
          className="base"
          label={item.itemText}
          name={`test_${question.questionNo}`}
          value={item.itemNo}
          //checked={item.itemNo === test}
          checked={item.itemNo === answer}
          onChange={setAnswerFromRadio}
        />
      ))}
    </div>
  );
};

export default TestSingleChoiceView;

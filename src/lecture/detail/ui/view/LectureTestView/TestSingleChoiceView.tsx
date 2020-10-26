import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import {
  getLectureTestAnswerItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';
import React from 'react';
import { Radio } from 'semantic-ui-react';

function setAnswer(questionNo: string, value: string) {
  const answerItem = getLectureTestAnswerItem();
  answerItem.answers.map(answer => {
    if (questionNo === answer.questionNo) {
      answer.answer = value;
    }
  });
  setLectureTestAnswerItem(answerItem);
}

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
  return value;
}

interface TestSingleChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> = function TestSingleChoiceView({
  question,
  answer,
}) {
  console.log('render', answer);
  return (
    <div className="course-survey-list">
      {question.items.map(item => (
        <Radio
          key={question.questionNo + '_' + item.itemNo}
          className="base"
          label={item.itemText}
          name={`test_${question.questionNo}`}
          value={item.itemNo} //value가 안 됨
          checked={item.itemNo === answer}
          onChange={(e: any, data: any) =>
            setAnswer(question.questionNo, data.value)
          }
        />
      ))}
    </div>
  );
};

export default TestSingleChoiceView;

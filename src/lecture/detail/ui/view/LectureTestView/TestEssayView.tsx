import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import {
  getLectureTestAnswerItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';
import React from 'react';
import { Form, Icon, Radio } from 'semantic-ui-react';

function setAnswer(questionNo: string, value: string) {
  const answerItem = getLectureTestAnswerItem();
  answerItem.answers.map(answer => {
    if (questionNo === answer.questionNo) {
      answer.answer = value;
    }
  });
  setLectureTestAnswerItem(answerItem);
}

interface TestSingleChoiceViewProps {
  question: ExamQuestion;
  answer?: string;
}

const TestSingleChoiceView: React.FC<TestSingleChoiceViewProps> = function TestSingleChoiceView({
  question,
  answer,
}) {
  return (
    <Form>
      <Form.Field>
        <div className="ui right-top-count input">
          <span className="count">
            <span className="now">{answer!.length}</span>/
            <span className="max">1000</span>
          </span>
          <textarea placeholder="답변을 입력해주세요." value={answer} />
          <Icon className="clear link" />
          <span className="validation">
            You can enter up to 100 characters.
          </span>
        </div>
      </Form.Field>
    </Form>
  );
};

export default TestSingleChoiceView;

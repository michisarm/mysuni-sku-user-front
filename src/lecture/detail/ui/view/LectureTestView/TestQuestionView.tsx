import React, { useEffect } from 'react';
import TestSingleChoiceView from './TestSingleChoiceView';
import TestMultiChoiceView from './TestMultiChoiceView';
import TestShortAnswerView from './TestShortAnswerView';
import TestEssayView from './TestEssayView';
import ExamQuestion from 'lecture/detail/model/ExamQuestion';
import {
  getLectureTestAnswerItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';
import LearningState from 'lecture/detail/model/LearningState';
import { EssayScore } from 'lecture/detail/model/GradeSheet';
import LectureParams from '../../../viewModel/LectureParams';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';

interface TestQuestionViewProps {
  question: ExamQuestion;
  answer?: string;
  answerResult?: boolean;
  submitted?: boolean;
  readOnly: boolean;
  learningState?: LearningState;
  submitOk: boolean;
  setSubmitOk: (submitOk: boolean) => void;
  dataLoadTime?: Number;
  essayScore?: EssayScore;
  params: LectureParams;
}

function setAnswer(questionNo: string, value: string) {
  const answerItem = getLectureTestAnswerItem();
  if (answerItem === undefined) {
    return;
  }
  const nextAnswers = answerItem.answers.map(answer => {
    if (questionNo === answer.questionNo) {
      return { ...answer, answer: value };
    }
    return answer;
  });
  //if (!nextAnswers.some(answer => answer.questionNo === questionNo)) {
  //  nextAnswers.push({ questionNo, answer: value });
  //}
  const nextAnswerItem = { ...answerItem, answers: nextAnswers };
  setLectureTestAnswerItem(nextAnswerItem);
}

const TestQuestionView: React.FC<TestQuestionViewProps> = function TestQuestionView({
  question,
  answer,
  answerResult,
  submitted,
  readOnly,
  learningState,
  submitOk,
  setSubmitOk,
  dataLoadTime,
  essayScore,
  params,
}) {
  let questionClassName = ' course-radio-survey ';
  if (
    question.questionType === 'ShortAnswer' ||
    question.questionType === 'Essay'
  ) {
    questionClassName += ' survey-radio-img ';
  }
  if (
    question.questionType === 'SingleChoice' ||
    question.questionType === 'MultiChoice' ||
    question.questionType === 'ShortAnswer'
  ) {
    if (submitted) {
      const lectureStructureItem = getActiveStructureItem(params.pathname);
      if (
        lectureStructureItem?.student?.extraWork.testStatus === 'FAIL' ||
        lectureStructureItem?.student?.extraWork.testStatus === 'SUBMIT' ||
        lectureStructureItem?.student?.extraWork.testStatus === 'PASS'
      ) {
        // 답안을 전송했을 경우 채점
        if (answerResult) {
          questionClassName += ' correct ';
        } else {
          questionClassName += ' wrong ';
        }
      }
    }
    if (
      question.questionImgSrc !== undefined &&
      question.questionImgSrc !== ''
    ) {
      questionClassName += ' survey-radio-img ';
    }
  }
  useEffect(() => {
    if (
      question.questionType === 'SingleChoice' ||
      question.questionType === 'MultiChoice' ||
      question.questionType === 'ShortAnswer'
    ) {
      if (submitOk && submitted) {
        if (!answerResult) {
          const lectureStructureItem = getActiveStructureItem(params.pathname);
          if (
            lectureStructureItem?.student?.extraWork.testStatus === 'FAIL' ||
            lectureStructureItem?.student?.extraWork.testStatus === 'SUBMIT'
          ) {
            setAnswer(question.questionNo, ''); // 미이수 로딩시 틀린답안 표시 안함
          }
        }
      }
    }
  }, [
    params.pathname,
    question.questionNo,
    submitted,
    learningState,
    submitOk,
    dataLoadTime,
  ]); // 배열에는 변경을 감지할 항목(제출 후 미이수시)

  const lectureStructureItem = getActiveStructureItem(params.pathname);

  const showScore =
    lectureStructureItem &&
    (lectureStructureItem.student?.extraWork.testStatus === 'PASS' ||
      lectureStructureItem.student?.extraWork.testStatus === 'FAIL' ||
      lectureStructureItem.student?.extraWork.testStatus === 'SUBMIT')
      ? true
      : false;

  return (
    <>
      <div key={question.id} className={questionClassName}>
        <p>
          <span>{question.questionNo}</span>
          {(question.questionImgSrc && (
            <p>
              <span
                className="copy"
                dangerouslySetInnerHTML={{
                  __html: `${question.direction} (${question.allocatedPoint}점)`,
                }}
              />
            </p>
          )) || (
            <>
              <span
                className="copy"
                dangerouslySetInnerHTML={{
                  __html: `${question.direction} (${question.allocatedPoint}점)`,
                }}
              />
            </>
          )}
        </p>
        {question.questionImgSrc !== undefined &&
          question.questionImgSrc !== '' && (
            <img src={question.questionImgSrc} />
          )}
        {question.questionType === 'SingleChoice' && (
          <TestSingleChoiceView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
            readOnly={readOnly}
            setSubmitOk={setSubmitOk}
          />
        )}
        {question.questionType === 'MultiChoice' && (
          <TestMultiChoiceView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
            readOnly={readOnly}
            setSubmitOk={setSubmitOk}
          />
        )}
        {question.questionType === 'ShortAnswer' && (
          <TestShortAnswerView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
            readOnly={readOnly}
          />
        )}
        {question.questionType === 'Essay' && (
          <TestEssayView
            question={question}
            answer={answer}
            setAnswer={setAnswer}
            readOnly={readOnly}
            essayScore={essayScore}
            showScore={showScore}
          />
        )}
      </div>
    </>
  );
};

export default TestQuestionView;

import React, { useState } from 'react';
import {
  LectureTestAnswerItem,
  LectureTestItem,
  LectureTestStudentItem,
} from '../../../viewModel/LectureTest';
import TestQuestionView from './TestQuestionView';
import { EssayScore } from 'lecture/detail/model/GradeSheet';
import { GraderCommentView } from './GraderCommentView';
import LectureParams from '../../../viewModel/LectureParams';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';

interface LectureTestPaperQuestionViewProps {
  testItem: LectureTestItem;
  testStudentItem: LectureTestStudentItem;
  answerItem?: LectureTestAnswerItem;
  modalGbn?: boolean;
  params: LectureParams;
}

const LectureTestPaperQuestionView: React.FC<LectureTestPaperQuestionViewProps> =
  function LectureTestPaperQuestionView({
    testItem,
    testStudentItem,
    answerItem,
    modalGbn,
    params,
  }) {
    const lectureStructureItem = getActiveStructureItem(params.pathname);
    let readOnly = false;
    if (
      lectureStructureItem &&
      (lectureStructureItem.student?.extraWork.testStatus === 'SUBMIT' ||
        lectureStructureItem.student?.extraWork.testStatus === 'PASS')
    ) {
      readOnly = true;
    }

    const [submitOk, setSubmitOk] = useState<boolean>(true); // 제출 버튼 클릭시(제출시 틀린 답은 노출 안하게 하는 용도)

    let testClassName = ' ui segment full ';
    if (
      lectureStructureItem &&
      (lectureStructureItem.student?.extraWork.testStatus === 'SUBMIT' ||
        lectureStructureItem.student?.extraWork.testStatus === 'PASS' ||
        lectureStructureItem.student?.extraWork.testStatus === 'FAIL')
    ) {
      testClassName += ' test-complete ';
    }

    return (
      <>
        {testItem && (
          <>
            {testItem.questions &&
              testItem.questions.map((question, index) => {
                let answer: string = '';
                let answerResult: boolean = false;
                let obtainedScore: number = 0;
                if (answerItem !== undefined) {
                  answerItem.answers.forEach((result) => {
                    if (result.sequence === question.sequence) {
                      answer = result.answer;
                      obtainedScore = result.obtainedScore || 0;
                    }
                  });

                  if (
                    lectureStructureItem &&
                    (lectureStructureItem.student?.extraWork.testStatus ===
                      'SUBMIT' ||
                      lectureStructureItem.student?.extraWork.testStatus ===
                        'PASS' ||
                      lectureStructureItem.student?.extraWork.testStatus ===
                        'FAIL')
                  ) {
                    let submitAnswer = '';
                    answerItem.answers.forEach((result) => {
                      if (result.sequence === question.sequence) {
                        submitAnswer = result.answer;
                      }
                    });
                    if (question.questionAnswer !== null) {
                      if (question.questionType === 'SingleChoice') {
                        if (question.questionAnswer?.answer === submitAnswer) {
                          answerResult = true;
                        }
                      }
                      if (question.questionType === 'MultiChoice') {
                        let answerChkArr = [];

                        // 문제지 정답
                        answerChkArr =
                          question.questionAnswer?.answer.split(',');
                        // 사용자 정답
                        const answerMultiJson = submitAnswer.split(',');
                        let checkCnt = 0;

                        // 자릿수 비교
                        if (answerChkArr.length === answerMultiJson.length) {
                          // 정답지
                          for (let i = 0; i < answerChkArr.length; i++) {
                            // 사용자문제지
                            for (let j = 0; j < answerMultiJson.length; j++) {
                              // 정답지 사용자 문제지 체크
                              if (answerChkArr[i] === answerMultiJson[j]) {
                                checkCnt++;
                              }
                            }
                          }
                        }

                        // 정답지와 사용자 정답 갯수 체크
                        if (answerChkArr.length === checkCnt) {
                          answerResult = true;
                        }
                      }
                      if (question.questionType === 'ShortAnswer') {
                        const shortAnswers =
                          question.questionAnswer &&
                          question.questionAnswer.answer.split(',');
                        if (
                          shortAnswers != null &&
                          shortAnswers.length > 0 &&
                          shortAnswers[0] !== 'undefined' &&
                          submitAnswer
                        ) {
                          for (let j = 0; j < shortAnswers.length; j++) {
                            // 정답지 사용자 문제지 체크
                            if (
                              submitAnswer.trim().toLowerCase() ===
                              shortAnswers[j].trim().toLowerCase()
                            ) {
                              answerResult = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }

                return (
                  <TestQuestionView
                    key={'question_' + question.sequence}
                    indexNo={index}
                    question={question}
                    answer={answer}
                    obtainedScore={obtainedScore}
                    answerResult={answerResult}
                    readOnly={readOnly}
                    learningState={testStudentItem?.learningState}
                    submitOk={submitOk}
                    setSubmitOk={setSubmitOk}
                    dataLoadTime={answerItem?.dataLoadTime}
                    params={params}
                    modalGbn={modalGbn}
                  />
                );
              })}
            {lectureStructureItem?.student?.extraWork.testStatus === 'PASS' &&
              answerItem?.graderComment && (
                <GraderCommentView graderComment={answerItem.graderComment} />
              )}
          </>
        )}
      </>
    );
  };

export default LectureTestPaperQuestionView;

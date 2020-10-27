import { reactConfirm } from '@nara.platform/accent';
import { useLectureTestStudent } from 'lecture/detail/service/useLectureTest/useLectureTestStudent';
import { useLectureTestAnswer } from 'lecture/detail/service/useLectureTest/useLectureTestAnswer';
import { saveTestAnswerSheet } from 'lecture/detail/service/useLectureTest/utility/saveCubeLectureTest';
import { setLectureTestAnswerItem } from 'lecture/detail/store/LectureTestStore';
import React, { useCallback } from 'react';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import TestQuestionView from './TestQuestionView';

interface LectureTestViewProps {
  testItem: LectureTestItem;
  lectureId: string;
}

const LectureTestView: React.FC<LectureTestViewProps> = function LectureTestView({
  testItem,
  lectureId,
}) {
  const [testStudentItem] = useLectureTestStudent();
  const [answerItem] = useLectureTestAnswer();

  let readOnly = false;
  if (
    testStudentItem &&
    testStudentItem.learningState &&
    (testStudentItem.learningState === 'TestWaiting' ||
      testStudentItem.learningState === 'Passed' ||
      testStudentItem.learningState === 'TestPassed')
  ) {
    readOnly = true;
  }

  const saveAnswerSheet = useCallback(() => {
    let answerItemId = '';
    if (answerItem !== undefined) {
      answerItemId = answerItem.id;
    }

    saveTestAnswerSheet(lectureId, answerItemId, false, false);
  }, [answerItem]);
  const submitAnswerSheet = useCallback(() => {
    let answerItemId = '';
    if (answerItem !== undefined) {
      answerItemId = answerItem.id;
    }

    if (answerItem!.answers.some(element => element.answer === '')) {
      alert('빈 답안을 작성해주세요!');
    } else {
      reactConfirm({
        title: '알림',
        message: 'Test를 최종 제출 하시겠습니까?',
        onOk: () => {
          if (answerItem) {
            const nextAnswerItem = {
              ...answerItem,
              submitAnswers: answerItem.answers,
            };
            setLectureTestAnswerItem(nextAnswerItem);
            saveTestAnswerSheet(lectureId, answerItemId, true, true);
          }
        },
      });
    }
  }, [answerItem]);

  let testClassName = ' ui segment full ';
  if (answerItem?.submitted) {
    testClassName += ' test-complete ';
  }
  return (
    <>
      <div className="course-info-detail responsive-course">
        <div className="course-detail-center">
          <div className="main-wrap">
            <div className="scrolling-area area2 ">
              <div className={testClassName}>
                {testItem && (
                  <>
                    <div className="course-info-header">
                      <div className="survey-header">
                        <div className="survey-header-left">
                          {testItem.name}
                        </div>
                        <div className="survey-header-right">
                          {testStudentItem &&
                            testStudentItem.learningState &&
                            (testStudentItem.learningState === 'Failed' ||
                              testStudentItem.learningState === 'Missed') && (
                              <button className="ui button free submit p18">
                                재응시
                              </button>
                            )}
                          {testStudentItem &&
                            testStudentItem.learningState &&
                            testStudentItem.learningState === 'TestWaiting' && (
                              <button className="ui button free proceeding p18">
                                검수중
                              </button>
                            )}
                          {testStudentItem &&
                            testStudentItem.learningState &&
                            (testStudentItem.learningState === 'Passed' ||
                              testStudentItem.learningState ===
                                'TestPassed') && (
                              <button className="ui button free complete p18">
                                이수
                              </button>
                            )}
                        </div>
                        <div className="test-text">
                          <div className="test-text-box">
                            <span>합격점</span>
                            <span>{testItem.successPoint}점</span>
                          </div>
                          <div className="test-text-box">
                            <span>총점</span>
                            <span>{testItem.totalPoint}점</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {testItem &&
                      testItem.questions &&
                      testItem.questions.map(question => {
                        let answer: string = '';
                        let answerResult: boolean = false;
                        if (answerItem !== undefined) {
                          answerItem.answers.forEach(result => {
                            if (result.questionNo === question.questionNo) {
                              answer = result.answer;
                            }
                          });

                          if (answerItem.submitted) {
                            let submitAnswer = '';
                            answerItem.submitAnswers.forEach(result => {
                              if (result.questionNo === question.questionNo) {
                                submitAnswer = result.answer;
                              }
                            });
                            if (question.questionType === 'SingleChoice') {
                              if (question.answer === submitAnswer) {
                                answerResult = true;
                              }
                            }
                            if (question.questionType === 'MultiChoice') {
                              let answerChkArr = [];

                              // 문제지 정답
                              answerChkArr = JSON.parse(question.answer);
                              // 사용자 정답
                              const answerMultiJson = submitAnswer.split(',');
                              let checkCnt = 0;

                              // 자릿수 비교
                              if (
                                answerChkArr.length === answerMultiJson.length
                              ) {
                                // 정답지
                                for (let i = 0; i < answerChkArr.length; i++) {
                                  // 사용자문제지
                                  for (
                                    let j = 0;
                                    j < answerMultiJson.length;
                                    j++
                                  ) {
                                    // 정답지 사용자 문제지 체크
                                    if (
                                      answerChkArr[i] === answerMultiJson[j]
                                    ) {
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
                          }
                        }

                        return (
                          <TestQuestionView
                            key={'question_' + question.questionNo}
                            question={question}
                            submitted={answerItem?.submitted}
                            answer={answer}
                            answerResult={answerResult}
                            readOnly={readOnly}
                          />
                        );
                      })}
                    {!readOnly && (
                      <div className="survey-preview">
                        <p>
                          <button
                            className="ui button fix line"
                            onClick={saveAnswerSheet}
                          >
                            저장
                          </button>
                          <button
                            className="ui button fix bg"
                            onClick={submitAnswerSheet}
                          >
                            제출
                          </button>
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LectureTestView;

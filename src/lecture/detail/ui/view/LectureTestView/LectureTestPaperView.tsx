import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { useLectureTestAnswer } from 'lecture/detail/service/useLectureTest/useLectureTestAnswer';
import { saveTestAnswerSheet } from 'lecture/detail/service/useLectureTest/utility/saveCubeLectureTest';
import {
  getLectureTestStudentItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';
import React, { useCallback, useEffect, useState } from 'react';
import {
  LectureTestAnswerItem,
  LectureTestItem,
  LectureTestStudentItem,
} from '../../../viewModel/LectureTest';
import TestQuestionView from './TestQuestionView';
import { saveCourseTestAnswerSheet } from 'lecture/detail/service/useLectureTest/utility/saveCourseLectureTest';
import LectureRouterParams from '../../../viewModel/LectureRouterParams';
import {
  getActiveCourseStructureItem,
  getActiveProgramStructureItem,
  getActiveStructureItem,
} from '../../../service/useLectureStructure/useLectureStructure';
import { requestLectureStructure } from '../../logic/LectureStructureContainer';
import { EssayScore } from 'lecture/detail/model/GradeSheet';
import { GraderCommentView } from './GraderCommentView';
import { useHistory } from 'react-router-dom';
import LectureTestPaperQuestionView from './LectureTestPaperQuestionView';

interface LectureTestPaperViewProps {
  params: LectureRouterParams;
  testItem: LectureTestItem;
  testStudentItem: LectureTestStudentItem;
  answerItem?: LectureTestAnswerItem;
  openView: (view: string) => void;
  modalGbn?: boolean;
}

const LectureTestPaperView: React.FC<LectureTestPaperViewProps> = function LectureTestPaperView({
  params,
  testItem,
  testStudentItem,
  answerItem,
  openView,
  modalGbn,
}) {
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

    if (params.contentType === 'cube') {
      saveTestAnswerSheet(params, answerItemId, false, false);
    } else {
      saveCourseTestAnswerSheet(params, answerItemId, false, false);
    }
  }, [answerItem, params]);

  const [submitOk, setSubmitOk] = useState<boolean>(true); // 제출 버튼 클릭시(제출시 틀린 답은 노출 안하게 하는 용도)

  const history = useHistory();
  const goToPath = (path?: string) => {
    if (path !== undefined) {
      //const currentHistory = getCurrentHistory();
      //if (currentHistory === undefined) {
      //  return;
      //}
      //currentHistory.push(path);
      history.push(path);
    }
  };

  const submitAnswerSheet = useCallback(() => {
    let answerItemId = '';
    if (answerItem !== undefined) {
      answerItemId = answerItem.id;
    }

    if (answerItem!.answers.some(element => element.answer === '')) {
      reactAlert({
        title: '알림',
        message: '빈 항목을 입력하세요.',
      });
    } else {
      const lectureStructureItem = getActiveStructureItem();
      if (lectureStructureItem?.canSubmit !== true) {
        reactAlert({
          title: '알림',
          message: '학습 완료 후 Test 제출이 가능합니다.',
        });
        return;
      }

      reactConfirm({
        title: '알림',
        message: 'Test를 최종 제출 하시겠습니까?',
        onOk: async () => {
          if (answerItem) {
            const nextAnswerItem = {
              ...answerItem,
              submitAnswers: answerItem.answers,
            };
            setLectureTestAnswerItem(nextAnswerItem);
            if (params.contentType === 'cube') {
              await saveTestAnswerSheet(params, answerItemId, true, true);
            } else {
              await saveCourseTestAnswerSheet(params, answerItemId, true, true);
            }

            await requestLectureStructure(
              params.lectureParams,
              params.pathname
            );
            openView('result');
            /*const lectureTestStudentItem = getLectureTestStudentItem();
            const course = getActiveCourseStructureItem();
            const program = getActiveProgramStructureItem();
            switch (lectureTestStudentItem?.learningState) {
              case 'Waiting':
              case 'TestWaiting':
                if (
                  course?.survey !== undefined &&
                  course?.survey.state !== 'Completed'
                ) {
                  reactAlert({
                    title: '알림',
                    message:
                      '관리자가 채점중에 있습니다. 채점이 완료되면 메일로 결과를 확인하실 수 있습니다. Survey 참여도 부탁드립니다.',
                    onClose: () => goToPath(course?.survey?.path),
                  });
                } else if (
                  program?.survey !== undefined &&
                  program?.survey.state !== 'Completed'
                ) {
                  reactAlert({
                    title: '알림',
                    message:
                      '관리자가 채점중에 있습니다. 채점이 완료되면 메일로 결과를 확인하실 수 있습니다. Survey 참여도 부탁드립니다.',
                    onClose: () => goToPath(program?.survey?.path),
                  });
                } else {
                  reactAlert({
                    title: '알림',
                    message:
                      '관리자가 채점중에 있습니다. 채점이 완료되면 메일로 결과를 확인하실 수 있습니다.',
                  });
                }
                break;
              case 'Failed':
                reactAlert({
                  title: '알림',
                  message:
                    '합격기준에 미달하였습니다. 재응시해주시기 바랍니다.',
                });
                break;
              case 'Passed':
              case 'TestPassed':
                if (
                  course?.survey !== undefined &&
                  course?.survey.state !== 'Completed'
                ) {
                  reactAlert({
                    title: '안내',
                    message:
                      '과정이 이수완료되었습니다. 이수내역은 마이페이지 > 학습완료 메뉴에서 확인 가능하며, Survey 참여도 부탁드립니다.',
                    onClose: () => goToPath(course?.survey?.path),
                  });
                } else if (
                  program?.survey !== undefined &&
                  program?.survey.state !== 'Completed'
                ) {
                  reactAlert({
                    title: '안내',
                    message:
                      '과정이 이수완료되었습니다. 이수내역은 마이페이지 > 학습완료 메뉴에서 확인 가능하며, Survey 참여도 부탁드립니다.',
                    onClose: () => goToPath(program?.survey?.path),
                  });
                } else {
                  reactAlert({
                    title: '알림',
                    message:
                      '과정이 이수완료되었습니다. 이수내역은 마이페이지 > 학습완료 메뉴에서 확인 가능합니다.',
                  });
                }
                break;
              default:
                break;
            }*/
          }

          setSubmitOk(true);
        },
      });
    }
  }, [answerItem, params]);

  let testClassName = ' ui segment full ';
  if (answerItem?.submitted) {
    testClassName += ' test-complete ';
  }

  return (
    <>
      {testItem && (
        <>
          {modalGbn && (
            <>
              {/* 모달 팝업창 */}
              <div className="test-text ver2">
                <div className="test-text-box pop-sty">
                  <span>합격기준</span>
                  <span>
                    <strong>{testItem.successPoint}점</strong>
                  </span>
                </div>
                <div className="test-text-box pop-sty">
                  <span>총점</span>
                  <span>
                    <strong>{testItem.totalPoint}점</strong>
                  </span>
                </div>
                {testStudentItem &&
                  testStudentItem.studentScore &&
                  testStudentItem.studentScore.numberOfTrials > 0 && (
                    <div className="test-text-box pop-sty">
                      <span>내점수</span>
                      <span>
                        <strong>
                          {testStudentItem.studentScore.latestScore}점
                        </strong>
                      </span>
                    </div>
                  )}
              </div>
              <div className="course-info-detail responsive-course test-pop">
                <div className="course-detail-center">
                  <div className="main-wrap">
                    <div className=" test-complete">
                      <LectureTestPaperQuestionView
                        testItem={testItem}
                        testStudentItem={testStudentItem}
                        answerItem={answerItem}
                        modalGbn={modalGbn}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {!modalGbn && (
            <div className={testClassName}>
              <div className="course-info-header">
                <div className="survey-header">
                  <div className="survey-header-left">{testItem.name}</div>
                  <div className="survey-header-right">
                    {!testStudentItem ||
                      !testStudentItem.learningState ||
                      (testStudentItem.learningState !== 'Failed' &&
                        testStudentItem.learningState !== 'Missed' &&
                        testStudentItem.learningState !== 'TestWaiting' &&
                        testStudentItem.learningState !== 'Passed' &&
                        testStudentItem.learningState !== 'TestPassed')}
                    {testStudentItem &&
                      testStudentItem.learningState &&
                      (testStudentItem.learningState === 'Failed' ||
                        testStudentItem.learningState === 'Missed') && (
                        <button className="ui button free proceeding p18">
                          미이수
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
                        testStudentItem.learningState === 'TestPassed') && (
                        <button className="ui button free proceeding p18">
                          이수
                        </button>
                      )}
                  </div>
                  <div className="test-text">
                    <div className="test-text-box">
                      <span>합격기준</span>
                      <span>{testItem.successPoint}점</span>
                    </div>
                    <div className="test-text-box">
                      <span>총점</span>
                      <span>{testItem.totalPoint}점</span>
                    </div>
                    {testStudentItem &&
                      testStudentItem.studentScore &&
                      testStudentItem.studentScore.numberOfTrials > 0 && (
                        <div className="test-text-box">
                          <span>내점수</span>
                          <span>
                            {testStudentItem.studentScore.latestScore}점
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <LectureTestPaperQuestionView
                testItem={testItem}
                testStudentItem={testStudentItem}
                answerItem={answerItem}
                modalGbn={modalGbn}
              />
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
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LectureTestPaperView;

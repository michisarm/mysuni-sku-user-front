import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { useLectureTestAnswer } from 'lecture/detail/service/useLectureTest/useLectureTestAnswer';

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
import {
  saveCourseTestAnswerSheet,
  saveCubeTestAnswerSheet,
} from 'lecture/detail/service/useLectureTest/utility/saveLectureTest';

import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { EssayScore } from 'lecture/detail/model/GradeSheet';
import { GraderCommentView } from './GraderCommentView';
import { useHistory, useParams } from 'react-router-dom';
import LectureTestPaperQuestionView from './LectureTestPaperQuestionView';

import { requestCardLectureStructure } from '../../../service/useLectureStructure/utility/requestCardLectureStructure';
import LectureParams from '../../../viewModel/LectureParams';
import { saveTask, submitTask } from '../../../api/cardApi';

interface LectureTestPaperViewProps {
  params: LectureParams;
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
  const { cardId } = useParams<LectureParams>();

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

  const saveAnswerSheet = useCallback(async () => {
    let answerItemId = '';
    if (answerItem !== undefined) {
      answerItemId = answerItem.id;
    }

    if (params.cardId !== undefined) {
      saveCubeTestAnswerSheet(params, answerItemId, false, false);
    } else {
      saveCourseTestAnswerSheet(params, answerItemId, false, false);
    }
    await saveTask(testStudentItem.studentId, 'Test');
    await requestCardLectureStructure(cardId);
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
      console.log('lectureStructureItem', lectureStructureItem);
      if (lectureStructureItem?.test?.can !== true) {
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
            if (params.cubeId !== undefined) {
              await saveCubeTestAnswerSheet(params, answerItemId, true, true);
            } else {
              await saveCourseTestAnswerSheet(params, answerItemId, true, true);
            }

            await submitTask(testStudentItem.studentId, 'Test');
            await requestCardLectureStructure(cardId);
            openView('result');
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

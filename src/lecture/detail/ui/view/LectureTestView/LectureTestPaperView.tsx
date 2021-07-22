import { reactAlert, reactConfirm } from '@nara.platform/accent';

import React, { useCallback, useState } from 'react';
import {
  LectureTestAnswerItem,
  LectureTestItem,
  LectureTestStudentItem,
} from '../../../viewModel/LectureTest';
import {
  saveLectureTestAnswerSheet,
  submitLectureTestAnswerSheet,
} from 'lecture/detail/service/useLectureTest/utility/saveLectureTest';

import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { useHistory, useParams } from 'react-router-dom';
import LectureTestPaperQuestionView from './LectureTestPaperQuestionView';

import LectureParams from '../../../viewModel/LectureParams';
import {
  clearFindMyCardRelatedStudentsCache,
  saveTask,
} from '../../../api/cardApi';
import { getLectureParams } from '../../../store/LectureParamsStore';
import {
  getTestStudentItemMapFromCourse,
  getTestStudentItemMapFromCube,
} from '../../../service/useLectureTest/utility/getTestStudentItemMap';
import { getTestAnswerItemMapFromExam } from '../../../service/useLectureTest/utility/getTestAnswerItemMapFromExam';
import { Area } from 'tracker/model';
import { updateCardLectureStructure } from '../../../service/useLectureStructure/utility/updateCardLectureStructure';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureTestPaperViewProps {
  params: LectureParams;
  testItem: LectureTestItem;
  testStudentItem: LectureTestStudentItem;
  answerItem?: LectureTestAnswerItem;
  openView: (view: string) => void;
  modalGbn?: boolean;
}

const LectureTestPaperView: React.FC<LectureTestPaperViewProps> =
  function LectureTestPaperView({
    params,
    testItem,
    testStudentItem,
    answerItem,
    openView,
    modalGbn,
  }) {
    const { cardId } = useParams<LectureParams>();

    const lectureStructureItem = getActiveStructureItem(params.pathname);
    let readOnly = false;
    if (
      lectureStructureItem &&
      (lectureStructureItem.student?.extraWork.testStatus === 'SUBMIT' ||
        lectureStructureItem.student?.extraWork.testStatus === 'PASS')
    ) {
      readOnly = true;
    }

    const saveAnswerSheet = useCallback(async () => {
      let answerItemId = '';
      if (answerItem !== undefined) {
        answerItemId = answerItem.id;
      }

      await saveLectureTestAnswerSheet(params);

      /*if (params.cubeId !== undefined) {
      saveCubeTestAnswerSheet(params, answerItemId, false, false);
    } else {
      saveCourseTestAnswerSheet(params, answerItemId, false, false);
    }*/
      await saveTask(
        lectureStructureItem?.student?.id === undefined
          ? testStudentItem.studentId
          : lectureStructureItem?.student?.id,
        'Test'
      );
      clearFindMyCardRelatedStudentsCache();
      await updateCardLectureStructure(cardId);

      if (params.cubeId !== undefined) {
        await getTestStudentItemMapFromCube(params); // student 재호출
      } else {
        await getTestStudentItemMapFromCourse(params); // student 재호출
      }
      await getTestAnswerItemMapFromExam(testItem.questions, params); // answer 재호출
    }, [answerItem, params, testStudentItem.studentId]);

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

      if (answerItem!.answers.some((element) => element.answer === '')) {
        reactAlert({
          title: getPolyglotText('알림', 'Test-Testing-알림4'),
          message: getPolyglotText('빈 항목을 입력하세요.', 'Test-TestFirst-빈항목'),
        });
      } else {
        const params = getLectureParams();
        if (params === undefined) {
          return;
        }

        reactConfirm({
          title: getPolyglotText('알림', 'Test-Testing-알림1'),
          message: getPolyglotText('Test를 최종 제출 하시겠습니까?', 'Test-Testing-최종제출'),
          onOk: async () => {
            if (answerItem) {
              /*const nextAnswerItem = {
              ...answerItem,
              submitAnswers: answerItem.answers,
            };
            setLectureTestAnswerItem(nextAnswerItem);*/

              await submitLectureTestAnswerSheet(params).then(() => {
                clearFindMyCardRelatedStudentsCache();
                setTimeout(() => {
                  updateCardLectureStructure(cardId).then(() => {
                    getTestStudentItemMapFromCourse(params); // student 재호출
                    getTestAnswerItemMapFromExam(testItem.questions, params); // answer 재호출
                    openView('result');
                  });
                }, 1000);
              });

              /*if (params.cubeId !== undefined) {
              await saveCubeTestAnswerSheet(params, answerItemId, true, true);
            } else {
              await saveCourseTestAnswerSheet(params, answerItemId, true, true);
            }*/

              //await submitTask(testStudentItem.studentId, 'Test');  // /examProcess api와 중복
            }
            setSubmitOk(true);
          },
        });
      }
    }, [answerItem, params]);

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
            {modalGbn && (
              <>
                {/* 모달 팝업창 */}
                <div className="test-text ver2">
                  <div className="test-text-box pop-sty">
                    <span><PolyglotText defaultString="합격기준" id="Test-TestPaper-합격기준1" /></span>
                    <span>
                      <strong>{testItem.successPoint}<PolyglotText defaultString="점" id="Test-TestPaper-점" /></strong>
                    </span>
                  </div>
                  <div className="test-text-box pop-sty">
                    <span>
                      <PolyglotText defaultString="총점" id="Test-TestPaper-총점" />
                    </span>
                    <span>
                      <strong>
                        {testItem.totalPoint}<PolyglotText defaultString="총" id="Test-TestPaper-점" />
                      </strong>
                    </span>
                  </div>
                  <div className="test-text-box pop-sty">
                    <span>
                      <PolyglotText defaultString="내점수" id="Test-TestPaper-내점수" />
                    </span>
                    <span>
                      <strong>
                        {answerItem?.obtainedScore || 0}<PolyglotText defaultString="점" id="Test-TestPaper-점" />
                      </strong>
                    </span>
                  </div>
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
                          params={params}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {!modalGbn && (
              <div className={testClassName}>
                <div
                  className="course-info-header"
                  data-area={Area.CUBE_HEADER}
                >
                  <div className="survey-header">
                    <div className="survey-header-left">
                      {lectureStructureItem?.name}
                    </div>
                    <div className="survey-header-right">
                      {lectureStructureItem &&
                        lectureStructureItem.student?.extraWork.testStatus ===
                          'FAIL' && (
                          <button className="ui button free proceeding p18">
                            <PolyglotText defaultString="미이수" id="Test-TestPaper-미이수" />
                          </button>
                        )}
                      {lectureStructureItem &&
                        lectureStructureItem.student?.extraWork.testStatus ===
                          'SUBMIT' && (
                          <button className="ui button free proceeding p18">
                            <PolyglotText defaultString="검수중" id="Test-TestPaper-검수중" />
                          </button>
                        )}
                      {lectureStructureItem &&
                        lectureStructureItem.student?.extraWork.testStatus ===
                          'PASS' && (
                          <button className="ui button free proceeding p18">
                            <PolyglotText defaultString="이수" id="Test-TestPaper-이수" />
                          </button>
                        )}
                    </div>
                    <div className="test-text">
                      <div className="test-text-box">
                        <span> <PolyglotText defaultString="합격기준" id="Test-TestPaper-합격기준" /></span>
                        <span>{testItem.successPoint}<PolyglotText defaultString="점" id="Test-TestPaper-점" /></span>
                      </div>
                      <div className="test-text-box">
                        <span><PolyglotText defaultString="총점" id="Test-TestPaper-총점" /></span>
                        <span>{testItem.totalPoint}<PolyglotText defaultString="점" id="Test-TestPaper-점" /></span>
                      </div>
                    </div>
                  </div>
                </div>
                <LectureTestPaperQuestionView
                  testItem={testItem}
                  testStudentItem={testStudentItem}
                  answerItem={answerItem}
                  modalGbn={modalGbn}
                  params={params}
                />
                {!readOnly && (
                  <div className="survey-preview">
                    <p>
                      <button
                        className="ui button fix line"
                        onClick={saveAnswerSheet}
                      >
                        <PolyglotText defaultString="저장" id="Test-Testing-저장" />
                      </button>
                      <button
                        className="ui button fix bg"
                        onClick={submitAnswerSheet}
                      >
                        <PolyglotText defaultString="제출" id="Test-Testing-제출" />
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

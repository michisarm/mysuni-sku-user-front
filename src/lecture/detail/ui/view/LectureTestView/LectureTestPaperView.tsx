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
        await getTestStudentItemMapFromCube(params); // student ?????????
      } else {
        await getTestStudentItemMapFromCourse(params); // student ?????????
      }
      await getTestAnswerItemMapFromExam(testItem.questions, params); // answer ?????????
    }, [answerItem, params, testStudentItem.studentId]);

    const [submitOk, setSubmitOk] = useState<boolean>(true); // ?????? ?????? ?????????(????????? ?????? ?????? ?????? ????????? ?????? ??????)

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
          title: getPolyglotText('??????', 'Test-Testing-??????4'),
          message: getPolyglotText(
            '??? ????????? ???????????????.',
            'Test-TestFirst-?????????'
          ),
        });
      } else {
        const params = getLectureParams();
        if (params === undefined) {
          return;
        }

        reactConfirm({
          title: getPolyglotText('??????', 'Test-Testing-??????1'),
          message: getPolyglotText(
            'Test??? ?????? ?????? ???????????????????',
            'Test-Testing-????????????'
          ),
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
                    getTestStudentItemMapFromCourse(params); // student ?????????
                    getTestAnswerItemMapFromExam(testItem.questions, params); // answer ?????????
                    openView('result');
                  });
                }, 1000);
              });

              /*if (params.cubeId !== undefined) {
              await saveCubeTestAnswerSheet(params, answerItemId, true, true);
            } else {
              await saveCourseTestAnswerSheet(params, answerItemId, true, true);
            }*/

              //await submitTask(testStudentItem.studentId, 'Test');  // /examProcess api??? ??????
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
                {/* ?????? ????????? */}
                <div className="test-text ver2">
                  <div className="test-text-box pop-sty">
                    <span>
                      <PolyglotText
                        defaultString="????????????"
                        id="Test-TestPaper-????????????1"
                      />
                    </span>
                    <span>
                      <strong>
                        {testItem.successPoint}
                        <PolyglotText
                          defaultString="???"
                          id="Test-TestPaper-???"
                        />
                      </strong>
                    </span>
                  </div>
                  <div className="test-text-box pop-sty">
                    <span>
                      <PolyglotText
                        defaultString="??????"
                        id="Test-TestPaper-??????"
                      />
                    </span>
                    <span>
                      <strong>
                        {testItem.totalPoint}
                        <PolyglotText
                          defaultString="???"
                          id="Test-TestPaper-???"
                        />
                      </strong>
                    </span>
                  </div>
                  <div className="test-text-box pop-sty">
                    <span>
                      <PolyglotText
                        defaultString="?????????"
                        id="Test-TestPaper-?????????"
                      />
                    </span>
                    <span>
                      <strong>
                        {answerItem?.obtainedScore || 0}
                        <PolyglotText
                          defaultString="???"
                          id="Test-TestPaper-???"
                        />
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
                            <PolyglotText
                              defaultString="?????????"
                              id="Test-TestPaper-?????????"
                            />
                          </button>
                        )}
                      {lectureStructureItem &&
                        lectureStructureItem.student?.extraWork.testStatus ===
                          'SUBMIT' && (
                          <button className="ui button free proceeding p18">
                            <PolyglotText
                              defaultString="?????????"
                              id="Test-TestPaper-?????????"
                            />
                          </button>
                        )}
                      {lectureStructureItem &&
                        lectureStructureItem.student?.extraWork.testStatus ===
                          'PASS' && (
                          <button className="ui button free proceeding p18">
                            <PolyglotText
                              defaultString="??????"
                              id="Test-TestPaper-??????"
                            />
                          </button>
                        )}
                    </div>
                    <div className="test-text">
                      <div className="test-text-box">
                        <span>
                          {' '}
                          <PolyglotText
                            defaultString="????????????"
                            id="Test-TestPaper-????????????"
                          />
                        </span>
                        <span>
                          {testItem.successPoint}
                          <PolyglotText
                            defaultString="???"
                            id="Test-TestPaper-???"
                          />
                        </span>
                      </div>
                      <div className="test-text-box">
                        <span>
                          <PolyglotText
                            defaultString="??????"
                            id="Test-TestPaper-??????"
                          />
                        </span>
                        <span>
                          {testItem.totalPoint}
                          <PolyglotText
                            defaultString="???"
                            id="Test-TestPaper-???"
                          />
                        </span>
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
                        <PolyglotText
                          defaultString="??????"
                          id="Test-Testing-??????"
                        />
                      </button>
                      <button
                        className="ui button fix bg"
                        onClick={submitAnswerSheet}
                      >
                        <PolyglotText
                          defaultString="??????"
                          id="Test-Testing-??????"
                        />
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

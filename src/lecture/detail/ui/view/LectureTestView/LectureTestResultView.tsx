import {
  getActiveCourseStructureItem,
  getActiveStructureItem,
} from '../../../utility/lectureStructureHelper';
import LectureParams from '../../../viewModel/LectureParams';
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  LectureTestAnswerItem,
  LectureTestItem,
  LectureTestStudentItem,
} from '../../../viewModel/LectureTest';
import LectureTestPaperModalView from './LectureTestPaperModalView';
import { Area } from 'tracker/model';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import _ from 'lodash';
import {
  NotieSimpleCdo,
  NotieSpaceType,
} from '@sku/skuniv-ui-comment/lib/api.models';

interface LectureTestResultViewProps {
  testItem: LectureTestItem;
  testStudentItem: LectureTestStudentItem;
  openView: (view: string) => void;
  params: LectureParams;
  answerItem?: LectureTestAnswerItem;
}

const LectureTestResultView: React.FC<LectureTestResultViewProps> =
  function LectureTestResultView({
    testItem,
    testStudentItem,
    openView,
    params,
    answerItem,
  }) {
    const lectureStructureItem = getActiveStructureItem(params.pathname);

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

    let surveyPath: string = '';
    const course = getActiveCourseStructureItem();
    //const program = getActiveProgramStructureItem();
    if (course?.survey !== undefined && course?.survey.state !== 'Completed') {
      surveyPath = course?.survey?.path;
      //} else if (
      //  program?.survey !== undefined &&
      //  program?.survey.state !== 'Completed'
      //) {
      //  surveyPath = program?.survey?.path;
    } else {
      surveyPath = '';
    }

    return (
      <>
        {testItem && lectureStructureItem && lectureStructureItem.student && (
          <>
            {lectureStructureItem.student.extraWork.testStatus === 'FAIL' && (
              <>
                <div className="ui segment full test-complete">
                  {/* Header */}
                  <div
                    className="course-info-header"
                    data-area={Area.CUBE_HEADER}
                  >
                    <div className="survey-header">
                      <div className="survey-header-left test_ing">
                        <i className="icon testHeader">
                          <span className="blind">ai</span>
                        </i>
                        <PolyglotText
                          defaultString="Test"
                          id="Test-TestResult-Information1"
                        />
                      </div>
                      <div className="survey-header-right">
                        <button className="ui button free proceeding">
                          <PolyglotText
                            defaultString="?????????"
                            id="Test-TestResult-?????????"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="course-info-ing">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/all/icon-test-fail.png`}
                    />
                    <h1 className="test_fail">
                      {answerItem?.obtainedScore || 0}
                      <PolyglotText
                        defaultString="???"
                        id="Test-TestResult-???"
                      />
                    </h1>
                    <h3>
                      <PolyglotText
                        defaultString="????????????"
                        id="Test-TestResult-??????"
                      />
                    </h3>
                    <p>
                      {answerItem?.trials || 0}
                      <PolyglotText
                        defaultString="???"
                        id="Test-TestResult-???"
                      />
                    </p>
                    <h2
                      style={{ marginTop: '2.5rem' }}
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          `<strong>Test ??????????????? ???????????? ???????????????.</strong><br />?????? <strong>?????????</strong> ????????? ?????? ?????? Test???  ???????????????.`,
                          'Test-TestResult-?????????'
                        ),
                      }}
                    />
                    <h3>
                      <PolyglotText
                        defaultString="????????????"
                        id="Test-TestResult-????????????1"
                      />
                    </h3>
                    <p>
                      {/*<PolyglotText*/}
                      {/*  defaultString="????????????"*/}
                      {/*  id="Test-TestResult-??????"*/}
                      {/*/>{' '}*/}
                      {/*<strong>*/}
                      {/*  {testItem.preSuccessPoint || testItem.successPoint}*/}
                      {/*  <PolyglotText*/}
                      {/*    defaultString="???"*/}
                      {/*    id="Test-TestResult-???"*/}
                      {/*  />*/}
                      {/*</strong>*/}
                      {/*<span>/</span>*/}
                      <strong>
                        {testItem.preSuccessPoint || testItem.successPoint}
                      </strong>
                      <PolyglotText
                        defaultString=" ??? ??????"
                        id="Test-TestResult-PassingPoint"
                      />
                    </p>
                  </div>
                </div>
                {_.isEmpty(surveyPath) && (
                  <div className="course-info-bottom mb30">
                    <p>
                      <PolyglotText
                        defaultString="Test??? ????????? ??? ?????? ????????? ?????? ???????????????."
                        id="Test-TestResult-????????????"
                      />
                    </p>
                    <button
                      className="ui button free submit p18"
                      onClick={() => openView('retry')}
                    >
                      <PolyglotText
                        defaultString="?????????"
                        id="Test-TestResult-?????????2"
                      />
                    </button>
                    <LectureTestPaperModalView
                      params={params}
                      testItem={testItem}
                      answerItem={answerItem}
                      testStudentItem={testStudentItem}
                      openView={openView}
                      trigger={
                        <button className="ui button free pop d p18 ml20">
                          <PolyglotText
                            defaultString="????????????"
                            id="Test-TestResult-????????????2"
                          />
                        </button>
                      }
                    />
                  </div>
                )}
                {!_.isEmpty(surveyPath) && (
                  <div className="course-info-bottom">
                    <p>
                      <PolyglotText
                        defaultString="Test??? ????????? ??? ?????? ????????? ?????? ???????????????."
                        id="Test-TestResult-????????????2"
                      />
                    </p>
                    <LectureTestPaperModalView
                      params={params}
                      testItem={testItem}
                      answerItem={answerItem}
                      testStudentItem={testStudentItem}
                      openView={openView}
                      trigger={
                        <button className="ui button free pop d p18">
                          <PolyglotText
                            defaultString="????????????"
                            id="Test-TestResult-????????????3"
                          />
                        </button>
                      }
                    />
                    <button
                      className="ui button free submit d ml20"
                      onClick={() => openView('retry')}
                    >
                      <PolyglotText
                        defaultString="?????????"
                        id="Test-TestResult-?????????3"
                      />
                    </button>
                    <button
                      className="ui button free proceeding p18 ml20"
                      onClick={() => goToPath(surveyPath)}
                    >
                      <PolyglotText
                        defaultString="?????? Survey ??????"
                        id="Test-TestResult-Survey1"
                      />
                    </button>
                  </div>
                )}
              </>
            )}
            {lectureStructureItem.student.extraWork.testStatus === 'PASS' && (
              <>
                <div className="ui segment full test-complete">
                  {/* Header */}
                  <div
                    className="course-info-header"
                    data-area={Area.CUBE_HEADER}
                  >
                    <div className="survey-header">
                      <div className="survey-header-left test_ing">
                        <i className="icon testHeader">
                          <span className="blind">
                            <PolyglotText
                              defaultString="ai"
                              id="Test-TestResult-ai1"
                            />
                          </span>
                        </i>
                        <PolyglotText
                          defaultString="Test"
                          id="Test-TestResult-Information2"
                        />
                      </div>
                      <div className="survey-header-right">
                        <button className="ui button free proceeding">
                          <PolyglotText
                            defaultString="??????"
                            id="Test-TestResult-??????"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="course-info-ing">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/all/icon-test-pass.png`}
                    />
                    <h1 className="test_result">
                      {answerItem?.obtainedScore || 0}
                      <PolyglotText
                        defaultString="???"
                        id="Test-TestResult-???"
                      />
                    </h1>
                    <h2>
                      <strong>
                        <PolyglotText
                          defaultString="Test ??????????????? ?????????????????????!"
                          id="Test-TestResult-??????"
                        />
                      </strong>
                      <br />
                      {/* <br dangerouslySetInnerHTML={{__html: getPolyglotText(``, 'Test-TestResult-????????????2')}} /> */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            `?????? <strong>????????????</strong> ????????? ?????? ?????? ????????? ??????????????????!`,
                            'Test-TestResult-????????????'
                          ),
                        }}
                      />
                    </h2>
                    <h3>
                      <PolyglotText
                        defaultString="????????????"
                        id="Test-TestResult-????????????2"
                      />
                    </h3>
                    <p>
                      <PolyglotText
                        defaultString="????????????"
                        id="Test-TestResult-????????????2"
                      />
                      {/*<strong>*/}
                      {/*  {testItem.successPoint}*/}
                      {/*  <PolyglotText*/}
                      {/*    defaultString="???"*/}
                      {/*    id="Test-TestResult-???"*/}
                      {/*  />*/}
                      {/*</strong>*/}
                      {/*<span>/</span>*/}
                      {/*<PolyglotText*/}
                      {/*  defaultString="??????"*/}
                      {/*  id="Test-TestResult-??????"*/}
                      {/*/>{' '}*/}
                      <strong>
                        {testItem.successPoint}
                        <PolyglotText
                          defaultString=" ??? ??????"
                          id="Test-TestResult-PassingPoint"
                        />
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="course-info-bottom">
                  <LectureTestPaperModalView
                    params={params}
                    testItem={testItem}
                    answerItem={answerItem}
                    testStudentItem={testStudentItem}
                    openView={openView}
                    trigger={
                      <button className="ui button free pop d">
                        <PolyglotText
                          defaultString="????????????"
                          id="Test-TestResult-????????????"
                        />
                      </button>
                    }
                  />
                  {surveyPath && (
                    <button
                      className="ui button free proceeding p18 ml20"
                      onClick={() => goToPath(surveyPath)}
                    >
                      <PolyglotText
                        defaultString="?????? Survey ??????"
                        id="Test-TestResult-Survey2"
                      />
                    </button>
                  )}
                </div>
              </>
            )}
            {lectureStructureItem.student.extraWork.testStatus === 'SUBMIT' && (
              <>
                <div className="ui segment full test-complete">
                  {/* Header */}
                  <div
                    className="course-info-header"
                    data-area={Area.CUBE_HEADER}
                  >
                    <div className="survey-header">
                      <div className="survey-header-left test_ing">
                        <i className="icon testHeader">
                          <span className="blind">
                            <PolyglotText
                              defaultString="ai"
                              id="Test-TestResult-ai2"
                            />
                          </span>
                        </i>
                        <PolyglotText
                          defaultString="Test"
                          id="Test-TestResult-Information"
                        />
                      </div>
                      <div className="survey-header-right">
                        <button className="ui button free proceeding">
                          <PolyglotText
                            defaultString="?????????"
                            id="Test-TestResult-?????????"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="course-info-ing">
                    <img src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-test-wait.png" />
                    <h2
                      className="test-delay-h2"
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          ` <strong>???????????? ?????? ?????? ????????????.</strong><br />????????? ???????????? ????????? ????????? ???????????? ??? ????????????.`,
                          'Test-TestResult-???????????????'
                        ),
                      }}
                    />
                  </div>
                  <div className="course-info-bottom">
                    {surveyPath && (
                      <button
                        className="ui button free proceeding p18 ml20"
                        onClick={() => goToPath(surveyPath)}
                      >
                        <PolyglotText
                          defaultString="?????? Survey ??????"
                          id="Test-TestResult-Survey"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  };

export default LectureTestResultView;

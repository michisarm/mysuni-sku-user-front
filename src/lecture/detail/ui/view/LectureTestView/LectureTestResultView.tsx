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
                            defaultString="미이수"
                            id="Test-TestResult-미이수"
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
                        defaultString="점"
                        id="Test-TestResult-점"
                      />
                    </h1>
                    <h3>
                      <PolyglotText
                        defaultString="응시횟수"
                        id="Test-TestResult-횟수"
                      />
                    </h3>
                    <p>
                      {answerItem?.trials || 0}
                      <PolyglotText
                        defaultString="회"
                        id="Test-TestResult-회"
                      />
                    </p>
                    <h2
                      style={{ marginTop: '2.5rem' }}
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          `<strong>Test 이수조건을 통과하지 못했습니다.</strong><br />하단 <strong>재응시</strong> 버튼을 통해 다시 Test를  풀어보세요.`,
                          'Test-TestResult-불합격'
                        ),
                      }}
                    />
                    <h3>
                      <PolyglotText
                        defaultString="이수조건"
                        id="Test-TestResult-이수조건1"
                      />
                    </h3>
                    <p>
                      {/*<PolyglotText*/}
                      {/*  defaultString="합격기준"*/}
                      {/*  id="Test-TestResult-총점"*/}
                      {/*/>{' '}*/}
                      {/*<strong>*/}
                      {/*  {testItem.preSuccessPoint || testItem.successPoint}*/}
                      {/*  <PolyglotText*/}
                      {/*    defaultString="점"*/}
                      {/*    id="Test-TestResult-점"*/}
                      {/*  />*/}
                      {/*</strong>*/}
                      {/*<span>/</span>*/}
                      <strong>
                        {testItem.preSuccessPoint || testItem.successPoint}
                      </strong>
                      <PolyglotText
                        defaultString=" 점 이상"
                        id="Test-TestResult-PassingPoint"
                      />
                    </p>
                  </div>
                </div>
                {_.isEmpty(surveyPath) && (
                  <div className="course-info-bottom mb30">
                    <p>
                      <PolyglotText
                        defaultString="Test를 재응시 할 경우 문항이 랜덤 출제됩니다."
                        id="Test-TestResult-응시정보"
                      />
                    </p>
                    <button
                      className="ui button free submit p18"
                      onClick={() => openView('retry')}
                    >
                      <PolyglotText
                        defaultString="재응시"
                        id="Test-TestResult-재응시2"
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
                            defaultString="결과보기"
                            id="Test-TestResult-결과보기2"
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
                        defaultString="Test를 재응시 할 경우 문항이 랜덤 출제됩니다."
                        id="Test-TestResult-응시정보2"
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
                            defaultString="결과보기"
                            id="Test-TestResult-결과보기3"
                          />
                        </button>
                      }
                    />
                    <button
                      className="ui button free submit d ml20"
                      onClick={() => openView('retry')}
                    >
                      <PolyglotText
                        defaultString="재응시"
                        id="Test-TestResult-재응시3"
                      />
                    </button>
                    <button
                      className="ui button free proceeding p18 ml20"
                      onClick={() => goToPath(surveyPath)}
                    >
                      <PolyglotText
                        defaultString="과정 Survey 참여"
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
                            defaultString="이수"
                            id="Test-TestResult-이수"
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
                        defaultString="점"
                        id="Test-TestResult-점"
                      />
                    </h1>
                    <h2>
                      <strong>
                        <PolyglotText
                          defaultString="Test 이수조건을 통과하셨습니다!"
                          id="Test-TestResult-통과"
                        />
                      </strong>
                      <br />
                      {/* <br dangerouslySetInnerHTML={{__html: getPolyglotText(``, 'Test-TestResult-합격기준2')}} /> */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getPolyglotText(
                            `하단 <strong>결과보기</strong> 버튼을 통해 나의 결과를 확인해보세요!`,
                            'Test-TestResult-나의결과'
                          ),
                        }}
                      />
                    </h2>
                    <h3>
                      <PolyglotText
                        defaultString="이수조건"
                        id="Test-TestResult-이수조건2"
                      />
                    </h3>
                    <p>
                      <PolyglotText
                        defaultString="합격기준"
                        id="Test-TestResult-합격기준2"
                      />
                      {/*<strong>*/}
                      {/*  {testItem.successPoint}*/}
                      {/*  <PolyglotText*/}
                      {/*    defaultString="점"*/}
                      {/*    id="Test-TestResult-점"*/}
                      {/*  />*/}
                      {/*</strong>*/}
                      {/*<span>/</span>*/}
                      {/*<PolyglotText*/}
                      {/*  defaultString="총점"*/}
                      {/*  id="Test-TestResult-총점"*/}
                      {/*/>{' '}*/}
                      <strong>
                        {testItem.successPoint}
                        <PolyglotText
                          defaultString=" 점 이상"
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
                          defaultString="결과보기"
                          id="Test-TestResult-결과보기"
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
                        defaultString="과정 Survey 참여"
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
                            defaultString="채점중"
                            id="Test-TestResult-채점중"
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
                          ` <strong>관리자가 채점 중에 있습니다.</strong><br />채점이 완료되면 메일로 결과를 확인하실 수 있습니다.`,
                          'Test-TestResult-관리자채점'
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
                          defaultString="과정 Survey 참여"
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

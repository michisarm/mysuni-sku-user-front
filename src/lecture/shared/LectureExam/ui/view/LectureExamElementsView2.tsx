import React from 'react';
import SurveyCaseModel from '../../../../../survey/event/model/SurveyCaseModel';

interface TestProps {
  OnTest?: () => void;
  OnTestNotReady?: () => void;
  onAlreadyPassed?: () => void;
  onTestWaiting?: () => void;
  viewObject?: any;
  type?: string;
  name?: string;
  sort?: string;
}

export const Test = ({
  OnTest,
  OnTestNotReady,
  onAlreadyPassed,
  onTestWaiting,
  viewObject,
  type,
  name,
  sort,
}: TestProps) => {
  //
  if (!OnTest) return null;

  return (
    <>
      {sort === 'detail' && (
        <li className="step2 trs">
          <div className="category">
            <i className="icon icon-test24" />
            <span>Test</span>
          </div>
          <div className="tit">
            <span className="ellipsis">{viewObject.examTitle}</span>
          </div>
          <div className="right">
            {(type === '0' || type === '2') && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  OnTest();
                  e.preventDefault();
                }}
              >
                <span className="text">{name}</span>
                <i className="icon play-black24" />
              </a>
            )}

            {(type === '1' || type === '3') && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  if (OnTestNotReady) {
                    OnTestNotReady();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text">{name}</span>
                <i className="icon play-black24" />
              </a>
              // <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnTestNotReady}><span>{name}</span></button>
            )}

            {type === '4' && (
              <div className="btn-play completed">
                <span className="text no-link">{name}</span>
                <i className="icon play-completed24" />
              </div>
            )}

            {type === '5' && name === '??????' && (
              <a
                href="#"
                className="btn-play completed"
                onClick={e => {
                  if (onAlreadyPassed) {
                    onAlreadyPassed();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text no-link">{name}</span>
                <i className="icon play-completed24" />
              </a>
            )}

            {type === '5' && name === '????????????' && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  if (onTestWaiting) {
                    onTestWaiting();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text no-link">{name}</span>
                <i className="icon play-black24-dim" />
              </a>
            )}
          </div>
        </li>
      )}

      {sort === 'course-trs' && (
        <li className="trs">
          <div className="category">
            <i className="icon icon-test24" />
            <span>Test</span>
          </div>
          <div className="tit">
            <span className="ellipsis">{viewObject.examTitle}</span>
          </div>
          <div className="right">
            {(type === '0' || type === '2') && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  OnTest();
                  e.preventDefault();
                }}
              >
                <span className="text">{name}</span>
                <i className="icon play-black24" />
              </a>
            )}

            {(type === '1' || type === '3') && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  if (OnTestNotReady) {
                    OnTestNotReady();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text">{name}</span>
                <i className="icon play-black24" />
              </a>
              // <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnTestNotReady}><span>{name}</span></button>
            )}

            {type === '4' && (
              <div className="btn-play completed">
                <span className="text no-link">{name}</span>
                <i className="icon play-completed24" />
              </div>
            )}

            {type === '5' && name === '??????' && (
              <a
                href="#"
                className="btn-play completed"
                onClick={e => {
                  if (onAlreadyPassed) {
                    onAlreadyPassed();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text no-link">{name}</span>
                <i className="icon play-completed24" />
              </a>
            )}

            {type === '5' && name === '????????????' && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  if (onTestWaiting) {
                    onTestWaiting();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text no-link">{name}</span>
                <i className="icon play-black24-dim" />
              </a>
            )}
          </div>
        </li>
      )}

      {(sort === 'box' || sort === 'cube') && (
        <div className="bar typeB">
          <div className="category">
            <i className="icon icon-test24" />
            <span>Test</span>
          </div>
          <div className="tit">
            <span className="ellipsis">{viewObject.examTitle}</span>
          </div>
          <div className="right">
            {(type === '0' || type === '2') && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  OnTest();
                  e.preventDefault();
                }}
              >
                <span className="text">{name}</span>
                <i className="icon play-black24" />
              </a>
            )}

            {(type === '1' || type === '3' || type === undefined) && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  if (OnTestNotReady) {
                    OnTestNotReady();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text">{name}</span>
                <i className="icon play-black24" />
              </a>
            )}

            {type === '4' && (
              <div className="btn-play completed">
                <span className="text no-link">{name}</span>
                <i className="icon play-completed24" />
              </div>
            )}

            {type === '5' && name === '??????' && (
              <a
                href="#"
                className="btn-play completed"
                onClick={e => {
                  if (onAlreadyPassed) {
                    onAlreadyPassed();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text no-link">{name}</span>
                <i className="icon play-completed24" />
              </a>
            )}

            {type === '5' && name === '????????????' && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  if (onTestWaiting) {
                    onTestWaiting();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text no-link">{name}</span>
                <i className="icon play-black24-dim" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

interface ReportProps {
  OnReport?: () => void;
  onReportNotReady?: () => void;
  viewObject?: any;
  passedState?: boolean;
  type?: string;
  name?: string;
  sort?: string;
}

export const Report = ({
  OnReport,
  onReportNotReady,
  viewObject,
  passedState,
  type,
  name,
  sort,
}: ReportProps) => {
  //
  if (!OnReport) return null;
  // if (passedState !== undefined) {
  //   alert(passedState);
  // }

  return (
    <>
      {sort === 'detail' && (
        <li className="step2 trs">
          <div className="category">
            <i className="icon icon-report24" />
            <span>Report</span>
          </div>
          <div className="tit">
            {/*<a className="ellipsis" href="#">{name}</a>*/}
          </div>
          <div className="right">
            {passedState && (
              <div className="btn-play completed">
                <span className="text no-link">????????????</span>
                <i className="icon play-completed24" />
              </div>
            )}

            {!passedState &&
              (type === '0' ||
                type === '2' ||
                type === '4' ||
                type === '5') && (
                <a
                  href="#"
                  className="btn-play black"
                  onClick={e => {
                    OnReport();
                    e.preventDefault();
                  }}
                >
                  <span className="text">????????????</span>
                  <i className="icon play-black24" />
                </a>
              )}

            {!passedState && (type === '1' || type === '3') && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  if (onReportNotReady) {
                    onReportNotReady();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text">????????????</span>
                <i className="icon play-black24" />
              </a>
            )}
          </div>
        </li>
      )}

      {sort === 'course-trs' && (
        <li className="trs">
          <div className="category">
            <i className="icon icon-report24" />
            <span>Report</span>
          </div>
          <div className="tit">
            {/*<a className="ellipsis" href="#">{name}</a>*/}
          </div>
          <div className="right">
            {passedState && (
              <div className="btn-play completed">
                <span className="text no-link">????????????</span>
                <i className="icon play-completed24" />
              </div>
            )}

            {!passedState &&
              (type === '0' ||
                type === '2' ||
                type === '4' ||
                type === '5') && (
                <a
                  href="#"
                  className="btn-play black"
                  onClick={e => {
                    OnReport();
                    e.preventDefault();
                  }}
                >
                  <span className="text">????????????</span>
                  <i className="icon play-black24" />
                </a>
              )}

            {!passedState && (type === '1' || type === '3') && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  if (onReportNotReady) {
                    onReportNotReady();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text">????????????</span>
                <i className="icon play-black24" />
              </a>
            )}
          </div>
        </li>
      )}

      {(sort === 'box' || sort === 'cube') && (
        <div className="bar typeB">
          <div className="category">
            <i className="icon icon-report24" />
            <span>Report</span>
          </div>
          <div className="tit">
            {/*<a className="ellipsis" href="#">{name}</a>*/}
          </div>
          <div className="right">
            {passedState && (
              <div className="btn-play completed">
                <span className="text no-link">????????????</span>
                <i className="icon play-completed24" />
              </div>
            )}

            {!passedState &&
              (type === '0' ||
                type === '2' ||
                type === '4' ||
                type === '5') && (
                <a
                  href="#"
                  className="btn-play black"
                  onClick={e => {
                    OnReport();
                    e.preventDefault();
                  }}
                >
                  <span className="text">????????????</span>
                  <i className="icon play-black24" />
                </a>
              )}

            {!passedState && (type === '1' || type === '3') && (
              <a
                href="#"
                className="btn-play black"
                onClick={e => {
                  if (onReportNotReady) {
                    onReportNotReady();
                  }
                  e.preventDefault();
                }}
              >
                <span className="text">????????????</span>
                <i className="icon play-black24" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

interface SurveyProps {
  onSurvey?: () => void;
  OnSurveyNotReady?: () => void;
  viewObject?: any;
  type?: string;
  name?: string;
  sort?: string;
}

export const Survey = ({
  onSurvey,
  OnSurveyNotReady,
  viewObject,
  type,
  name,
  sort,
}: SurveyProps) => {
  //
  if (!onSurvey) return null;

  return (
    <>
      {sort === 'detail' && (
        <li className="step2 trs">
          <div className="category">
            <i className="icon icon-survey24" />
            <span>Survey</span>
          </div>
          <div className="tit">
            <span className="ellipsis">{viewObject.surveyTitle}</span>
          </div>
          <div className="right">
            {viewObject.surveyState && (
              <div className="btn-play completed">
                <span className="text no-link">????????????</span>
                <i className="icon play-completed24" />
              </div>
            )}

            {!viewObject.surveyState &&
              (viewObject.state !== undefined ||
                viewObject.state === 'Completed' ||
                viewObject.state === 'InProgress' ||
                viewObject.state === 'Waiting' ||
                viewObject.state === 'Missed') && (
                <a
                  href="#"
                  className="btn-play black"
                  onClick={e => {
                    onSurvey();
                    e.preventDefault();
                  }}
                >
                  <span className="text">????????????</span>
                  <i className="icon play-black24" />
                </a>
              )}

            {!viewObject.surveyState &&
              viewObject.state === undefined &&
              viewObject.state !== 'Completed' &&
              viewObject.state !== 'InProgress' &&
              viewObject.state !== 'Waiting' &&
              viewObject.state !== 'Missed' && (
                <a
                  href="#"
                  className="btn-play black"
                  onClick={e => {
                    if (OnSurveyNotReady) {
                      OnSurveyNotReady();
                    }
                    e.preventDefault();
                  }}
                >
                  <span className="text">????????????</span>
                  <i className="icon play-black24" />
                </a>
                // <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnSurveyNotReady}><span>????????????</span></button>
              )}
          </div>
        </li>
      )}

      {sort === 'course-trs' && (
        <li className="trs">
          <div className="category">
            <i className="icon icon-survey24" />
            <span>Survey</span>
          </div>
          <div className="tit">
            <span className="ellipsis">{viewObject.surveyTitle}</span>
          </div>
          <div className="right">
            {viewObject.surveyState && (
              <div className="btn-play completed">
                <span className="text no-link">????????????</span>
                <i className="icon play-completed24" />
              </div>
            )}

            {!viewObject.surveyState &&
              (viewObject.state !== undefined ||
                viewObject.state === 'Completed' ||
                viewObject.state === 'InProgress' ||
                viewObject.state === 'Waiting' ||
                viewObject.state === 'Missed') && (
                <a
                  href="#"
                  className="btn-play black"
                  onClick={e => {
                    onSurvey();
                    e.preventDefault();
                  }}
                >
                  <span className="text">????????????</span>
                  <i className="icon play-black24" />
                </a>
              )}

            {!viewObject.surveyState &&
              viewObject.state === undefined &&
              viewObject.state !== 'Completed' &&
              viewObject.state !== 'InProgress' &&
              viewObject.state !== 'Waiting' &&
              viewObject.state !== 'Missed' && (
                <a
                  href="#"
                  className="btn-play black"
                  onClick={e => {
                    if (OnSurveyNotReady) {
                      OnSurveyNotReady();
                    }
                    e.preventDefault();
                  }}
                >
                  <span className="text">????????????</span>
                  <i className="icon play-black24" />
                </a>
                // <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnSurveyNotReady}><span>????????????</span></button>
              )}
          </div>
        </li>
      )}

      {(sort === 'box' || sort === 'cube') && (
        <div className="bar typeB">
          <div className="category">
            <i className="icon icon-survey24" />
            <span>Survey</span>
          </div>
          <div className="tit">
            <span className="ellipsis">{viewObject.surveyTitle}</span>
          </div>
          <div className="right">
            {viewObject.surveyState && (
              <div className="btn-play completed">
                <span className="text no-link">????????????</span>
                <i className="icon play-completed24" />
              </div>
            )}

            {!viewObject.surveyState &&
              (viewObject.state !== undefined ||
                viewObject.state === 'Completed' ||
                viewObject.state === 'InProgress' ||
                viewObject.state === 'Waiting' ||
                viewObject.state === 'Missed') && (
                <a
                  href="#"
                  className="btn-play black"
                  onClick={e => {
                    onSurvey();
                    e.preventDefault();
                  }}
                >
                  <span className="text">????????????</span>
                  <i className="icon play-black24" />
                </a>
              )}

            {!viewObject.surveyState &&
              viewObject.state === undefined &&
              viewObject.state !== 'Completed' &&
              viewObject.state !== 'InProgress' &&
              viewObject.state !== 'Waiting' &&
              viewObject.state !== 'Missed' && (
                <a
                  href="#"
                  className="btn-play black"
                  onClick={e => {
                    if (OnSurveyNotReady) {
                      OnSurveyNotReady();
                    }
                    e.preventDefault();
                  }}
                >
                  <span className="text">????????????</span>
                  <i className="icon play-black24" />
                </a>
                // <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnSurveyNotReady}><span>????????????</span></button>
              )}
          </div>
        </div>
      )}
    </>
  );
};

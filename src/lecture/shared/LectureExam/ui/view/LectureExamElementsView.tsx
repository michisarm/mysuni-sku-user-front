import React from 'react';

interface ReportProps {
  OnReport?: () => void;
  onReportNotReady?: () => void;
  viewObject?: any;
  passedState?: boolean;
  type?: string;
  name?: string;
}

export const Report = ({
  OnReport,
  onReportNotReady,
  viewObject,
  passedState,
  type,
  name,
}: ReportProps) => {
  //
  if (!OnReport) return null;

  const isMissed = viewObject.state?.toString() === 'Missed' ? true : false;

  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img
          src={`${process.env.PUBLIC_URL}/images/all/report.svg`}
          alt="Report"
        />
      </div>
      <div className="desc">
        <div className="t-copy">Report</div>
        {/*<div className="s-copy">Front-End Machine Learning UI/UX Guide Director</div>*/}
      </div>
      <div className="btn-area">
        {passedState && (
          <span className="state">제출완료</span>
          // <button className="ui button trs" onClick={OnReport}><span>과제제출</span></button>
        )}

        {!passedState && type === '0' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            onClick={OnReport}
          >
            <span>과제제출</span>
          </button>
        )}

        {!passedState && type === '1' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            style={{ opacity: 0.3 }}
            onClick={onReportNotReady}
          >
            <span>과제제출</span>
          </button>
        )}

        {!passedState && type === '2' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            onClick={OnReport}
          >
            <span>과제제출</span>
          </button>
        )}

        {!passedState && type === '3' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            style={{ opacity: 0.3 }}
            onClick={onReportNotReady}
          >
            <span>과제제출</span>
          </button>
        )}

        {!passedState && type === '4' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            onClick={OnReport}
          >
            <span>과제제출</span>
          </button>
        )}

        {!passedState && type === '5' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            onClick={OnReport}
          >
            <span>과제제출</span>
          </button>
        )}
      </div>
    </div>
  );
};

interface TestProps {
  OnTest?: () => void;
  OnTestNotReady?: () => void;
  viewObject?: any;
  type?: string;
  name?: string;
}

export const Test = ({
  OnTest,
  OnTestNotReady,
  viewObject,
  type,
  name,
}: TestProps) => {
  //
  if (!OnTest) return null;

  const isMissed = viewObject.state?.toString() === 'Missed' ? true : false;

  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}/images/all/test.svg`} alt="Test" />
      </div>
      <div className="desc">
        <div className="t-copy">Test</div>
        <div className="s-copy">{viewObject.examTitle}</div>
      </div>
      <div className="btn-area">
        {type === '0' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            onClick={OnTest}
          >
            <span>{name}</span>
          </button>
        )}
        {type === '1' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            style={{ opacity: 0.3 }}
            onClick={OnTestNotReady}
          >
            <span>{name}</span>
          </button>
        )}
        {type === '2' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            onClick={OnTest}
          >
            <span>{name}</span>
          </button>
        )}
        {type === '3' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            style={{ opacity: 0.3 }}
            onClick={OnTestNotReady}
          >
            <span>{name}</span>
          </button>
        )}
        {type === '4' && <span className="state">{name}</span>}
        {type === '5' && (
          <button
            className="ui button trs"
            disabled={isMissed}
            onClick={OnTest}
          >
            <span>{name}</span>
          </button>
        )}
      </div>
    </div>
  );
};

interface SurveyProps {
  onSurvey?: () => void;
  OnSurveyNotReady?: () => void;
  viewObject?: any;
  type?: string;
  name?: string;
}

export const Survey = ({
  onSurvey,
  OnSurveyNotReady,
  viewObject,
  type,
  name,
}: SurveyProps) => {
  //
  if (!onSurvey) return null;

  const isMissed = viewObject.state?.toString() === 'Missed' ? true : false;

  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img
          src={`${process.env.PUBLIC_URL}/images/all/survey.svg`}
          alt="Survey"
        />
      </div>
      <div className="desc">
        <div className="t-copy">Survey</div>
        <div className="s-copy">{viewObject.surveyTitle}</div>
      </div>
      <div className="btn-area">
        {viewObject.surveyState && <span className="state">참여완료</span>}
        {!viewObject.surveyState && viewObject.state !== undefined && (
          <>
            {(viewObject.state === 'Completed' ||
              viewObject.state === 'InProgress' ||
              viewObject.state === 'Waiting' ||
              viewObject.state === 'Missed') && (
              <button
                className="ui button trs"
                disabled={isMissed}
                onClick={onSurvey}
              >
                <span>설문하기</span>
              </button>
            )}
          </>
        )}
        {!viewObject.surveyState && viewObject.state === undefined && (
          <button
            className="ui button trs"
            disabled={isMissed}
            style={{ opacity: 0.3 }}
            onClick={OnSurveyNotReady}
          >
            <span>설문하기</span>
          </button>
        )}
      </div>
    </div>
  );
};

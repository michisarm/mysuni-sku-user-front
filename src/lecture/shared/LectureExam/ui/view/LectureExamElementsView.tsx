
import React from 'react';

interface ReportProps {
  OnReport?: () => void
  viewObject?: any
  type?: string
  name?: string
}

export const Report = ({ OnReport,viewObject, type, name }: ReportProps) => {
  //
  if (!OnReport) return null;

  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}/images/all/report.svg`} alt="Report" />
      </div>
      <div className="desc">
        <div className="t-copy">Report</div>
        <div className="s-copy">Front-End Machine Learning UI/UX Guide Director</div>
      </div>
      <div className="btn-area">

        {
          type === '0' && (
            <button className="ui button trs" onClick={OnReport}><span>{name}</span></button>
          )
        }

        {
          type === '1' && (
            <button className="ui button trs" disabled><span>{name}</span></button>
          )
        }

        {
          type === '2' && (
            <span className="state">{name}</span>
          )
        }

      </div>
    </div>
  );
};

interface TestProps {
  OnTest?: () => void
  OnTestNotReady?: () => void
  viewObject?: any
  type?: string
  name?: string
}

export const Test = ({ OnTest, OnTestNotReady, viewObject, type, name}: TestProps) => {
  //
  if (!OnTest) return null;

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
        {
          type === '0' && (
            <button className="ui button trs" onClick={OnTest}><span>{name}</span></button>
          )
        }

        {
          type === '1' && (
            <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnTestNotReady}><span>{name}</span></button>
          )
        }

        {
          type === '2' && (
            <button className="ui button trs" onClick={OnTest}><span>{name}</span></button>
          )
        }

        {
          type === '3' && (
            <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnTestNotReady}><span>{name}</span></button>
          )
        }

        {
          type === '4' && (
            <span className="state">{name}</span>
          )
        }

        {
          type === '5' && (
            <span className="state">{name}</span>
          )
        }

      </div>
    </div>
  );
};

interface SurveyProps {
  onSurvey?: () => void
  viewObject?: any
  type?: string
  name?: string
}

export const Survey = ({ onSurvey,viewObject, type, name }: SurveyProps) => {
  //
  if (!onSurvey) return null;

  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}/images/all/report.svg`} alt="Survey" />
      </div>
      <div className="desc">
        <div className="t-copy">Survey</div>
        <div className="s-copy">{viewObject.surveyTitle}</div>
      </div>
      <div className="btn-area">

        {
          !viewObject.surveyState && (
            <button className="ui button trs" onClick={onSurvey}><span>설문하기</span></button>
          )
        }

        {/*{*/}
        {/*  type === '1' && (*/}
        {/*    <button className="ui button trs" disabled><span>설문하기</span></button>*/}
        {/*  )*/}
        {/*}*/}

        {
          viewObject.surveyState && (
            <span className="state">참여완료</span>
          )
        }

      </div>
    </div>
  );
};

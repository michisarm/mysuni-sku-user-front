
import React from 'react';

interface ReportProps {
  OnReport?: () => void
  viewObject?: any
}

export const Report = ({ OnReport,viewObject }: ReportProps) => {
  //
  if (!OnReport) return null;
  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}/images/all/report.svg`} alt="report" />
      </div>
      <div className="desc">
        <div className="t-copy">Report</div>
        <div className="s-copy">Front-End Machine Learning UI/UX Guide Director</div>
      </div>
      <switch>
        stau == 2
        {
          <div className="btn-area">
            <button className="ui button trs" disabled><span>과제제출</span></button>
          </div>
        }
      </switch>
    </div>
  );
};

interface TestProp {
  OnTest?: () => void
  viewObject?: any
}

export const Test = ({ OnTest, viewObject}: TestProp) => {
  //
  if (!OnTest) return null;

  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}/images/all/test.svg`} alt="test" />
      </div>
      <div className="desc">
        <div className="t-copy">Test {viewObject.examId}</div>
        <div className="s-copy">{viewObject.examTitle}</div>
      </div>
      <div className="btn-area">
        <button className="ui button trs"><span>과제제출</span></button>
      </div>
    </div>
  );
};

interface SurveyProp {
  onSurvey?: () => void
  viewObject?: any
}

export const Survey = ({ onSurvey,viewObject }: SurveyProp) => {
  //
  if (!onSurvey) return null;
  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}/images/all/report.svg`} alt="report" />
      </div>
      <div className="desc">
        <div className="t-copy">Survey {viewObject.surveyId}</div>
        <div className="s-copy">{viewObject.surveyTitle}</div>
      </div>
      <div className="btn-area">
        <button className="ui button trs" disabled><span>설문하기</span></button>
      </div>
    </div>
  );
};

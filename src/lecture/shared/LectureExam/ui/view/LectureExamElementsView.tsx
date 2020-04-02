
import React from 'react';
import Action from '../../../LectureSubInfo/model/Action';

interface ReportProps {
  OnReport?: () => void
  title?: String
  stau?: String
}

export const Report = ({ OnReport, title, stau }: ReportProps) => {
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
  title?: String
  stau?: String
  subActions?: Action[]
}

export const Test = ({ OnTest, title, stau, subActions}: TestProp) => {
  //
  if (!OnTest) return null;

  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}/images/all/test.svg`} alt="test" />
      </div>
      <div className="desc">
        <div className="t-copy">Test</div>
        <div className="s-copy">{title}</div>
      </div>
      <div className="btn-area">
        <button className="ui button trs" disabled><span>설문하기</span></button>
      </div>
    </div>
  );
};

interface SurveyProp {
  onSurvey?: () => void
  title?: String
  stau?: String
}

export const Survey = ({ onSurvey, title, stau }: SurveyProp) => {
  //
  if (!onSurvey) return null;
  return (
    <div className="trs-box">
      <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}/images/all/report.svg`} alt="report" />
      </div>
      <div className="desc">
        <div className="t-copy">Survey</div>
        <div className="s-copy">{title}</div>
      </div>
      <div className="btn-area">
        <button className="ui button trs" disabled><span>설문하기</span></button>
      </div>
    </div>
  );
};
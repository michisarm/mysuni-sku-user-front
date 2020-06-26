
import React from 'react';

interface ReportProps {
  OnReport?: () => void
  onReportNotReady?: () => void
  viewObject?: any
  passedState?: boolean
  type?: string
  name?: string
  sort?: string
}

export const Report = ({ OnReport, onReportNotReady, viewObject, passedState, type, name, sort }: ReportProps) => {
  //
  if (!OnReport) return null;
  // console.log('Report viewObject : ', viewObject);
  // if (passedState !== undefined) {
  //   alert(passedState);
  // }

  return (

    <>
      { sort !== 'detail' ?
        (
          <div className="bar typeB">
            <div className="category">
              <i className="icon icon-report24" />
              <span>Report {name}</span>
            </div>
            <div className="right">
              {
                passedState && (
                  <div className="btn-play black">
                    <span className="text">제출완료</span>
                    <i className="icon play-completed24" />
                  </div>
                )
              }

              {
                !passedState && ( type === '0' || type === '2' || type === '4' || type === '5' ) && (
                  <a href="#" className="btn-play black" onClick={e => {OnReport(); e.preventDefault();}}>
                    <span className="text">과제제출</span>
                    <i className="icon play-black24"/>
                  </a>
                )
              }

              {
                !passedState && ( type === '1' || type === '3' ) && (
                  <a href="#" className="btn-play black" onClick={e => {if (onReportNotReady) {onReportNotReady();} e.preventDefault();}}>
                    <span className="text">과제제출</span>
                    <i className="icon play-black24-dim" />
                  </a>
                )
              }
            </div>
          </div>
        ) : (
          <li className="step2">
            <div className="tit trs">
              <i className="icon icon-report24" />
              <span>Report {name}</span>
            </div>
            <div className="right">
              {
                passedState && (
                  <div className="btn-play black">
                    <span className="text">제출완료</span>
                    <i className="icon play-completed24" />
                  </div>
                )
              }

              {
                !passedState && ( type === '0' || type === '2' || type === '4' || type === '5' ) && (
                  <a href="#" className="btn-play black" onClick={e => {OnReport(); e.preventDefault();}}>
                    <span className="text">과제제출</span>
                    <i className="icon play-black24"/>
                  </a>
                )
              }

              {
                !passedState && ( type === '1' || type === '3' ) && (
                  <a href="#" className="btn-play black" onClick={e => {if (onReportNotReady) {onReportNotReady();} e.preventDefault();}}>
                    <span className="text">과제제출</span>
                    <i className="icon play-black24-dim" />
                  </a>
                )
              }
            </div>
          </li>
        )
      }

    </>
  );
};

interface TestProps {
  OnTest?: () => void
  OnTestNotReady?: () => void
  viewObject?: any
  type?: string
  name?: string
  sort?: string
}

export const Test = ({ OnTest, OnTestNotReady, viewObject, type, name, sort }: TestProps) => {
  //
  if (!OnTest) return null;
  // console.log('Test viewObject : ', viewObject);
  // console.log('type : {0}, name : {1}', type, name);
  return (

    <>
      { sort !== 'detail' ?
        (
          <div className="bar typeB">
            <div className="category">
              <i className="icon icon-test24" />
              <span>Test {viewObject.examTitle}</span>
            </div>
            <div className="right">

              {
                (type === '0' || type === '2') && (
                  <a href="#" className="btn-play black" onClick={e => {OnTest(); e.preventDefault();}}>
                    <span className="text">시험보기</span>
                    <i className="icon play-black24" />
                  </a>
                )
              }

              {
                (type === '1' || type === '3' || type === undefined) && (
                  <a href="#" className="btn-play black" onClick={e => {if (OnTestNotReady) {OnTestNotReady();} e.preventDefault();}}>
                    <span className="text">시험보기</span>
                    <i className="icon play-black24-dim" />
                  </a>
                )
              }

              {
                (type === '4' || type === '5') && (
                  <div className="btn-play completed">
                    <span className="text no-link">{name}</span>
                    <i className="icon play-completed24" />
                  </div>
                )
              }

            </div>
          </div>
        ) : (
          <li className="step2">
            <div className="tit trs">
              <i className="icon icon-test24" />
              <span>Test {viewObject.examTitle}</span>
            </div>
            <div className="right">
              {
                (type === '0' || type === '2') && (
                  <a href="#" className="btn-play black" onClick={e => {OnTest(); e.preventDefault();}}>
                    <span className="text">시험보기</span>
                    <i className="icon play-black24" />
                  </a>
                )
              }

              {
                (type === '1' || type === '3') && (
                  <a href="#" className="btn-play black" onClick={e => {if (OnTestNotReady) {OnTestNotReady();} e.preventDefault();}}>
                    <span className="text">시험보기</span>
                    <i className="icon play-black24-dim" />
                  </a>
                  // <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnTestNotReady}><span>{name}</span></button>
                )
              }

              {
                (type === '4' || type === '5') && (
                  <div className="btn-play completed">
                    <span className="text no-link">{name}</span>
                    <i className="icon play-completed24" />
                  </div>
                )
              }

            </div>
          </li>
        )
      }
    </>

  );
};

interface SurveyProps {
  onSurvey?: () => void
  OnSurveyNotReady?: () => void
  viewObject?: any
  type?: string
  name?: string
  sort?: string
}

export const Survey = ({ onSurvey, OnSurveyNotReady, viewObject, type, name, sort }: SurveyProps) => {
  //
  if (!onSurvey) return null;
  return (

    <>
      { sort !== 'detail' ?
        (
          <div className="bar typeB">
            <div className="category">
              <i className="icon icon-survey24" />
              <span>Survey {name}</span>
            </div>
            <div className="right">

              {
                viewObject.surveyState && (
                  <div className="btn-play completed">
                    <span className="text no-link">참여완료</span>
                    <i className="icon play-completed24" />
                  </div>
                )
              }

              {
                !viewObject.surveyState && (viewObject.state !== undefined || viewObject.state === 'Completed' || viewObject.state === 'InProgress' ||
                  viewObject.state === 'Waiting' || viewObject.state === 'Missed') && (
                  <a href="#" className="btn-play black" onClick={e => {onSurvey(); e.preventDefault();}}>
                    <span className="text">설문하기</span>
                    <i className="icon play-black24" />
                  </a>
                )
              }

              {
                !viewObject.surveyState && viewObject.state === undefined && viewObject.state !== 'Completed' && viewObject.state !== 'InProgress' && viewObject.state !== 'Waiting' && viewObject.state !== 'Missed' && (
                  <a href="#" className="btn-play black" onClick={e => {if (OnSurveyNotReady) {OnSurveyNotReady();} e.preventDefault();}}>
                    <span className="text">설문하기</span>
                    <i className="icon play-black24-dim" />
                  </a>
                  // <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnSurveyNotReady}><span>설문하기</span></button>
                )
              }

            </div>
          </div>
        ) : (
          <li className="step2">
            <div className="tit trs">
              <i className="icon icon-survey24" />
              <span>Survey {name}</span>
            </div>
            <div className="right">
              {
                viewObject.surveyState && (
                  <div className="btn-play completed">
                    <span className="text no-link">참여완료</span>
                    <i className="icon play-completed24" />
                  </div>
                )
              }

              {
                !viewObject.surveyState && (viewObject.state !== undefined || viewObject.state === 'Completed' || viewObject.state === 'InProgress' ||
                  viewObject.state === 'Waiting' || viewObject.state === 'Missed') && (
                  <a href="#" className="btn-play black" onClick={e => {onSurvey(); e.preventDefault();}}>
                    <span className="text">설문하기</span>
                    <i className="icon play-black24" />
                  </a>
                )
              }

              {
                !viewObject.surveyState && viewObject.state === undefined && viewObject.state !== 'Completed' && viewObject.state !== 'InProgress' && viewObject.state !== 'Waiting' && viewObject.state !== 'Missed' && (
                  <a href="#" className="btn-play black" onClick={e => {if (OnSurveyNotReady) {OnSurveyNotReady();} e.preventDefault();}}>
                    <span className="text">설문하기</span>
                    <i className="icon play-black24-dim" />
                  </a>
                  // <button className="ui button trs" style={{ opacity: 0.3 }} onClick={OnSurveyNotReady}><span>설문하기</span></button>
                )
              }
            </div>
          </li>
        )
      }

    </>
  );
};

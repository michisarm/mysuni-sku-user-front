
import React from 'react';

interface ReportProps {
  OnReport?: () => void
  onReportNotReady?: () => void
  viewObject?: any
  passedState?: boolean
  type?: string
  name?: string
}

export const Report = ({ OnReport, onReportNotReady, viewObject, passedState, type, name }: ReportProps) => {
  //
  if (!OnReport) return null;
  // console.log('Report viewObject : ', viewObject);
  // if (passedState !== undefined) {
  //   alert(passedState);
  // }

  return (

    <>
      { type === 'cube' &&
        (
          <div className="bar typeB">
            <div className="category">
              <i className="icon icon-report24" />
              <span>Report {name}</span>
            </div>
            <div className="right">
              <a href="#" className="btn-play black" onClick={OnReport}>
                <span className="text">제출하기</span>
                <i className="icon play-black24" />
              </a>
            </div>
          </div>
        )
      }

      { type === 'box' &&
        (
          <div className="bar typeB">
            <div className="category">
              <i className="icon icon-report24" />
              <span>Report {name}</span>
            </div>
            <div className="right">
              <a href="#" className="btn-play black" onClick={OnReport}>
                <span className="text">제출하기</span>
                <i className="icon play-black24" />
              </a>
            </div>
          </div>
        )
      }

      { type === 'detail' &&
        (
          <li className="step2">
            <div className="tit trs">
              <i className="icon icon-report24" />
              <span>Report {name}</span>
            </div>
            <div className="right">
              <a href="#" className="btn-play black" onClick={OnReport}>
                <span className="text">제출하기</span>
                <i className="icon play-black24" />
              </a>
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
}

export const Test = ({ OnTest, OnTestNotReady, viewObject, type, name }: TestProps) => {
  //
  if (!OnTest) return null;
  // console.log('Test viewObject : ', viewObject);
  // console.log('type : {0}, name : {1}', type, name);
  return (

    <>
      { type === 'cube' &&
        (
          <div className="bar typeB">
            <div className="category">
              <i className="icon icon-test24" />
              <span>Test {name}</span>
            </div>
            <div className="right">
              <a href="#" className="btn-play black" onClick={OnTest}>
                <span className="text">시험보기</span>
                <i className="icon play-black24" />
              </a>
            </div>
          </div>
        )
      }

      { type === 'box' &&
        (
          <div className="bar typeB">
            <div className="category">
              <i className="icon icon-test24" />
              <span>Test {name}</span>
            </div>
            <div className="right">
              <a href="#" className="btn-play black" onClick={OnTest}>
                <span className="text">시험보기</span>
                <i className="icon play-black24" />
              </a>
            </div>
          </div>
        )
      }

      { type === 'detail' &&
        (
          <li className="step2">
            <div className="tit trs">
              <i className="icon icon-test24" />
              <span>Test {name}</span>
            </div>
            <div className="right">
              <a href="#" className="btn-play black" onClick={OnTest}>
                <span className="text">시험보기</span>
                <i className="icon play-black24" />
              </a>
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
}

export const Survey = ({ onSurvey, OnSurveyNotReady, viewObject, type, name }: SurveyProps) => {
  //
  if (!onSurvey) return null;
  // console.log('Survey viewObject : ', viewObject);
  return (

    <>
      { type === 'cube' &&
        (
          <div className="bar typeB">
            <div className="category">
              <i className="icon icon-survey24" />
              <span>Survey {name}</span>
            </div>
            <div className="right">
              <a href="#" className="btn-play black" onClick={onSurvey}>
                <span className="text">설문하기</span>
                <i className="icon play-black24" />
              </a>
            </div>
          </div>
        )
      }

      { type === 'box' &&
        (
          <div className="bar typeB">
            <div className="category">
              <i className="icon icon-survey24" />
              <span>Survey {name}</span>
            </div>
            <div className="right">
              <a href="#" className="btn-play black" onClick={onSurvey}>
                <span className="text">설문하기</span>
                <i className="icon play-black24" />
              </a>
            </div>
          </div>
        )
      }

      { type === 'detail' &&
        (
          <li className="step2">
            <div className="tit trs">
              <i className="icon icon-survey24" />
              <span>Survey {name}</span>
            </div>
            <div className="right">
              <a href="#" className="btn-play black" onClick={onSurvey}>
                <span className="text">설문하기</span>
                <i className="icon play-black24" />
              </a>
            </div>
          </li>
        )
      }
    </>
  );
};

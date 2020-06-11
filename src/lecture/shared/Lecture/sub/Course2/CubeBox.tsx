import React, {Component} from 'react';
import classNames from 'classnames';
import CubeStateName from '../../model/CubeStateName';
import CubeTitle from './CubeTitle';
import CubeRightInfo from './CubeRightInfo';
import Report from './Report';
import Survey from './Survey';
import Test from './Test';

interface Props {
  title : string,
  learningType : string,
  learningTime : string,
  learningState : CubeStateName,
  per? : Number,
  onTest? : boolean,
  testStatus? : string,
  onSurvey? : boolean,
  surveyStatus? : string,
  onReport? : boolean,
  reportStatus? : string,
  isCube? : boolean
}

class CubeBox extends Component<Props> {

  render(){

    const { title, learningType, learningTime, learningState, per, onTest, testStatus, onSurvey, surveyStatus, onReport, reportStatus, isCube } = this.props;
    // Test: Test | 결과대기 | 재응시 | 미이수 | 이수
    // Report: 과제제출 | 결과대기 | 미이수 | 이수
    // Survey: 설문하기 | 참여완료

    return(
      <>
        <div className={classNames({ 'bar' : isCube, 'typeA' : isCube })}>
            <CubeTitle title={title}/>
            <CubeRightInfo
                learningType={learningType}
                learningTime={learningTime}
                learningState={learningState}
                per={per}
            />
        </div>
        <Test
            testStatus={testStatus}
            onTest={onTest}
            isCube={isCube}
        />
        <Survey
            onSurvey={onSurvey}
            surveyStatus={surveyStatus}
            isCube={isCube}
        />
        <Report
            onReport={onReport}
            reportStatus={reportStatus}
        />
      </>
    )
  }
}

export default CubeBox;

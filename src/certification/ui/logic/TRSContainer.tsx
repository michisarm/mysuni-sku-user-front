
import React, {useEffect, useRef, useState} from 'react';
import {inject} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {Icon} from 'semantic-ui-react';
import classNames from 'classnames';
import {TRSContainerWrapper} from '../view/BadgeLectureElementView';

import BadgeLectureState from '../../ui/model/BadgeLectureState';
import BadgeLectureStateName from '../../ui/model/BadgeLectureStateName';
import BadgeCubeData from '../model/BadgeCubeData';
import BadgeCourseData from '../model/BadgeCourseData';
import {CoursePlanContentsModel} from '../../../course/model';
import {PersonalCubeModel} from '../../../personalcube/personalcube/model';
import {BadgeDetailService} from '../../../lecture/stores';


enum StateDefault {
  Learning = 'Learning',
  Test = 'Test',
  Report = 'Report',
  Survey = 'Survey',
}

enum StateDefaultName {
  Learning = '학습하기',
  Test = '평가응시',
  Report = '과제제출',
  Survey = '설문참여',
}

interface Props {
  badgeDetailService?: BadgeDetailService;
  badgeCourse?: BadgeCourseData,
  badgeCourseCube?: BadgeCubeData,
  badgeCube?: BadgeCubeData,
  parentType: string,
  subDepth?: boolean,
}

// sample
const data = {
  type: 'Survey',
  state: 'Progress',
};


const TRSContainer: React.FC<Props> = (Props) => {
  //
  const { badgeDetailService, badgeCourse, badgeCourseCube, badgeCube, parentType, subDepth } = Props;

  const [test, setTest] = useState(false);
  const [testTitle, setTestTitle] = useState('');
  const [testState, setTestState] = useState('');
  const [report, setReport] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [reportState, setReportState] = useState('');
  const [survey, setSurvey] = useState(false);
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyState, setSurveyState] = useState('');

  const type = useRef('');
  const state = useRef('');

  useEffect(() => {
    if (parentType === 'COURSE') {
      if (subDepth) {
        setCubeTRS(badgeCourseCube!);
      }
      else {
        setCourseTRS(badgeCourse!);
      }
    }
    else {  // CUBE
      setCubeTRS(badgeCube!);
    }

  },[]);

  const setCourseTRS = (course: BadgeCourseData) => {
    badgeDetailService!.findCoursePlanContentsV2(course.coursePlanId)
      .then((response: CoursePlanContentsModel) => {
        if (response) {
          if (response.testId && response.testId.length > 0) {
            setTest(true);
            setTestTitle(response.examTitle);
            setTestState(StateDefault.Test);
          }
          if (response.fileBoxId && response.fileBoxId.length > 0) {
            setReport(true);
            setReportTitle(response.examTitle);
            setReportState(StateDefault.Report);
          }
          if (response.surveyId && response.surveyId.length > 0) {
            setSurvey(true);
            setSurveyTitle(course.name);
            setSurveyState(StateDefault.Survey);
          }
        }
      });
  };

  const setCubeTRS = (cube: BadgeCubeData) => {
    badgeDetailService!.findPersonalCube(cube.cubeId)
      .then((response: PersonalCubeModel) => {
        if (response) {
          //console.log( response );
          if (response.contents.examId && response.contents.examId.length > 0) {
            setTest(true);
            setTestTitle(response.contents.examTitle);
          }
          if (response.contents.fileBoxId && response.contents.fileBoxId.length > 0) {
            setReport(true);
            setReportTitle(response.contents.examTitle);
          }
          if (response.contents.surveyId && response.contents.surveyId.length > 0) {
            setSurvey(true);
            setSurveyTitle(cube.name);
          }
        }
      });
  };

  // TRS 상태 및 이벤트 - onClick 이벤트 필요
  const setTRSState = (state: string) => {
    //
    const styleName = ( data.state === BadgeLectureState.Passed || data.state === BadgeLectureState.Missed ) ? 'completed' : 'black';

    return (
      <>
        {/*대기중 or 진행 중*/}
        { (state === null || state === BadgeLectureState.Progress) ? (
          <a href="#" className={classNames('btn-play', styleName)}>
            <span className="text">{StateDefaultName[data.type as StateDefault]}</span>
            <Icon className={`play-${styleName}24`} />
          </a>
        ) : (
          <span className={classNames('btn-play', (data.state === BadgeLectureState.Passed) ? 'completed' : '')}>
            <span className={classNames('text', (data.state === BadgeLectureState.Waiting) ? 'no-link' : '')}>{BadgeLectureStateName[data.state as BadgeLectureState]}</span>
            <Icon className={`play-${styleName}24-dim`}/>
          </span>
        )}
      </>
    );
  };

  return (
    <>
      {test ?
        <TRSContainerWrapper parentType={parentType} subDepth={subDepth}>
          <div className="category">
            <Icon className={classNames(`icon-${data.type.toLowerCase()}24`)}/>
            <span>Test</span>
          </div>
          <div className="tit">
            <a href="#" className="ellipsis">{testTitle}</a>
          </div>
          <div className="right">
            {setTRSState(testState)}
          </div>
        </TRSContainerWrapper>
        :
        null
      }
      {report ?
        <TRSContainerWrapper parentType={parentType} subDepth={subDepth}>
          <div className="category">
            <Icon className={classNames(`icon-${data.type.toLowerCase()}24`)}/>
            <span>Report</span>
          </div>
          <div className="tit">
            <a href="#" className="ellipsis">{reportTitle}</a>
          </div>
          <div className="right">
            {setTRSState(reportState)}
          </div>
        </TRSContainerWrapper>
        :
        null
      }
      {survey ?
        <TRSContainerWrapper parentType={parentType} subDepth={subDepth}>
          <div className="category">
            <Icon className={classNames(`icon-${data.type.toLowerCase()}24`)}/>
            <span>Survey</span>
          </div>
          <div className="tit">
            <a href="#" className="ellipsis">{surveyTitle}</a>
          </div>
          <div className="right">
            {setTRSState(surveyState)}
          </div>
        </TRSContainerWrapper>
        :
        null
      }
    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'badgeDetail.badgeDetailService',
))(TRSContainer);

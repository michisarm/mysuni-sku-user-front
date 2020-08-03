import React, {useEffect, useState, Fragment} from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { mobxHelper } from '@nara.platform/accent';
import {Button, Icon} from 'semantic-ui-react';
import classNames from 'classnames';
import {dateTimeHelper} from 'shared';
import CubeType from 'myTraining/model/CubeType';
import CubeTypeNameType from 'myTraining/model/CubeTypeNameType';
import BadgeCompData from '../model/BadgeCompData';
import BadgeCompModel from '../model/BadgeCompModel';
import {BadgeDetailService, StudentService} from '../../../lecture/stores';
import BadgeCubeData from '../model/BadgeCubeData';
import BadgeCourseData from '../model/BadgeCourseData';
import {LectureViewModel} from '../../../lecture/model';
import {CoursePlanContentsModel} from '../../../course/model';
import {PersonalCubeModel} from '../../../personalcube/personalcube/model';
import {CoursePlanService} from '../../../course/stores';
import {CoursePlanCustomModel} from '../../../course/model/CoursePlanCustomModel';

import BadgeLectureState from '../../ui/model/BadgeLectureState';
import BadgeLectureStateName from '../../ui/model/BadgeLectureStateName';


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


interface Props extends RouteComponentProps {
  //
  coursePlanService? : CoursePlanService;
  badgeDetailService?: BadgeDetailService;
  studentService?: StudentService;

  badgeId: string;
}

const BadgeLectureContainer: React.FC<Props> = (Props) => {
  //
  const { coursePlanService, badgeDetailService, badgeId, } = Props;

  const [badgeCompList, setBadgeCompList] = useState<BadgeCompData[]>([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    // 배지 구성 학습 리스트 조회하기
    getBadgeCompLectures(badgeId);
    setTimeout(() => {
      setOpened(!opened);
    }, 500);
  }, [badgeId]);

  // 뱃지 구성 학습 리스트 조회하기
  const getBadgeCompLectures = (badgeId: string) => {
    let compList: BadgeCompData[] = [];
    badgeDetailService!.findBadgeCompList(badgeId).then((response: BadgeCompModel[]) => {
      if (response.length > 0) {
        response.map((data: BadgeCompModel) => {
          const compData = new BadgeCompData();
          // 공통
          compData.compType = data.serviceType;
          compData.id = data.id;
          compData.patronKeyString = data.patronKey.keyString;
          // 코스정보
          if (data.serviceType === 'COURSE') {
            // 코스정보 생성
            compData.course = new BadgeCourseData();
            compData.course.serviceId = data.serviceId;
            compData.course.name = data.name;
            compData.course.coursePlanId = data.coursePlanId;
            compData.course.isOpened = false;
            compData.course.cubeCount = data.lectureCardUsids.length;
            data.lectureCardUsids.map((id: string) => {
              compData.course!.lectureCardIds = compData.course!.lectureCardIds.concat(id);
            });
            getCourseTRS(compData.course);
          }
          // (학습)카드정보
          else {
            compData.cube = new BadgeCubeData();
            compData.cube.name = data.name;
            compData.cube.cubeId = data.cubeId;
            compData.cube.learningCardId = data.learningCardId;
            compData.cube.cubeType = data.cubeType;
            compData.cube.learningTime = data.learningTime; // 학습시간(분)
            compData.cube.sumViewSeconds = data.sumViewSeconds; // 진행율(%)
            compData.cube.learningState = data.learningState;
            getCubeTRS(compData.cube);
          }
          compList = compList.concat(compData);
        });
      }
      setBadgeCompList(compList);
    });
  };

  const getCourseTRS = async (course: BadgeCourseData) => {
    await badgeDetailService!.findCoursePlanContentsV2(course.coursePlanId)
      .then((response: CoursePlanContentsModel) => {
        if (response) {
          if (response.testId && response.testId.length > 0) {
            course.test = true;
            course.test_name = response.examTitle;
          }
          if (response.fileBoxId && response.fileBoxId.length > 0) {
            course.report = true;
            course.report_name = response.examTitle;
          }
          if (response.surveyId && response.surveyId.length > 0) {
            course.survey = true;
            course.survey_name = course.name;
          }
        }
      });
  };

  const getCubeTRS = async (cube: BadgeCubeData) => {
    await badgeDetailService!.findPersonalCube(cube.cubeId)
      .then((response: PersonalCubeModel) => {
        if (response) {
          if (response.contents.examId && response.contents.examId.length > 0) {
            cube.test = true;
            cube.test_name = response.contents.examTitle;
          }
          if (response.contents.fileBoxId && response.contents.fileBoxId.length > 0) {
            cube.report = true;
            cube.report_name = response.contents.examTitle;
          }
          if (response.contents.surveyId && response.contents.surveyId.length > 0) {
            cube.survey = true;
            cube.survey_name = cube.name;
          }
        }
      });
  };

  // 코스를 구성하는 렉쳐(큐브)들의 정보 가져오기
  const showCourseInfo = (course: BadgeCourseData) => {
    //
    course.isOpened = !course.isOpened;
    course.cubeData = [];

    if (course.isOpened) {
      coursePlanService!.findAllCoursePlanInfo(course.coursePlanId, course.serviceId)
        .then((response: CoursePlanCustomModel | null) => {
          if (response && response.lectureViews) {
            response.lectureViews.map((lecture: LectureViewModel) => {
              const cubeData = new BadgeCubeData();
              cubeData.cubeId = lecture.cubeId;
              cubeData.name = lecture.name;
              cubeData.learningCardId = lecture.learningCardId;
              cubeData.cubeType = lecture.cubeType;
              cubeData.learningTime = lecture.learningTime;
              // 진행율(%)
              cubeData.sumViewSeconds = lecture.sumViewSeconds === '' ? 0 : parseInt(lecture.sumViewSeconds);
              cubeData.learningState = lecture.learningState;
              getCubeTRS(cubeData);
              course.cubeData = course.cubeData.concat(cubeData);
            });
          }
        })
        .catch((error) => {})
        .finally(() => setOpened(!opened));
    }
    else {
      setOpened(!opened);
    }
  };

  /*
  // 코스를 구성하는 렉쳐(큐브)들의 정보 가져오기
  const showCourseInfo = (course: BadgeCourseData) => {
    //
    course.isOpened = !course.isOpened;
    course.cubeData = [];

    if (course.isOpened) {
      coursePlanService!.findAllCoursePlanInfo(course.coursePlanId, course.serviceId)
        .then((response: CoursePlanCustomModel | null) => {
          if (response && response.lectureViews) {
            response.lectureViews.map((lecture: LectureViewModel) => {
              const cubeData = new BadgeCubeData();
              cubeData.cubeId = lecture.cubeId;
              cubeData.name = lecture.name;
              cubeData.learningCardId = lecture.learningCardId;
              cubeData.cubeType = lecture.cubeType;
              cubeData.learningTime = lecture.learningTime;
              // 진행율(%)
              cubeData.sumViewSeconds = lecture.sumViewSeconds === '' ? 0 : parseInt(lecture.sumViewSeconds);
              cubeData.learningState = lecture.learningState;
              getCubeTRS(cubeData);
              course.cubeData = course.cubeData.concat(cubeData);
            });
          }
        })
        .catch((error) => {})
        .finally(() => setOpened(!opened));
    }
    else {
      setOpened(!opened);
    }
  };
  */

  // Cube 상태 및 스타일 - PSJ
  const setLearningStateForMedia = (cube: BadgeCubeData) => {
    //
    // 버튼 스타일
    let styleName = 'black';
    switch( cube.learningState ) {
      case BadgeLectureState.Progress:
        styleName = 'orange';
        break;
      case BadgeLectureState.Passed:
        styleName = 'completed';
        break;
      default:
        break;
    }

    // 버튼 네임
    let stateName = '';
    if ( cube.learningState === null ) {
      if ( StateDefaultName[cube.cubeType as StateDefault] === undefined ) {
        stateName = StateDefaultName.Learning;  // 학습하기
      } else {
        stateName = StateDefaultName[cube.cubeType as StateDefault];
      }
    } else {
      stateName = BadgeLectureStateName[cube.learningState as BadgeLectureState];
    }

    return (
      <a href="#" className={classNames('btn-play', styleName)}>
        <span className="text">
          {stateName}{
            cube.learningState === BadgeLectureState.Progress && (cube.cubeType === CubeType.Video || cube.cubeType === CubeType.Audio) ?
              `(${cube.sumViewSeconds}%)` : ''
          }
        </span>

        { cube.learningState !== BadgeLectureState.Progress && (
          <Icon className={classNames( (cube.learningState !== BadgeLectureState.Waiting) ? `play-${styleName}24` : 'play-black24-dim' )} />
        )}

        { cube.learningState === BadgeLectureState.Progress && (cube.cubeType === CubeType.Video || cube.cubeType === CubeType.Audio) && (
          <span className={`pie-wrapper progress-${cube.sumViewSeconds}`}>
            <span className="pie">
              <span className="left-side"/>
              <span className="right-side"/>
            </span>
            <div className="shadow"/>
          </span>
        )}
      </a>
    );
  };


  return (
    <div className="course-cont">
      {badgeCompList.length > 0 ?
        badgeCompList.map((badgeComp: BadgeCompData, index: number) => (
          badgeComp.compType === 'COURSE' && badgeComp.course ?
            <div className={classNames('course-box', 'fn-parents', badgeComp.course.isOpened ? 'open' : '')} key={`course-box-${index}`}>
              <div className="bar">
                <div className="tit">
                  <span className="ellipsis">{badgeComp.course.name}</span>
                </div>
                <div className="num">
                  {badgeComp.course.cubeCount}개 강의 구성
                </div>
                <div className="toggle-btn">
                  <Button icon className="img-icon fn-more-toggle" onClick={() => showCourseInfo(badgeComp.course!)}>
                    <Icon className={classNames('s24', badgeComp.course.isOpened ? 'arrow-up' : 'arrow-down')}/>
                    <span className="blind">{badgeComp.course.isOpened ? 'open' : 'close'}</span>
                  </Button>
                </div>
              </div>
              <div className="detail">
                <ul className="step1">
                  {badgeComp.course.cubeData.length > 0 ?
                    badgeComp.course.cubeData.map((cube: BadgeCubeData, index: number) =>
                      <Fragment key={`cube-${index}`}>
                        <li>
                          <div className="tit">
                            <span className="ellipsis">{cube.name}</span>
                          </div>
                          <div className="right">
                            <span>{CubeTypeNameType[cube.cubeType as CubeType]}</span>
                            <span>{dateTimeHelper.timeToHourMinuteFormat(cube.learningTime)}</span>
                            {/*상태호출*/}
                            {setLearningStateForMedia(cube)}
                          </div>
                        </li>

                        { cube.test && (
                          <li className="step2 trs">
                            <div className="category">
                              <Icon className="icon-test24"/>
                              <span>Test</span>
                            </div>
                            <div className="tit">
                              <a className="ellipsis" href="#">{cube.test_name}</a>
                            </div>
                            <div className="right">
                              <a href="#" className="btn-play black">
                                <span className="text">평가응시</span>
                                <Icon className="icon play-black24"/>
                              </a>
                            </div>
                          </li>
                        )}
                        { cube.report && (
                          <li className="step2 trs">
                            <div className="category">
                              <Icon className="icon-report24"/>
                              <span>Test</span>
                            </div>
                            <div className="tit">
                              <a className="ellipsis" href="#">{cube.report_name}</a>
                            </div>
                            <div className="right">
                              <a href="#" className="btn-play black">
                                <span className="text">과제제출</span>
                                <Icon className="icon play-black24"/>
                              </a>
                            </div>
                          </li>
                        )}
                        { cube.survey && (
                          <li className="step2 trs">
                            <div className="category">
                              <Icon className="icon-survey24"/>
                              <span>Test</span>
                            </div>
                            <div className="tit">
                              <a className="ellipsis" href="#">{cube.survey_name}</a>
                            </div>
                            <div className="right">
                              <a href="#" className="btn-play black">
                                <span className="text">설문하기</span>
                                <Icon className="icon play-black24"/>
                              </a>
                            </div>
                          </li>
                        )}
                      </Fragment>
                    )
                    :
                    <div>코스 정보가 존재하지 않습니다.</div>
                  }
                  {badgeComp.course && badgeComp.course.test ?
                    <li className="step1 trs">
                      <div className="category">
                        <Icon className="icon-test24"/>
                        <span>Test</span>
                      </div>
                      <div className="tit">
                        <a className="ellipsis" href="#">{badgeComp.course.test_name}</a>
                      </div>
                      <div className="right">
                        <a href="#" className="btn-play black">
                          <span className="text">평가응시</span>
                          <Icon className="icon play-black24"/>
                        </a>
                      </div>
                    </li>
                    :
                    null
                  }
                  {badgeComp.course && badgeComp.course.report ?
                    <li className="step1 trs">
                      <div className="category">
                        <Icon className="icon-report24"/>
                        <span>Report</span>
                      </div>
                      <div className="tit">
                        <a className="ellipsis" href="#">{badgeComp.course.report_name}</a>
                      </div>
                      <div className="right">
                        <a href="#" className="btn-play black">
                          <span className="text">과제제출</span>
                          <Icon className="icon play-black24"/>
                        </a>
                      </div>
                    </li>
                    :
                    null
                  }
                  {badgeComp.course && badgeComp.course.survey ?
                    <li className="step1 trs">
                      <div className="category">
                        <Icon className="icon-survey24"/>
                        <span>Survey</span>
                      </div>
                      <div className="tit">
                        <a className="ellipsis" href="#">{badgeComp.course.survey_name}</a>
                      </div>
                      <div className="right">
                        <a href="#" className="btn-play black">
                          <span className="text">설문하기</span>
                          <Icon className="icon play-black24"/>
                        </a>
                      </div>
                    </li>
                    :
                    null
                  }
                </ul>
              </div>
            </div>
            :
            <Fragment key={`cube-${index}`}>
              {/*cube: cube-box > bar.typeA(학습) / bar.typeB(TRS)*/}
              <div className="cube-box">
                <div className="bar typeA">
                  <div className="tit">
                    <a href="#" className="ellipsis">{badgeComp.cube!.name}</a>
                  </div>
                  <div className="right">
                    <span>{CubeTypeNameType[badgeComp.cube!.cubeType as CubeType]}</span>
                    <span>{dateTimeHelper.timeToHourMinuteFormat(badgeComp.cube!.learningTime)}</span>
                    {setLearningStateForMedia(badgeComp.cube!)}
                  </div>
                </div>

                { badgeComp.cube && (badgeComp.cube.test || badgeComp.cube.report || badgeComp.cube.survey) ?
                  <>
                    { badgeComp.cube && badgeComp.cube.test && (
                      <div className="bar typeB">
                        <div className="category">
                          <Icon className="icon-test24"/>
                          <span>Test</span>
                        </div>
                        <div className="tit">
                          <a href="#" className="ellipsis">{badgeComp.cube.test_name}</a>
                        </div>
                        <div className="right">
                          <a href="#" className="btn-play black">
                            <span className="text">평가응시</span>
                            <Icon className="icon play-black24"/>
                          </a>
                        </div>
                      </div>
                    )}
                    { badgeComp.cube && badgeComp.cube.report && (
                      <div className="bar typeB">
                        <div className="category">
                          <Icon className="icon-report24"/>
                          <span>Report</span>
                        </div>
                        <div className="tit">
                          <a href="#" className="ellipsis">{badgeComp.cube.report_name}</a>
                        </div>
                        <div className="right">
                          <a href="#" className="btn-play black">
                            <span className="text">과제제출</span>
                            <Icon className="icon play-black24"/>
                          </a>
                        </div>
                      </div>
                    )}
                    { badgeComp.cube && badgeComp.cube.survey && (
                      <div className="bar typeB">
                        <div className="category">
                          <Icon className="icon-survey24"/>
                          <span>Report</span>
                        </div>
                        <div className="tit">
                          <a href="#" className="ellipsis">{badgeComp.cube.survey_name}</a>
                        </div>
                        <div className="right">
                          <a href="#" className="btn-play black">
                            <span className="text">설문하기</span>
                            <Icon className="icon play-black24"/>
                          </a>
                        </div>
                      </div>
                    )}
                  </>
                  :
                  null }
              </div>
            </Fragment>
        ))
        :
            <div>학습정보가 존재하지 않습니다.</div>
      }
    </div>
  );
};

export default inject(mobxHelper.injectFrom(
  'course.coursePlanService',
  'badgeDetail.badgeDetailService',
  'lecture.studentService',
))(withRouter(observer(BadgeLectureContainer)));

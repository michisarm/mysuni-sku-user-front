import React, {useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { mobxHelper } from '@nara.platform/accent';
import {Button, Icon} from 'semantic-ui-react';
import classNames from 'classnames';
import BadgeCompData from '../model/BadgeCompData';
import BadgeCompModel from '../model/BadgeCompModel';
import {BadgeDetailService} from '../../../lecture/stores';
import {Lecture2} from '../../../lecture/shared/Lecture';
import BadgeCubeData from '../model/BadgeCubeData';
import BadgeCourseData from '../model/BadgeCourseData';
import {LectureViewModel} from '../../../lecture/model';
import {CoursePlanContentsModel} from '../../../course/model';
import {PersonalCubeModel} from '../../../personalcube/personalcube/model';


interface Props extends RouteComponentProps {
  //
  badgeDetailService?: BadgeDetailService;

  badgeId: string;
}

const BadgeLectureContainer: React.FC<Props> = (Props) => {
  //
  const { badgeDetailService, badgeId, } = Props;

  const [badgeCompList, setBadgeCompList] = useState<BadgeCompData[]>([]);
  const [opened, setOpened] = useState(false);

  // const { viewObject, typeViewObject, onSaveCallback, skProfileService, lectureService, lectureCardId,
  //   match, onRefreshLearningState, courseLectureService, } = Props;

  // const { params } = match;
  // const { skProfile } = skProfileService!;
  // const { member } = skProfile;
  // const { lectureViews, getSubLectureViews } = lectureService!;
  // const { preLectureViews } = courseLectureService;

  useEffect(() => {
    // 배지 구성 학습 리스트 조회하기
    getBadgeCompLectures(badgeId);
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

  const showCourseInfo = (course: BadgeCourseData) => {
    //
    course.isOpened = !course.isOpened;
    course.cubeData = [];

    if (course.isOpened) {
      badgeDetailService!.findLectureViewsV2(course.coursePlanId, course.lectureCardIds)
        .then((response: LectureViewModel[] | null) => {
          if (response) {
            response.map((lecture: LectureViewModel) => {
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
          setOpened(!opened);
        });
    }
    else {
      setOpened(!opened);
    }
  };

  return (
    <div className="course-cont">
      {badgeCompList.length > 0 ?
        badgeCompList.map((badgeComp: BadgeCompData, index: number) => (
          badgeComp.compType === 'COURSE' && badgeComp.course ?
            <div className={classNames('course-box', 'fn-parents', badgeComp.course.isOpened ? 'open' : '')}>
              <div className="bar">
                <div className="tit">
                  <span className="ellipsis">{badgeComp.course.name}</span>
                </div>
                <div className="num">{badgeComp.course.cubeCount}개 강의 구성</div>
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
                    badgeComp.course.cubeData.map((cube: BadgeCubeData) =>
                      <>
                        <li>
                          <div className="tit">
                            <span className="ellipsis">{cube.name}</span>
                          </div>
                          <div className="right">
                            <span>{cube.cubeType}</span>
                            <span>{cube.learningTime}m</span>
                            <a href="#" className="btn-play black">
                              <span className="text">{cube.learningState}</span>
                              <Icon className="play-black24"/>
                            </a>
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
                      </>
                    )
                    :
                    null
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
                        <span>Test</span>
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
                        <span>Test</span>
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
            <div className="course-box fn-parents">
              <div className="cube-box">
                <div className="bar typeA">
                  <div className="tit">
                    <span className="ellipsis">{badgeComp.cube!.name}</span>
                  </div>
                  <div className="right">
                    <span>{badgeComp.cube!.cubeType}</span>
                    <span>{badgeComp.cube!.learningTime}m</span>

                    {/*setLearningStateForMedia 호출*/}
                    <a href="#" className="btn-play black">
                      <span className="text">{badgeComp.cube!.learningState}</span>
                      <Icon className="play-black24"/>
                    </a>
                  </div>
                </div>
              </div>
              { badgeComp.cube && (badgeComp.cube.test || badgeComp.cube.test || badgeComp.cube.test) ?
                <>
                  <div className="detail">
                    <ul className="step1">
                      { badgeComp.cube && badgeComp.cube.test && (
                        <li className="step1 trs">
                          <div className="category">
                            <Icon className="icon-test24"/>
                            <span>Test</span>
                          </div>
                          <div className="tit">
                            <a className="ellipsis" href="#">{badgeComp.cube.test_name}</a>
                          </div>
                          <div className="right">
                            <a href="#" className="btn-play black">
                              <span className="text">평가응시</span>
                              <Icon className="icon play-black24"/>
                            </a>
                          </div>
                        </li>
                      )}
                      { badgeComp.cube && badgeComp.cube.report && (
                        <li className="step1 trs">
                          <div className="category">
                            <Icon className="icon-report24"/>
                            <span>Test</span>
                          </div>
                          <div className="tit">
                            <a className="ellipsis" href="#">{badgeComp.cube.report_name}</a>
                          </div>
                          <div className="right">
                            <a href="#" className="btn-play black">
                              <span className="text">과제제출</span>
                              <Icon className="icon play-black24"/>
                            </a>
                          </div>
                        </li>
                      )}
                      { badgeComp.cube && badgeComp.cube.survey && (
                        <li className="step1 trs">
                          <div className="category">
                            <Icon className="icon-survey24"/>
                            <span>Test</span>
                          </div>
                          <div className="tit">
                            <a className="ellipsis" href="#">{badgeComp.cube.survey_name}</a>
                          </div>
                          <div className="right">
                            <a href="#" className="btn-play black">
                              <span className="text">설문하기</span>
                              <Icon className="icon play-black24"/>
                            </a>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                </>
                :
                null }
            </div>
        ))
        :
            <div>학습정보가 존재하지 않습니다.</div>
      }
    </div>
  );
};

export default inject(mobxHelper.injectFrom(
  'badgeDetail.badgeDetailService'
))(withRouter(observer(BadgeLectureContainer)));

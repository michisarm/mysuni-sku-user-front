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
import {CoursePlanService} from '../../../course/stores';
import {CoursePlanCustomModel} from '../../../course/model/CoursePlanCustomModel';
import BadgeLectureState from '../../ui/model/BadgeLectureState';
import BadgeLectureStateName from '../../ui/model/BadgeLectureStateName';
import TRSContainer from './TRSContainer';
import {CubeIntroModel} from '../../../personalcube/cubeintro/model';
import {PersonalCubeModel} from '../../../personalcube/personalcube/model';
import RollBookModel from '../../../lecture/model/RollBookModel';
import AnswerSheetModel from '../../../survey/answer/model/AnswerSheetModel';
import {SurveyFormModel} from '../../../survey/form/model/SurveyFormModel';
import {ExaminationModel} from '../../../assistant/exam/model/ExaminationModel';
import {ExamPaperModel} from '../../../assistant/paper/model/ExamPaperModel';
import lectureRoutePaths from '../../../lecture/routePaths';


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
  const { coursePlanService, badgeDetailService, badgeId, history, } = Props;

  const [badgeCompList, setBadgeCompList] = useState<BadgeCompData[]>([]);
  const [opened, setOpened] = useState(false);

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
          //console.log( data );
          // 공통
          compData.compType = data.serviceType;
          compData.id = data.id;
          compData.patronKeyString = data.patronKey.keyString;
          // 코스정보
          if (data.serviceType === 'COURSE') {
            compData.course = new BadgeCourseData();
            const keyStr = data.patronKey.keyString;
            compData.course.cineroomId = keyStr.substring(keyStr.indexOf('@') + 1);
            compData.course.collegeId = data.category.college.id;
            compData.course.serviceId = data.serviceId;
            compData.course.name = data.name;
            compData.course.coursePlanId = data.coursePlanId;
            compData.course.isOpened = false;
            compData.course.cubeCount = data.lectureCardUsids.length;
            compData.course.learningState = data.learningState;
            compData.course.serviceType = 'Course';
            data.lectureCardUsids.map((id: string) => {
              compData.course!.lectureCardIds = compData.course!.lectureCardIds.concat(id);
            });
          }
          // (학습)카드 정보
          else {
            compData.cube = new BadgeCubeData();
            const keyStr = data.patronKey.keyString;
            compData.cube.cineroomId = keyStr.substring(keyStr.indexOf('@') + 1);
            compData.cube.collegeId = data.category.college.id;
            compData.cube.lectureCardId = data.serviceId;
            compData.cube.name = data.name;
            compData.cube.cubeId = data.cubeId;
            compData.cube.learningCardId = data.learningCardId;
            compData.cube.cubeType = data.cubeType;
            compData.cube.learningTime = data.learningTime; // 학습시간(분)
            compData.cube.sumViewSeconds = data.sumViewSeconds; // 진행율(%)
            compData.cube.learningState = data.learningState;
            compData.cube.serviceType = 'cube';
          }
          compList = compList.concat(compData);
        });
      }
      setBadgeCompList(compList);
    });
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
              // 큐브 정보를 코스에 추가
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

  // 코스를 구성하는 렉쳐(큐브)들의 정보 한번에 가져오기
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
              const keyStr = lecture.cubeIntro!.patronKey.keyString;
              cubeData.cineroomId = keyStr.substring(keyStr.indexOf('@') + 1);
              cubeData.collegeId = lecture.personalCube!.category.college.id;
              cubeData.cubeId = lecture.cubeId;
              cubeData.lectureCardId = lecture.serviceId;
              cubeData.name = lecture.name;
              cubeData.learningCardId = lecture.learningCardId;
              // 학습하기 방식 결정
              cubeData.cubeType = lecture.cubeType;
              cubeData.learningTime = lecture.learningTime;
              // 진행율(%)
              cubeData.sumViewSeconds = lecture.sumViewSeconds === '' ? 0 : parseInt(lecture.sumViewSeconds);
              // 진행상태
              cubeData.learningState = lecture.learningState;

              cubeData.serviceType = 'cube';

              // 코스 내 큐브에만 해당
              cubeData.cubeIntro = new CubeIntroModel(lecture.cubeIntro);
              cubeData.personalCube = new PersonalCubeModel(lecture.personalCube);

              cubeData.rollBooks = [];
              lecture.rollBooks.map((rollBook: RollBookModel) => {
                cubeData.rollBooks = cubeData.rollBooks.concat(rollBook);
              });

              cubeData.answerSheet = new AnswerSheetModel(lecture.answerSheet);
              cubeData.surveyForm = new SurveyFormModel(lecture.surveyForm);

              cubeData.examination = new ExaminationModel(lecture.examination);
              cubeData.examPaper = new ExamPaperModel(lecture.examPaper);

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

  // 코스 페이지로 이동
  const moveToCoursePage = (course: BadgeCourseData, e: any) => {
    if (e) {
      e.preventDefault();
    }

    history.push(
      lectureRoutePaths.courseOverview(
        course.cineroomId,
        course.collegeId,
        course.coursePlanId,
        course.serviceType,
        course.serviceId
      )
    );
  };

  // 큐브 페이지로 이동
  const moveToCubePage = (cube: BadgeCubeData, e: any) => {
    if (e) {
      e.preventDefault();
    }

    history.push(
      lectureRoutePaths.lectureCardOverview(
        cube.cineroomId,
        cube.collegeId,
        cube.cubeId,
        cube.lectureCardId
      )
    );
  };

  // Cube 상태 및 스타일 - PSJ
  const setLearningStateForMedia = (cube: BadgeCubeData) => {
    //
    console.log( cube );

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
                  <a href="#" onClick={(e) => moveToCoursePage(badgeComp.course!, e)} className="ellipsis">{(index + 1) + '. ' + badgeComp.course!.name}</a>
                  {/*<span className="ellipsis">{(index + 1) + '. ' + badgeComp.course.name}</span>*/}
                </div>
                <div className="num">
                  {badgeComp.course.cubeCount}개 강의 구성
                  {badgeComp.course.learningState === BadgeLectureState.Passed && (
                    <span className="completed">{BadgeLectureStateName.Passed}</span>
                  )}
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
                    badgeComp.course.cubeData.map((cube: BadgeCubeData, index2: number) =>
                      <Fragment key={`cube-${index}`}>
                        <li>
                          <div className="tit">
                            <span className="ellipsis">{(index + 1) + '-' + (index2 + 1) + '. ' + cube.name}</span>
                          </div>
                          <div className="right">
                            <span>{CubeTypeNameType[cube.cubeType as CubeType]}</span>
                            <span>{dateTimeHelper.timeToHourMinuteFormat(cube.learningTime)}</span>
                            {/*상태호출*/}
                            {setLearningStateForMedia(cube)}
                          </div>
                        </li>
                        {/*subDepth: COURSE > CUBE TRS*/}
                        <TRSContainer parentType="COURSE" subDepth={true} badgeCourseCube={cube} />
                      </Fragment>
                    )
                    :
                    <div>코스 정보가 존재하지 않습니다.</div>
                  }
                  {/*subDepth: COURSE TRS*/}
                  {/*<TRSContainer parentType="COURSE" badgeCourse={badgeComp.course} />*/}
                </ul>
              </div>

            </div>
            :
            <Fragment key={`cube-${index}`}>
              {/*cube: cube-box > bar.typeA(학습) / bar.typeB(TRS)*/}
              <div className="cube-box">
                <div className="bar typeA">
                  <div className="tit">
                    {/*<a href="#" className="ellipsis">{(index + 1) + '. ' + badgeComp.cube!.name}</a>*/}
                    <a href="#" onClick={(e) => moveToCubePage(badgeComp.cube!, e)} className="ellipsis">{(index + 1) + '. ' + badgeComp.cube!.name}</a>
                  </div>
                  <div className="right">
                    <span>{CubeTypeNameType[badgeComp.cube!.cubeType as CubeType]}</span>
                    <span>{dateTimeHelper.timeToHourMinuteFormat(badgeComp.cube!.learningTime)}</span>
                    {setLearningStateForMedia(badgeComp.cube!)}
                  </div>
                </div>
                {/*<TRSContainer parentType="CUBE" badgeCube={badgeComp.cube!} />*/}
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

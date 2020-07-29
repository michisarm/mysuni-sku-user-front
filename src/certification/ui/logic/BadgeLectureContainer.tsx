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
import BadgeModel from '../model/MyBadgeModel';
import {Badge} from '../../shared/Badge';
import BadgeCubeData from '../model/BadgeCubeData';
import BadgeCourseData from '../model/BadgeCourseData';


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
  }, []);

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
          compData.name = data.name;
          // 코스정보
          if (data.serviceType === 'COURSE') {
            // 코스정보 생성
            compData.course = new BadgeCourseData();
            compData.course.coursePlanId = data.coursePlanId;
            compData.course.isOpened = false;
            compData.course.cubeCount = data.lectureCardUsids.length;
            data.lectureCardUsids.map((id: string) => {
              compData.course!.lectureCardIds = compData.course!.lectureCardIds.concat(id);
            });
          }
          // (학습)카드정보
          else {
            compData.cube = new BadgeCubeData();
            compData.cube.cubeId = data.cubeId;
            compData.cube.learningCardId = data.learningCardId;
            compData.cube.cubeType = data.cubeType;
            compData.cube.learningTime = data.learningTime; // 학습시간(분)
            compData.cube.sumViewSeconds = data.sumViewSeconds; // 진행율(%)
            compData.cube.learningState = data.learningState;
          }
          compList = compList.concat(compData);
        });
      }
      setBadgeCompList(compList);
    });
  };

  const showCourseInfo = (course: BadgeCourseData) => {
    course.isOpened = !course.isOpened;
    setOpened(!opened);
  };

  return (
    <Lecture2.Group
      type={Lecture2.GroupType.Course}
    >
      {badgeCompList.length > 0 ?
        (badgeCompList.map((badgeComp: BadgeCompData, index: number) => (
          badgeComp.compType === 'COURSE' && badgeComp.course ?
            <div className={classNames('course-box', 'fn-parents', badgeComp.course.isOpened ? 'open' : '')}>
              <div className="bar">
                <div className="tit">
                  <span className="ellipsis">{badgeComp.name}</span>
                </div>
                <div className="num">{badgeComp.course.cubeCount}개 강의 구성</div>
                <div className="toggle-btn">
                  <Button icon className="img-icon fn-more-toggle" onClick={() => showCourseInfo(badgeComp.course!)}>
                    <Icon className={classNames('s24', badgeComp.course.isOpened ? 'arrow-down' : 'arrow-up')}/>
                    <span className="blind">{badgeComp.course.isOpened ? 'open' : 'close'}</span>
                  </Button>
                </div>
              </div>
              {badgeComp.course.cubeCount > 0 ?
                <div className="detail">
                  <ul className="step1">
                    {badgeComp.course.cubeData.map((cube: BadgeCubeData, index: number) => (
                      <li>
                        <div className="tit">
                          <span className="ellipsis">{cube.name}</span>
                        </div>
                        <div className="right">
                          <span>{cube.cubeType}</span>
                          <span>{cube.learningTime}m</span>
                          <a href="#" className="btn-play black">
                            <span className="text">학습하기</span>
                            <Icon className="play-black24"/>
                          </a>
                        </div>
                      </li>


                    ))}
                  </ul>
                </div>
                :
                null}
            </div>
            :
            <div className="course-box fn-parents">
              <div className="cube-box">
                <div className="bar typeA">
                  <div className="tit">
                    <span className="ellipsis">{badgeComp.name}</span>
                  </div>
                  <div className="right">
                    <span>{badgeComp.cube!.cubeType}</span>
                    <span>{badgeComp.cube!.learningTime}m</span>

                    {/*setLearningStateForMedia 호출*/}
                    <a href="#" className="btn-play black">
                      <span className="text">학습하기</span>
                      <Icon className="play-black24"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        )))
        :
            <div>학습정보가 존재하지 않습니다.</div>
        }
    </Lecture2.Group>
  );
};

export default inject(mobxHelper.injectFrom(
  'badgeDetail.badgeDetailService'
))(withRouter(observer(BadgeLectureContainer)));

import React, {useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { mobxHelper } from '@nara.platform/accent';
import BadgeCompData from '../model/BadgeCompData';
import BadgeCompModel from '../model/BadgeCompModel';
import {BadgeDetailService} from '../../../lecture/stores';


interface Props extends RouteComponentProps {
  //
  badgeDetailService?: BadgeDetailService;

  badgeId: string;
}

const BadgeLectureContainer: React.FC<Props> = (Props) => {
  //
  const { badgeDetailService, badgeId, } = Props;

  const [badgeCompList, setBadgeCompList] = useState<BadgeCompData[]>([]);

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
            compData.coursePlanId = data.coursePlanId;
            compData.cubeCount = data.lectureCardUsids.length;
            data.lectureCardUsids.map((id: string) => {
              compData.lectureCardIds = compData.lectureCardIds.concat(id);
            });
          }
          // (학습)카드정보
          else {
            compData.cubeId = data.cubeId;
            compData.learningCardId = data.learningCardId;
            compData.cubeType = data.cubeType;
            compData.learningTime = data.learningTime; // 학습시간(분)
            compData.sumViewSeconds = data.sumViewSeconds; // 진행율(%)
            compData.learningState = data.learningState;
          }
          compList = compList.concat(compData);
        });
      }
      setBadgeCompList(compList);
    });
  };

  return (
    <div className="course-cont">
      { badgeCompList && badgeCompList.length > 0 ? (
        <div>학습정보 표시</div>
      ) : (
        <div>학습정보가 존재하지 않습니다.</div>
      )}
    </div>

  // <>
  //   {/*Course 콘텐츠 총 09개 강의 구성 => Badge 상세에는 필요 없음*/}
  //   <Lecture2.Group
  //     type={Lecture2.GroupType.Course}
  //   >
  //
  //   {/*course-box, fn-parents, open*/}
  //   {/*<Lecture2.CourseSection*/}
  //   {/*lecture={(*/}
  //   {/*// cube-box or bar step1 결정*/}
  //   {/*<Lecture2.Course/>*/}
  //   {/*)}*/}
  //   {/*>*/}
  //   {/*123*/}
  //   {/*</Lecture2.CourseSection>*/}
  //
  //   {/*Cube*/}
  //   <div className="course-box fn-parents">
  //     <div className="cube-box">
  //       <div className="bar typeA">
  //         <div className="tit">
  //           <span className="ellipsis">0. CUBE</span>
  //         </div>
  //         <div className="right">
  //           <span>Video</span>
  //           <span>10m</span>
  //
  //           {/*setLearningStateForMedia 호출*/}
  //           <a href="#" className="btn-play black">
  //             <span className="text">학습하기</span>
  //             <Icon className="play-black24"/>
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //
  //
  //   {/*Course*/}
  //   <div className="course-box fn-parents open">
  //     <div className="bar">
  //       <div className="tit">
  //         <span className="ellipsis">1. COURSE-1</span>
  //       </div>
  //       <div className="num">03개 강의 구성</div>
  //       <div className="toggle-btn">
  //         <Button icon className="img-icon fn-more-toggle">
  //           <Icon className="arrow-down s24"/>
  //           <span className="blind">open</span>
  //         </Button>
  //       </div>
  //     </div>
  //
  //     <div className="detail">
  //       <ul className="step1">
  //         <li>
  //           <div className="tit">
  //             <span className="ellipsis">1.1 COURSE-1 &gt; CUBE-1</span>
  //           </div>
  //           <div className="right">
  //             <span>Document</span>
  //             <span>30m</span>
  //             <a href="#" className="btn-play black">
  //               <span className="text">학습하기</span>
  //               <Icon className="play-black24"/>
  //             </a>
  //           </div>
  //         </li>
  //
  //         <li>
  //           <div className="tit">
  //             <span className="ellipsis">1.2 COURSE-1 &gt; CUBE-2</span>
  //           </div>
  //           <div className="right">
  //             <span>Video</span>
  //             <span>30m</span>
  //             <a href="#" className="btn-play black">
  //               <span className="text">학습하기</span>
  //               <Icon className="play-black24"/>
  //             </a>
  //           </div>
  //         </li>
  //
  //         {/*Test, Report, Survey - step2*/}
  //         <li className="step2 trs">
  //           <div className="category">
  //             <Icon className="icon-test24" />
  //             <span>Test</span>
  //           </div>
  //           <div className="tit">
  //             <a className="ellipsis" href="#">1.2 CUBE-2 Test</a>
  //           </div>
  //           <div className="right">
  //             <a href="#" className="btn-play black">
  //               <span className="text">평가응시</span>
  //               <Icon className="icon play-black24"/>
  //             </a>
  //           </div>
  //         </li>
  //         <li className="step2 trs">
  //           <div className="category">
  //             <Icon className="icon-report24" />
  //             <span>Report</span>
  //           </div>
  //           <div className="tit">
  //             <a className="ellipsis" href="#">1.2 CUBE-2 Report</a>
  //           </div>
  //           <div className="right">
  //             <a href="#" className="btn-play black">
  //               <span className="text">과제제출</span>
  //               <Icon className="icon play-black24"/>
  //             </a>
  //           </div>
  //         </li>
  //         <li className="step2 trs">
  //           <div className="category">
  //             <Icon className="icon-survey24" />
  //             <span>Survey</span>
  //           </div>
  //           <div className="tit">
  //             <a className="ellipsis" href="#">1.2 CUBE-2 Survey</a>
  //           </div>
  //           <div className="right">
  //             <a href="#" className="btn-play black">
  //               <span className="text">설문하기</span>
  //               <Icon className="icon play-black24"/>
  //             </a>
  //           </div>
  //         </li>
  //         {/********************/}
  //
  //         <li>
  //           <div className="tit">
  //             <span className="ellipsis">1.3 COURSE-1 &gt; CUBE-3</span>
  //           </div>
  //           <div className="right">
  //             <span>Video</span>
  //             <span>1h 30m</span>
  //             <a href="#" className="btn-play black">
  //               <span className="text">학습하기</span>
  //               <Icon className="play-black24"/>
  //             </a>
  //           </div>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  //
  //   <div className="course-box fn-parents">
  //     <div className="bar">
  //       <div className="tit">
  //         <span className="ellipsis">2. COURSE-2</span>
  //       </div>
  //       <div className="num">01개 강의 구성</div>
  //       <div className="toggle-btn">
  //         <Button icon className="img-icon fn-more-toggle">
  //           <Icon className="arrow-down s24"/>
  //           <span className="blind">open</span>
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  //
  //   <div className="course-box fn-parents">
  //     <div className="bar">
  //       <div className="tit">
  //         <span className="ellipsis">3. COURSE-3</span>
  //       </div>
  //       <div className="num">01개 강의 구성</div>
  //       <div className="toggle-btn">
  //         <Button icon className="img-icon fn-more-toggle">
  //           <Icon className="arrow-down s24"/>
  //           <span className="blind">open</span>
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  //
  // </Lecture2.Group>
  // </>
  );
};

export default inject(mobxHelper.injectFrom(
  'badgeDetail.badgeDetailService'
))(withRouter(observer(BadgeLectureContainer)));

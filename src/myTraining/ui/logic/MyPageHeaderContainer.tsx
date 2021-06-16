import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import moment from 'moment';
import { ContentHeader } from '../../../shared';
import ContentHeaderBadgeView from '../view/ContentHeaderBadgeView';
import ContentHeaderStampView from '../view/ContentHeaderStampView';
import { SkProfileService } from '../../../profile/stores';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';
import MyTrainingService from '../../present/logic/MyTrainingService';
import { BadgeService } from '../../../lecture/stores';
import badgePaths from '../../../certification/routePaths';
import myTrainingPaths from '../../routePaths';
import lecturePaths from '../../../lecture/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { useRequestLearningSummary } from '../../service/useRequestLearningSummary';
import { Area } from 'tracker/model';

interface MyPageHeaderContainerProps {
  skProfileService?: SkProfileService;
  myLearningSummaryService?: MyLearningSummaryService;
  myTrainingService?: MyTrainingService;
  badgeService?: BadgeService;
}

function MyPageHeaderContainer({
  skProfileService,
  myLearningSummaryService,
  myTrainingService,
  badgeService,
}: MyPageHeaderContainerProps) {
  const { skProfile } = skProfileService!;
  const { myLearningSummary, lectureTimeSummary } = myLearningSummaryService!;
  const { myStampCount } = myTrainingService!;
  const {
    allBadgeCount: { issuedCount },
  } = badgeService!;

  const history = useHistory();
  const currentYear = moment().year();

  const sumOfCurrentYearLectureTime =
    (lectureTimeSummary && lectureTimeSummary.sumOfCurrentYearLectureTime) || 0;
  const totalLectureTime =
    (lectureTimeSummary && lectureTimeSummary.totalLectureTime) || 0;

  const totalLearningTime =
    myLearningSummary.suniLearningTime +
    myLearningSummary.myCompanyLearningTime +
    myLearningSummary.aplAllowTime +
    sumOfCurrentYearLectureTime;
  const totalAccrueLearningTime =
    myLearningSummary.totalSuniLearningTime +
    myLearningSummary.totalMyCompanyLearningTime +
    myLearningSummary.totalAplAllowTime +
    totalLectureTime;

  useEffect(() => {
    badgeService!.findAllBadgeCount();
    myTrainingService!.countMyTrainingsWithStamp();
  }, []);

  useRequestLearningSummary();

  const onClickMyBadge = useCallback(() => {
    history.push(myTrainingPaths.myPageEarnedBadgeList());
  }, []);

  const onClickMyStamp = useCallback(() => {
    history.push(myTrainingPaths.myPageEarnedStampList());
  }, []);

  const onClickRecommend = useCallback(() => {
    history.push(lecturePaths.recommend());
  }, []);

  return (
    // 요청사항으로 관심 Channel 주석처리
    // <ContentHeader
    //   bottom={isFromMyPage(contentType) && <FavoriteChannelContainer />}
    // >
    <ContentHeader
      dataArea={
        window.location.pathname.includes('/my-page/')
          ? Area.MYPAGE_INFO
          : Area.LEARNING_INFO
      }
      type="Learning"
    >
      <ContentHeader.Cell inner className="personal-inner">
        <ContentHeader.ProfileItem
          myPageActive={false}
          imageEditable={true}
          image={skProfile.photoFilePath || profileImg}
          name={skProfile.profileViewName}
          company={skProfile.member.company}
          department={skProfile.member.department}
          type="Learning"
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeaderBadgeView
          badgeCount={issuedCount}
          onClickItem={onClickMyBadge}
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeaderStampView
          stampCount={myStampCount}
          onClickItem={onClickMyStamp}
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell inner>
        {(totalLearningTime !== 0 && (
          <ContentHeader.LearningTimeItem
            minute={totalLearningTime}
            year={currentYear}
            accrueMinute={totalAccrueLearningTime}
          />
        )) || (
          <ContentHeader.WaitingItem
            year={currentYear}
            onClickRecommend={onClickRecommend}
          />
        )}
      </ContentHeader.Cell>
    </ContentHeader>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myLearningSummaryService',
    'myTraining.myTrainingService',
    'badge.badgeService'
  )
)(observer(MyPageHeaderContainer));

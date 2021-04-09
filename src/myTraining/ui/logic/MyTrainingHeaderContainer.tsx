import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import moment from 'moment';
import { SkProfileService } from '../../../profile/stores';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';
import MyTrainingService from '../../present/logic/MyTrainingService';
import { BadgeService } from '../../../lecture/stores';
import { ContentHeader } from '../../../shared';
import ContentHeaderBadgeView from '../view/ContentHeaderBadgeView';
import ContentHeaderStampView from '../view/ContentHeaderStampView';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import badgePaths from '../../../certification/routePaths';
import myTrainingPaths from '../../routePaths';
import lecturePaths from '../../../lecture/routePaths';
import { useRequestLearningSummaryCurrentYear } from '../../service/useRequestLearningSummaryCurrentYear';


interface MyTrainingHeaderContainerProps {
  skProfileService?: SkProfileService;
  myLearningSummaryService?: MyLearningSummaryService;
  myTrainingService?: MyTrainingService;
  badgeService?: BadgeService;
}

function MyTrainingHeaderContainer({
  skProfileService,
  myLearningSummaryService,
  myTrainingService,
  badgeService,
}: MyTrainingHeaderContainerProps) {
  const { skProfile } = skProfileService!;
  const { myLearningSummary } = myLearningSummaryService!;
  const { myStampCount, thisYearMyStampCount } = myTrainingService!;
  const { allBadgeCount: { issuedCount } } = badgeService!;

  const history = useHistory();
  const currentYear = moment().year();

  useEffect(() => {
    if (myStampCount === 0 && issuedCount === 0 && thisYearMyStampCount === 0) {
      badgeService!.findAllBadgeCount();
      myTrainingService!.countMyTrainingsWithStamp();
      myTrainingService!.countMyTrainingsWithStamp([],moment([currentYear,1-1,1]).toDate().getTime(),moment([currentYear,12-1,31]).toDate().getTime());
    }
  }, []);

  useRequestLearningSummaryCurrentYear();

  const onClickMyBadge = useCallback(() => {
    history.push(badgePaths.badgeEarnedBadgeList());
  }, []);

  const onClickMyStamp = useCallback(() => {
    history.push(myTrainingPaths.myPageEarnedStampList());
  }, []);

  const routeToRecommend = useCallback(() => {
    history.push(lecturePaths.recommend());
  }, []);

  return (
    // 요청사항으로 관심 Channel 주석처리
    // <ContentHeader
    //   bottom={isFromMyPage(contentType) && <FavoriteChannelContainer />}
    // >
    <ContentHeader type="Learning">
      <ContentHeader.Cell inner className="personal-inner">
          <ContentHeader.ProfileItem
            myPageActive={true}
            imageEditable={false}
            image={skProfile.photoFilePath || profileImg}
            name={skProfile.member.name}
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
          thisYearStampCount={thisYearMyStampCount}
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell inner>
        {myLearningSummary.displayTotalLearningTime !== 0 &&
          (
            <ContentHeader.LearningTimeItem
              minute={myLearningSummary.displayTotalLearningTime}
              year={currentYear}
              accrueMinute={myLearningSummary.displayAccrueTotalLearningTime}
            />
          ) ||
          (
            <ContentHeader.WaitingItem
              year={currentYear}
              onClickRecommend={routeToRecommend}
            />
          )}
        {/* DropDown 포지션 변경으로 인한 부모컨테이너 변경 */}
        {/* DropDown options 프롭스는 퍼블리싱 테스트를 위해 임의의 데이터로 다시 변경. */}
        {/*<div className="year">
          <Dropdown
            className="inline tight"
            value={selectedYear}
            onChange={onChangeYear}
            options={getYearOptions()}
          />
          </div>*/}
      </ContentHeader.Cell>
    </ContentHeader>
  );
}

export default inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.myLearningSummaryService',
  'myTraining.myTrainingService',
  'badge.badgeService'
))(observer(MyTrainingHeaderContainer));
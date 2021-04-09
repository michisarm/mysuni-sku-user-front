import React, { useEffect, useState, useCallback, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import moment from 'moment';
import { SkProfileService } from 'profile/stores';
import { MyLearningSummaryService, MyTrainingService } from 'myTraining/stores';
import { BadgeService } from 'lecture/stores';
import badgeRoutePaths from 'certification/routePaths';
import myTrainingRoutePaths from 'myTraining/routePaths';
import lectureRoutePaths from 'lecture/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { ContentHeader } from 'shared';
import ContentHeaderStampView from '../view/ContentHeaderStampView';
import ContentHeaderBadgeView from '../view/ContentHeaderBadgeView';
import { MyPageContentType } from '../model/MyPageContentType';
import { MyContentType } from '../model/MyContentType';

interface Props extends RouteComponentProps {
  contentType: MyContentType;
  skProfileService?: SkProfileService;
  myLearningSummaryService?: MyLearningSummaryService;
  badgeService?: BadgeService;
  myTrainingService?: MyTrainingService;
}

function MyContentHeaderContainer(props: Props) {
  const { contentType, skProfileService, myLearningSummaryService, badgeService, myTrainingService, history } = props;
  const { skProfile } = skProfileService!;
  const { myLearningSummary } = myLearningSummaryService!;
  const { myStampCount, thisYearMyStampCount } = myTrainingService!;
  const { allBadgeCount: { issuedCount: myBadgeCount } } = badgeService!;

  /* states */
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);

  /* effects */
  useEffect(() => {
    if (myStampCount === 0 && myBadgeCount === 0 && thisYearMyStampCount === 0) {
      badgeService!.findAllBadgeCount();
      myTrainingService!.countMyTrainingsWithStamp();
      myTrainingService!.countMyTrainingsWithStamp([],moment([selectedYear,1-1,1]).toDate().getTime(),moment([selectedYear,12-1,31]).toDate().getTime());
    }
  }, []);

  useEffect(() => {
    myLearningSummaryService!.findMyLearningSummaryByYear(selectedYear);
  }, [selectedYear]);


  /* handlers */
  const onChangeYear = useCallback((e: any, data: any) => {
    setSelectedYear(data.value);
  }, []);

  const onClickMyBadge = useCallback(() => {
    history.push(badgeRoutePaths.badgeEarnedBadgeList());
  }, []);

  const onClickMyStamp = useCallback(() => {
    history.push(myTrainingRoutePaths.myPageEarnedStampList());
  }, []);

  const routeToRecommend = useCallback(() => {
    history.push(lectureRoutePaths.recommend());
  }, []);

  /* functions */
  const isFromMyPage = (contentType: MyContentType) => {
    return contentType === MyPageContentType.EarnedBadgeList;
  };

  return (
    <ContentHeader type="Learning">
      <ContentHeader.Cell inner className="personal-inner">
          <ContentHeader.ProfileItem
            myPageActive={!isFromMyPage(contentType)}
            imageEditable={isFromMyPage(contentType)}
            image={skProfile.photoFilePath || profileImg}
            name={skProfile.member.name}
            company={skProfile.member.company}
            department={skProfile.member.department}
            type="Learning"
          />
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeaderBadgeView
          badgeCount={myBadgeCount}
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
              year={selectedYear}
              accrueMinute={myLearningSummary.displayAccrueTotalLearningTime}
            />
          ) ||
          (
            <ContentHeader.WaitingItem
              year={selectedYear}
              onClickRecommend={routeToRecommend}
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
)(withRouter(observer(MyContentHeaderContainer)));

/* globals */
const CURRENT_YEAR = moment().year();
const START_YEAR = 2020;

const getYearOptions = () => {
  const yearOptions = [];
  const diff = CURRENT_YEAR - START_YEAR;

  for (let i = 0; i <= diff; i++) {
    const year = CURRENT_YEAR - i;
    const yearText = year.toString();

    yearOptions.push({ key: i, text: yearText, value: year });
  }

  return yearOptions;
};

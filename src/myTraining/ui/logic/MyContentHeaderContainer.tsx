import React, { useEffect, useState, useCallback, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import moment from 'moment';
import { SkProfileService } from 'profile/stores';
import { MyLearningSummaryService } from 'myTraining/stores';
import badgeRoutePaths from 'certification/routePaths';
import myTrainingRoutePaths from 'myTraining/routePaths';
import lectureRoutePaths from 'lecture/routePaths';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { ContentHeader } from 'shared';
import { MyContentType } from './MyLearningListContainerV2';
import FavoriteChannelContainer from './FavoriteChannelContainer';
import ContentHeaderStampView from '../view/ContentHeaderStampView';
import ContentHeaderBadgeView from '../view/ContentHeaderBadgeView';
import { MyLearningContentType, MyPageContentType } from '../model';

/*
  1. contentType ( 어떤 페이지에서 해당 컴포넌트가 사용되고 있는지 확인하고 조건을 분기하기 위함. 2020.10.28 by 김동구 )
    1-1. MyLearningContentType.InProgress => MyLearningPage
    1-2. MyPageContentType.EarnedBadgeList  => MyPagePage
*/
interface Props extends RouteComponentProps {
  contentType: MyContentType;
  skProfileService?: SkProfileService;
  myLearningSummaryService?: MyLearningSummaryService;
}

function MyContentHeaderContainer(props: Props) {

  console.log('MyContentHeaderContainer :: render :: ');
  const { contentType, skProfileService, myLearningSummaryService, history } = props;
  const { skProfile } = skProfileService!;
  const { myLearningSummary } = myLearningSummaryService!;

  /* states */
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);

  /* effects */
  useEffect(() => {
    myLearningSummaryService!.findMyLearningSummaryYear(selectedYear);
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

  /* render */
  return (
    <ContentHeader
      bottom={isFromMyPage(contentType) && (<FavoriteChannelContainer />)}
    >
      <ContentHeader.Cell inner>
        <ContentHeader.ProfileItem
          myPageActive={!isFromMyPage(contentType)}
          imageEditable={isFromMyPage(contentType)}
          image={skProfile.photoFilePath || profileImg}
          name={skProfile.member.name}
          company={skProfile.member.company}
          department={skProfile.member.department}
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell inner>
        {myLearningSummary.totalLearningTime !== 0 &&
          (
            <ContentHeader.LearningTimeItem
              minute={myLearningSummary.totalLearningTime}
            />
          ) ||
          (
            <ContentHeader.WaitingItem
              onClick={routeToRecommend}
            />
          )
        }
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeaderBadgeView
          badgeCount={myLearningSummary.achieveBadgeCount}
          onClickItem={onClickMyBadge}
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeaderStampView
          stampCount={myLearningSummary.acheiveStampCount}
          selectedYear={selectedYear}
          yearOptions={[{ key: 0, text: '2021', value: 2021 }, { key: 1, text: '2020', value: 2020 }]}
          onChangeYear={onChangeYear}
          onClickItem={onClickMyStamp}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
}

export default inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.myLearningSummaryService'
))(withRouter(observer(MyContentHeaderContainer)));

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
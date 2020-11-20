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
import { MyContentType } from './MyLearningListContainerV2';
import FavoriteChannelContainer from './FavoriteChannelContainer';
import ContentHeaderStampView from '../view/ContentHeaderStampView';
import ContentHeaderBadgeView from '../view/ContentHeaderBadgeView';
import { MyPageContentType } from '../model';
import { Dropdown } from 'semantic-ui-react';


/*
  1. contentType ( 어떤 페이지에서 해당 컴포넌트가 사용되고 있는지 확인하고 조건을 분기하기 위함. 2020.10.28 by 김동구 )
    1-1. MyLearningContentType.InProgress => MyLearningPage
    1-2. MyPageContentType.EarnedBadgeList  => MyPagePage
*/
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
  const { myStampCount } = myTrainingService!;
  const { earnedCount: myBadgeCount } = badgeService!;

  /* states */
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);

  /* effects */
  useEffect(() => {
    if (myStampCount === 0 && myBadgeCount === 0) {
      badgeService!.getCountOfBadges();
      myTrainingService!.countMyTrainingsWithStamp();
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

  /* render */
  return (
    <ContentHeader
      bottom={isFromMyPage(contentType) && <FavoriteChannelContainer />}
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
        {myLearningSummary.displayTotalLearningTime !== 0 &&
          (
            <ContentHeader.LearningTimeItem
              minute={myLearningSummary.displayTotalLearningTime}
              year={selectedYear}
            />
          ) ||
          (
            <ContentHeader.WaitingItem
              year={selectedYear}
              onClickRecommend={routeToRecommend}
            />
          )}
        {/* DropDown 포지션 변경으로 인한 부모컨테이너 변경 */}
        {/* DropDown options 프롭스는 퍼블리싱 테스트를 위해 임의의 데이터로 다시 변경. */}
        <div className="year">
          <Dropdown
            className="inline tight"
            value={selectedYear}
            onChange={onChangeYear}
            options={[
              { key: 0, text: '2021', value: 2021 },
              { key: 1, text: '2020', value: 2020 },
            ]}
          />
        </div>
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeaderStampView
          stampCount={myStampCount}
          onClickItem={onClickMyStamp}
        />
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeaderBadgeView
          badgeCount={myBadgeCount}
          onClickItem={onClickMyBadge}
        />
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

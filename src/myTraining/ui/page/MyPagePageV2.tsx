
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { BadgeService } from 'lecture/stores';
import { MyLearningSummaryService } from 'myTraining/stores';
import routePaths from 'myTraining/routePaths';
import { ContentLayout, TabItemModel } from 'shared';
import Tab from 'shared/components/Tab';
import EarnedBadgeListContainer from 'certification/ui/logic/EarnedBadgeListContainer';
import { MyPageContentType, MyPageContentTypeName } from '../model';
import MyPageContentHeaderContainer from '../logic/MyPageContentHeaderContainer';
import MyLearningListContainerV2 from '../logic/MyLearningListContainerV2';

interface Props extends RouteComponentProps<RouteParams> {
  badgeService?: BadgeService;
  myLearningSummaryService?: MyLearningSummaryService;
}

interface RouteParams {
  tab: string,
  pageNo?: string
}

function MyPagePageV2(props: Props) {
  const { badgeService, myLearningSummaryService, history, match } = props;
  const { earnedCount } = badgeService!;
  const { myLearningSummary: { acheiveStampCount } } = myLearningSummaryService!;
  const currentTab = match.params.tab;

  /* states */
  const [myBadgeCount, setMyBadgeCount] = useState<number>(0);

  /* effects */
  useEffect(() => {
    fetchAllTabCounts();
  }, []);

  /* functions */
  const fetchAllTabCounts = async () => {
    await badgeService!.getCountOfBadges(); // get myBadgeCount
    setMyBadgeCount(earnedCount);
  };

  const getTabs = (): TabItemModel[] => {
    return [
      {
        name: MyPageContentType.EarnedBadgeList,
        item: getTabItem(MyPageContentType.EarnedBadgeList, myBadgeCount),
        render: () => <EarnedBadgeListContainer badgeCount={myBadgeCount} />
      },
      {
        name: MyPageContentType.EarnedStampList,
        item: getTabItem(MyPageContentType.EarnedStampList, acheiveStampCount),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />
      }
    ] as TabItemModel[];
  };

  const getTabItem = (contentType: MyPageContentType, count: number) => {
    return (
      <>
        {MyPageContentTypeName[contentType]}
        <span className="count">+{count > 0 && count || 0}</span>
      </>
    );
  };

  const onChangeTab = (tab: TabItemModel): string => {
    history.push(routePaths.myPageTab(tab.name));
    return routePaths.myPageTab(tab.name);
  };

  return (
    <ContentLayout
      className="MyPage"
      breadcrumb={
        [
          { text: 'My Page' },
          { text: getContentNameFromTab(currentTab) }
        ]
      }
    >
      <MyPageContentHeaderContainer />
      <Tab
        tabs={getTabs()}
        defaultActiveName={currentTab}
        onChangeTab={onChangeTab}
      />
    </ContentLayout>
  );
}

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
  'myTraining.myLearningSummaryService'
))(withRouter(observer(MyPagePageV2)));

/* globals */
const convertTabToContentType = (tab: string) => {
  return MyPageContentType[tab as MyPageContentType];
};

const getContentNameFromTab = (tab: string) => {
  return MyPageContentTypeName[tab as MyPageContentType];
};
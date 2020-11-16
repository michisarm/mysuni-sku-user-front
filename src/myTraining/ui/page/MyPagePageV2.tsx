
import React, { useEffect, useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { MyLearningSummaryService } from 'myTraining/stores';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { ContentLayout, TabItemModel } from 'shared';
import Tab from 'shared/components/Tab';
import EarnedBadgeListContainer from 'certification/ui/logic/EarnedBadgeListContainer';
import { MyPageContentType, MyPageContentTypeName } from '../model';
import MyContentHeaderContainer from '../logic/MyContentHeaderContainer';
import MyLearningListContainerV2 from '../logic/MyLearningListContainerV2';


interface Props extends RouteComponentProps<RouteParams> {
  myLearningSummaryService?: MyLearningSummaryService;
}

interface RouteParams {
  tab: string;
  pageNo?: string;
}

function MyPagePageV2(props: Props) {
  const { myLearningSummaryService, history, match } = props;
  const { totalMyLearningSummary: { achieveBadgeCount, acheiveStampCount } } = myLearningSummaryService!;
  const currentTab = match.params.tab;


  useEffect(() => {
    /* 탭의 뱃지 & 스탬프 카운트 호출. */
    if (acheiveStampCount === 0 && achieveBadgeCount === 0) {
      myLearningSummaryService!.findTotalMyLearningSummary();
    }
  }, []);

  const getTabs = (): TabItemModel[] => {
    return [
      {
        name: MyPageContentType.EarnedBadgeList,
        item: getTabItem(MyPageContentType.EarnedBadgeList, achieveBadgeCount),
        render: () => <EarnedBadgeListContainer />
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

  /* handlers */
  const onChangeTab = useCallback((tab: TabItemModel): string => {
    history.push(myTrainingRoutePaths.myPageTab(tab.name));
    return myTrainingRoutePaths.myPageTab(tab.name);
  }, []);

  /* render */
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
      <MyContentHeaderContainer
        contentType={MyPageContentType.EarnedBadgeList}
      />
      <Tab
        tabs={getTabs()}
        defaultActiveName={currentTab}
        onChangeTab={onChangeTab}
      />
    </ContentLayout>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.myLearningSummaryService'
))(withRouter(observer(MyPagePageV2)));

/* globals */
const convertTabToContentType = (tab: string) => {
  return MyPageContentType[tab as MyPageContentType];
};

const getContentNameFromTab = (tab: string) => {
  return MyPageContentTypeName[tab as MyPageContentType];
};
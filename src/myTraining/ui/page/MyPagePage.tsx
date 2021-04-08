
import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { MyTrainingService } from 'myTraining/stores';
import { BadgeService } from 'lecture/stores';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { ContentLayout, TabItemModel } from 'shared';
import Tab from 'shared/components/Tab';
import MyBadgeListContainer from '../../../certification/ui/logic/MyBadgeListContainer';
import { MyPageRouteParams } from '../../model/MyPageRouteParams';
import MyPageHeaderContainer from '../logic/MyPageHeaderContainer';
import { MyPageContentType, MyPageContentTypeName } from '../model/MyPageContentType';
import MyTrainingListContainer from '../logic/MyTrainingListContainer';


interface MyPagePageProps {
  myTrainingService?: MyTrainingService;
  badgeService?: BadgeService;
}


function MyPagePage({
  myTrainingService,
  badgeService,
}: MyPagePageProps) {
  const { myStampCount } = myTrainingService!;
  const { allBadgeCount: { issuedCount } } = badgeService!;
  
  const history = useHistory();
  const params = useParams<MyPageRouteParams>();

  const getTabs = (): TabItemModel[] => {
    return [
      {
        name: MyPageContentType.EarnedBadgeList,
        item: getTabItem(MyPageContentType.EarnedBadgeList, issuedCount),
        render: () => <MyBadgeListContainer />
      },
      {
        name: MyPageContentType.EarnedStampList,
        item: getTabItem(MyPageContentType.EarnedStampList, myStampCount),
        render: () => <MyTrainingListContainer contentType={params.tab} />
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
          { text: MyPageContentTypeName[params.tab] }
        ]
      }
    >
      <MyPageHeaderContainer />
      <Tab
        tabs={getTabs()}
        defaultActiveName={params.tab}
        onChangeTab={onChangeTab}
      />
    </ContentLayout>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService',
  'badge.badgeService'
))(observer(MyPagePage));
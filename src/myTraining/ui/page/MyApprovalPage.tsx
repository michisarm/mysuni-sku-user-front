
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import Tab, { TabItemModel } from 'shared/components/Tab';
import { ApprovalCubeService } from 'myTraining/stores';
import routePaths from '../../routePaths';
import MyApprovalContentType from '../model/MyApprovalContentType';
import MyApprovalContentTypeName from '../model/MyApprovalContentTypeName';
import MyApprovalListContainer from '../logic/MyApprovalListContainer';
import MyApprovalContentHeader from '../view/MyApprovalContentHeader';

interface Props extends RouteComponentProps<RouteParams> {
  approvalCubeService?: ApprovalCubeService;
}

interface RouteParams {
  tab: string;
  pageNo?: string;
}

function MyApprovalPage(props: Props) {
  const { approvalCubeService, history, match } = props;
  const { approvalCubeOffsetList: { totalCount } } = approvalCubeService!;
  const currentTab = match.params.tab;

  /* functions */
  const getTabs = (): TabItemModel[] => {
    return [
      {
        name: MyApprovalContentType.ApprovalList,
        item: getTabItem(MyApprovalContentType.ApprovalList, totalCount),
        render: () => <MyApprovalListContainer />
      }
    ];
  };

  const getTabItem = (contentType: MyApprovalContentType, count: number) => {
    return (
      <>
        {MyApprovalContentTypeName[contentType]}
        <span className="count">+{count > 0 && count || 0}</span>
      </>
    );
  };

  const onChangeTab = (tab: TabItemModel): string => {
    history.push(routePaths.approvalTab(tab.name));
    return routePaths.approvalTab(tab.name);
  };

  /* render */
  return (
    <ContentLayout
      className="MyApprovalPage"
      breadcrumb={[
        { text: '승인관리' },
        { text: convertTabToContentTypeName(currentTab) }
      ]}
    >
      <MyApprovalContentHeader />
      <Tab
        tabs={getTabs()}
        defaultActiveName={currentTab}
        onChangeTab={onChangeTab}
      />

    </ContentLayout>
  );
}

export default inject(mobxHelper.injectFrom(
  'approvalCube.approvalCubeService'
))(withRouter(observer(MyApprovalPage)));

/* globals */
const convertTabToContentTypeName = (tab: string): MyApprovalContentTypeName => {
  return MyApprovalContentTypeName[tab as MyApprovalContentType];
};
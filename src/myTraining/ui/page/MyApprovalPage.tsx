
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import Tab, { TabItemModel } from 'shared/components/Tab';
import { ApprovalCubeService, AplService } from 'myTraining/stores';
import routePaths from '../../routePaths';
import { CountType } from 'myTraining/model/AplRdoModel';
import MyApprovalContentType from '../model/MyApprovalContentType';
import MyApprovalContentTypeName from '../model/MyApprovalContentTypeName';
import MyApprovalListContainer from '../logic/MyApprovalListContainer';
import MyApprovalContentHeader from '../view/MyApprovalContentHeader';
import MyApprovalListContainerV2 from '../logic/MyApprovalListContainerV2';


interface Props {
  approvalCubeService?: ApprovalCubeService;
  aplService?: AplService;
}

interface RouteParams {
  tab: string;
  pageNo?: string;
}

function MyApprovalPage(props: Props) {
  /* props */
  const { approvalCubeService, aplService } = props;
  const { approvalCubeOffsetList: { totalCount: paidCourseCount } } = approvalCubeService!;
  const { aplCount: { all: personalLearningCount } } = aplService!;

  const history = useHistory();
  const { tab } = useParams<RouteParams>();

  /* effects */
  useEffect(() => {
    aplService!.findAllTabCount(CountType.approvalId);

    return () => aplService!.clearAplCount();
  }, []);

  /* functions */
  const getTabs = (): TabItemModel[] => {
    return [
      {
        name: MyApprovalContentType.PaidCourse,
        item: getTabItem(MyApprovalContentType.PaidCourse, paidCourseCount),
        render: () => <MyApprovalListContainer />
      },
      {
        name: MyApprovalContentType.PersonalLearning,
        item: getTabItem(MyApprovalContentType.PersonalLearning, personalLearningCount),
        render: () => <MyApprovalListContainerV2 contentType={MyApprovalContentType.PersonalLearning} />
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

  /* handlers */
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
        { text: convertTabToContentTypeName(tab) }
      ]}
    >
      <MyApprovalContentHeader />
      <Tab
        tabs={getTabs()}
        defaultActiveName={tab}
        onChangeTab={onChangeTab}
      />

    </ContentLayout>
  );
}

export default inject(mobxHelper.injectFrom(
  'approvalCube.approvalCubeService',
  'myTraining.aplService'
))(observer(MyApprovalPage));

/* globals */
const convertTabToContentTypeName = (tab: string): MyApprovalContentTypeName => {
  return MyApprovalContentTypeName[tab as MyApprovalContentType];
};

import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import Tab, { TabItemModel } from 'shared/components/Tab';
import { ApprovalCubeService, AplService } from 'myTraining/stores';
import { MenuControlAuthService } from 'approval/stores';
import { SkProfileService } from 'profile/stores';
import routePaths from '../../routePaths';
import { SkProfileModel } from 'profile/model';
import { CountType } from 'myTraining/model/AplRdoModel';
import MyApprovalContentType from '../model/MyApprovalContentType';
import MyApprovalContentTypeName from '../model/MyApprovalContentTypeName';
import MyApprovalListContainer from '../logic/MyApprovalListContainer';
import MyApprovalContentHeader from '../view/MyApprovalContentHeader';
import MyApprovalListContainerV2 from '../logic/MyApprovalListContainerV2';


interface Props {
  approvalCubeService?: ApprovalCubeService;
  menuControlAuthService?: MenuControlAuthService;
  skProfileService?: SkProfileService;
  aplService?: AplService;
}

interface RouteParams {
  tab: string;
  pageNo?: string;
}

function MyApprovalPage(props: Props) {
  /* props */
  const { approvalCubeService, aplService, menuControlAuthService, skProfileService } = props;
  const { approvalCubeOffsetList: { totalCount: paidCourseCount } } = approvalCubeService!;
  const { aplCount: { all: personalLearningCount } } = aplService!;
  const { menuControlAuth } = menuControlAuthService!;
  const { skProfile } = skProfileService!;

  const history = useHistory();
  const { tab } = useParams<RouteParams>();

  /* effects */
  useEffect(() => {
    aplService!.findAllTabCount(CountType.approvalId);
    getMenuAuth();

    return () => aplService!.clearAplCount();
  }, []);

  /* functions */
  const getMenuAuth = async () => {
    if (!skProfile) {
      const profile: SkProfileModel = await skProfileService!.findSkProfile();
      menuControlAuthService!.findMenuControlAuth(profile.member.companyCode);
    }
  }

  const getTabs = (): TabItemModel[] => {
    /* menuControlAuth 의 companyCode 가 없을 경우에만 개인학습 탭을 보여준다. */
    if (menuControlAuth.companyCode === '') {
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
    }

    /* menuControlAuth 의 companyCode 가 있을 경우에는 개인학습 탭을 보여주지 않는다. */
    return [
      {
        name: MyApprovalContentType.PaidCourse,
        item: getTabItem(MyApprovalContentType.PaidCourse, paidCourseCount),
        render: () => <MyApprovalListContainer />
      }
    ]
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
  'approval.menuControlAuthService',
  'profile.skProfileService',
  'myTraining.aplService'
))(observer(MyApprovalPage));

/* globals */
const convertTabToContentTypeName = (tab: string): MyApprovalContentTypeName => {
  return MyApprovalContentTypeName[tab as MyApprovalContentType];
};
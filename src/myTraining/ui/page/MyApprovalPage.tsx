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
import {
  MyApprovalContentType,
  MyApprovalContentTypeName,
} from '../model/MyApprovalContentType';
import MyApprovalListContainer from '../logic/MyApprovalListContainer';
import MyApprovalContentHeader from '../view/MyApprovalContentHeader';
import { MenuControlAuth } from '../../../shared/model/MenuControlAuth';
import { MyApprovalRouteParams } from '../../model/MyApprovalRouteParams';
import PersonalLearningListContainer from '../logic/PersonalLearningListContainer';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface MyApprovalPageProps {
  approvalCubeService?: ApprovalCubeService;
  menuControlAuthService?: MenuControlAuthService;
  skProfileService?: SkProfileService;
  aplService?: AplService;
}

function MyApprovalPage({
  approvalCubeService,
  menuControlAuthService,
  skProfileService,
  aplService,
}: MyApprovalPageProps) {
  const {
    approvalCubeOffsetList: { totalCount: paidCourseCount },
  } = approvalCubeService!;
  const {
    aplCount: { all: personalLearningCount },
  } = aplService!;
  const { menuControlAuth } = menuControlAuthService!;
  const { skProfile } = skProfileService!;

  const history = useHistory();
  const params = useParams<MyApprovalRouteParams>();

  /* effects */
  useEffect(() => {
    aplService!.findAllTabCount(CountType.approvalId);
    getMenuAuth();

    return () => aplService!.clearAplCount();
  }, []);

  /* functions */
  const getMenuAuth = async () => {
    if (!skProfile) {
      menuControlAuthService!.findMenuControlAuth();
    }
  };

  const getTabs = (): TabItemModel[] => {
    /* menuControlAuth 의 companyCode 가 없을 경우에만 개인학습 탭을 보여준다. */
    if (menuControlAuth.useApl === false) {
      return [
        {
          name: MyApprovalContentType.PaidCourse,
          item: getTabItem(MyApprovalContentType.PaidCourse, paidCourseCount),
          render: () => <MyApprovalListContainer />,
        },
        {
          name: MyApprovalContentType.PersonalLearning,
          item: getTabItem(
            MyApprovalContentType.PersonalLearning,
            personalLearningCount
          ),
          render: () => <PersonalLearningListContainer />,
        },
      ];
    }

    /* menuControlAuth 의 companyCode 가 있을 경우에는 개인학습 탭을 보여주지 않는다. */
    return [
      {
        name: MyApprovalContentType.PaidCourse,
        item: getTabItem(MyApprovalContentType.PaidCourse, paidCourseCount),
        render: () => <MyApprovalListContainer />,
      },
    ];
  };

  const getTabItem = (contentType: MyApprovalContentType, count: number) => {
    return (
      <>
        <PolyglotText id="승인관리-mifa-유료과정탭" defaultString="유료과정" />
        <span className="count">+{(count > 0 && count) || 0}</span>
      </>
    );
  };

  /* handlers */
  const onChangeTab = (tab: TabItemModel): string => {
    history.push(routePaths.approvalTab(tab.name));
    return routePaths.approvalTab(tab.name);
  };

  /* render */
  function myApprovalText() {
    if (params.tab === MyApprovalContentType.PaidCourse) {
      return getPolyglotText('유료과정', '승인관리-mifa-유료과정bread');
    } else {
      return getPolyglotText('개인학습', '승인관리-mifa-개인학습bread');
    }
  }
  return (
    <ContentLayout
      className="MyApprovalPage"
      breadcrumb={[
        { text: getPolyglotText('승인관리', '승인관리-mifa-승인관리bread') },
        { text: myApprovalText() },
      ]}
    >
      <MyApprovalContentHeader />
      <Tab
        tabs={getTabs()}
        defaultActiveName={params.tab}
        onChangeTab={onChangeTab}
      />
    </ContentLayout>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'approvalCube.approvalCubeService',
    'approval.menuControlAuthService',
    'profile.skProfileService',
    'myTraining.aplService'
  )
)(observer(MyApprovalPage));

import React from 'react';
import { observer } from 'mobx-react';
import { Tab, TabItemModel } from 'shared';
import { onChangeTab } from './myApprovalTab.events';
import { useParams } from 'react-router-dom';
import { MyApprovalRouteParams } from 'myTraining/model/MyApprovalRouteParams';
import { MenuControlAuthService } from 'approval/stores';
import { MyApprovalContentType } from 'myTraining/ui/model/MyApprovalContentType';
import MyApprovalListContainer from 'myTraining/ui/logic/MyApprovalListContainer';
import PersonalLearningListContainer from 'myTraining/personalLearning/PersonalLearningListContainer';
import MyApprovalTabItemView from './MyApprovalTabItemView';
import ApprovalCubeService from 'myTraining/present/logic/ApprovalCubeService';
import { AplService } from 'myTraining/stores';
import { useRequestMyApprovalTabCount } from './myApprovalTab.services';

function MyApprovalTabContainer() {
  useRequestMyApprovalTabCount();
  const params = useParams<MyApprovalRouteParams>();

  const { menuControlAuth } = MenuControlAuthService.instance;
  const {
    approvalCubeOffsetList: { totalCount: paidCourseCount },
  } = ApprovalCubeService.instance;
  const {
    aplCount: { all: personalLearningCount },
  } = AplService.instance;

  const getTabs = (): TabItemModel[] => {
    if (menuControlAuth.useApl === true) {
      return [
        {
          name: MyApprovalContentType.PaidCourse,
          item: (
            <MyApprovalTabItemView
              contentType={MyApprovalContentType.PaidCourse}
              count={paidCourseCount}
            />
          ),
          render: () => <MyApprovalListContainer />,
        },
        {
          name: MyApprovalContentType.PersonalLearning,
          item: (
            <MyApprovalTabItemView
              contentType={MyApprovalContentType.PersonalLearning}
              count={personalLearningCount}
            />
          ),
          render: () => <PersonalLearningListContainer />,
        },
      ];
    }

    return [
      {
        name: MyApprovalContentType.PaidCourse,
        item: (
          <MyApprovalTabItemView
            contentType={MyApprovalContentType.PaidCourse}
            count={paidCourseCount}
          />
        ),
        render: () => <MyApprovalListContainer />,
      },
    ];
  };

  return (
    <Tab
      tabs={getTabs()}
      defaultActiveName={params.tab}
      onChangeTab={onChangeTab}
    />
  );
}

export default observer(MyApprovalTabContainer);

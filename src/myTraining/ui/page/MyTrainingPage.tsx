import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import routePaths from 'myTraining/routePaths';
import { NotieService } from 'notie/stores';
import { MyTrainingService, InMyLectureService, AplService } from 'myTraining/stores';
import { LectureService } from 'lecture/stores';
import { SkProfileService } from 'profile/stores';
import { MenuControlAuthService } from 'approval/stores';
import { SkProfileModel } from 'profile/model';
import { TabItemModel, ContentLayout } from 'shared';
import TabContainer from 'shared/components/Tab';
import MyLearningListContainerV2 from '../logic/MyLearningListContainerV2';
import { MyLearningContentType, MyLearningContentTypeName } from '../model';
import { MenuControlAuth } from '../../../shared/model/MenuControlAuth';
import MyTrainingHeaderContainer from '../logic/MyTrainingHeaderContainer';
import { useRequestAllMyTrainingCount } from '../../service/useRequestAllMyTrainingCount';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import { usePublishViewEvent } from '../../service/usePublishViewEvent';
import { useRequestLearningStorage } from '../../service/useRequestLearningStorage';


interface MyTrainingPageProps {
  notieService?: NotieService;
  myTrainingService?: MyTrainingService;
  inMyLectureService?: InMyLectureService;
  lectureService?: LectureService;
  aplService?: AplService;
  skProfileService?: SkProfileService;
  menuControlAuthService?: MenuControlAuthService;
}

function MyTrainingPage({
  notieService,
  myTrainingService,
  inMyLectureService,
  lectureService,
  aplService,
  skProfileService,
  menuControlAuthService,
}: MyTrainingPageProps) {
  const { skProfile } = skProfileService!;
  const { menuControlAuth } = menuControlAuthService!;
  const { inprogressCount, completedCount, enrolledCount, retryCount } = myTrainingService!;
  const { inMyListCount } = inMyLectureService!;
  const { requiredLecturesCount } = lectureService!;
  const { aplCount: { all: personalCompletedCount } } = aplService!;

  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();

  useRequestLearningStorage();
  useRequestAllMyTrainingCount();
  usePublishViewEvent('LEARNING_VIEW');

  useEffect(() => {
    getMenuAuth();
  }, []);

  const getMenuAuth = async () => {
    if (!skProfile) {
      const profile: SkProfileModel = await skProfileService!.findSkProfile();
      menuControlAuthService!.findMenuControlAuth(profile.member.companyCode);
    }
  }

  const getTabs = (): TabItemModel[] => {
   
    if (menuControlAuth.companyCode === ''
        || ( menuControlAuth.authCode === MenuControlAuth.User
        && menuControlAuth.useYn === MenuControlAuth.Yes)) {
      return [
        {
          name: MyLearningContentType.InProgress,
          item: getTabItem(MyLearningContentType.InProgress, inprogressCount),
          render: () => <MyLearningListContainerV2 contentType={params.tab} />,
        },
        {
          name: MyLearningContentType.InMyList,
          item: getTabItem(MyLearningContentType.InMyList, inMyListCount),
          render: () => <MyLearningListContainerV2 contentType={params.tab} />,
        },
        {
          className: 'division',
          name: MyLearningContentType.Required,
          item: getTabItem(MyLearningContentType.Required, requiredLecturesCount),
          render: () => <MyLearningListContainerV2 contentType={params.tab} />,
        },
        {
          name: MyLearningContentType.Enrolled,
          item: getTabItem(MyLearningContentType.Enrolled, enrolledCount),
          render: () => <MyLearningListContainerV2 contentType={params.tab} />,
        },
        {
          name: MyLearningContentType.Completed,
          item: getTabItem(MyLearningContentType.Completed, completedCount),
          render: () => <MyLearningListContainerV2 contentType={params.tab} />,
        },
        {
          name: MyLearningContentType.PersonalCompleted,
          item: getTabItem(MyLearningContentType.PersonalCompleted, personalCompletedCount),
          render: () => <MyLearningListContainerV2 contentType={params.tab} />
        },
        {
          name: MyLearningContentType.Retry,
          item: getTabItem(MyLearningContentType.Retry, retryCount),
          render: () => <MyLearningListContainerV2 contentType={params.tab} />,
        },
      ] as TabItemModel[];
    }

    return [
      {
        name: MyLearningContentType.InProgress,
        item: getTabItem(MyLearningContentType.InProgress, inprogressCount),
        render: () => <MyLearningListContainerV2 contentType={params.tab} />,
      },
      {
        name: MyLearningContentType.InMyList,
        item: getTabItem(MyLearningContentType.InMyList, inMyListCount),
        render: () => <MyLearningListContainerV2 contentType={params.tab} />,
      },
      {
        className: 'division',
        name: MyLearningContentType.Required,
        item: getTabItem(MyLearningContentType.Required, requiredLecturesCount),
        render: () => <MyLearningListContainerV2 contentType={params.tab} />,
      },
      {
        name: MyLearningContentType.Enrolled,
        item: getTabItem(MyLearningContentType.Enrolled, enrolledCount),
        render: () => <MyLearningListContainerV2 contentType={params.tab} />,
      },
      {
        name: MyLearningContentType.Completed,
        item: getTabItem(MyLearningContentType.Completed, completedCount),
        render: () => <MyLearningListContainerV2 contentType={params.tab} />,
      },
      {
        name: MyLearningContentType.Retry,
        item: getTabItem(MyLearningContentType.Retry, retryCount),
        render: () => <MyLearningListContainerV2 contentType={params.tab} />,
      },
    ] as TabItemModel[];
  };

  const getTabItem = (contentType: MyLearningContentType, count: number = 0) => {
    return (
      <>
        {MyLearningContentTypeName[contentType]}
        <span className="count">+{count > 0 && count || 0}</span>
      </>
    );
  };


  const onChangeTab = (tab: TabItemModel): string => {
    //
    switch (tab.name) {
      case MyLearningContentType.InProgress:
        notieService!.readNotie('Learning_Progress');
        break;
      case MyLearningContentType.Completed:
        notieService!.readNotie('Learning_Passed');
        break;
      case MyLearningContentType.Retry:
        notieService!.readNotie('Learning_Missed');
        break;
      case MyLearningContentType.Enrolled:
        notieService!.readNotie('Learning_Waiting');
        break;
    }

    history.push(routePaths.learningTab(tab.name));
    return routePaths.learningTab(tab.name);
  };

  return (
    <ContentLayout
      className="mylearning"
      breadcrumb={[
        { text: 'Learning' },
        { text: MyLearningContentTypeName[params.tab] }
      ]}
    >
      <MyTrainingHeaderContainer />
      <TabContainer
        tabs={getTabs()}
        defaultActiveName={params.tab}
        onChangeTab={onChangeTab}
      />
    </ContentLayout>
  );
}

export default inject(mobxHelper.injectFrom(
  'notie.notieService',
  'lecture.lectureService',
  'myTraining.inMyLectureService',
  'myTraining.myTrainingService',
  'myTraining.aplService',
  'profile.skProfileService',
  'approval.menuControlAuthService'
))(observer(MyTrainingPage));
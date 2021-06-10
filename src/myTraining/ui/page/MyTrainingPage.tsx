import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import routePaths from 'myTraining/routePaths';
import { NotieService } from 'notie/stores';
import {
  MyTrainingService,
  InMyLectureService,
  AplService,
} from 'myTraining/stores';
import { LectureService } from 'lecture/stores';
import { MenuControlAuthService } from 'approval/stores';
import { TabItemModel, ContentLayout } from 'shared';
import TabContainer from 'shared/components/Tab';
import { MenuControlAuth } from '../../../shared/model/MenuControlAuth';
import MyTrainingHeaderContainer from '../logic/MyTrainingHeaderContainer';
import { useRequestAllMyTrainingCount } from '../../service/useRequestAllMyTrainingCount';
import { MyTrainingRouteParams } from '../../model/MyTrainingRouteParams';
import { useRequestCollege } from '../../../shared/service/useCollege/useRequestCollege';
import {
  MyLearningContentType,
  MyLearningContentTypeName,
} from '../model/MyLearningContentType';
import MyTrainingListContainer from '../logic/MyTrainingListContainer';
import InMyLectureListContainer from '../logic/InMyLectureListContainer';
import PersonalCompletedListContainer from '../logic/PersonalCompletedListContainer';
import RequiredCardListContainer from '../logic/RequiredCardListContainer';
import { CollegeService } from '../../../college/stores';
import { useRequestMenuAuth } from '../../service/useRequestMenuAuth';
import FilterBoxService from '../../../shared/present/logic/FilterBoxService';
import EnrollingApi from '../../../lecture/shared/present/apiclient/EnrollingApi';
import EnrolledListContainer from '../logic/EnrolledListContainer';

interface MyTrainingPageProps {
  notieService?: NotieService;
  myTrainingService?: MyTrainingService;
  inMyLectureService?: InMyLectureService;
  lectureService?: LectureService;
  aplService?: AplService;
  menuControlAuthService?: MenuControlAuthService;
  collegeService?: CollegeService;
  filterBoxService?: FilterBoxService;
}

function MyTrainingPage({
  notieService,
  myTrainingService,
  inMyLectureService,
  lectureService,
  aplService,
  menuControlAuthService,
  collegeService,
  filterBoxService,
}: MyTrainingPageProps) {
  const history = useHistory();
  const params = useParams<MyTrainingRouteParams>();
  const { myTrainingTableViews, myTrainingTableCount2 } = myTrainingService!;
  const { colleges } = collegeService!;
  const { menuControlAuth } = menuControlAuthService!;
  const {
    inprogressCount,
    completedCount,
    enrolledCount,
    retryCount,
  } = myTrainingService!;
  const { inMyListCount } = inMyLectureService!;
  const { requiredLecturesCount } = lectureService!;
  const {
    aplCount: { all: personalCompletedCount },
  } = aplService!;

  useRequestCollege();
  useRequestMenuAuth();
  useRequestAllMyTrainingCount();

  useEffect(() => {
    fetchColleges();

    return () => {
      filterBoxService!.clear();
    };
  }, [params.tab]);

  const fetchColleges = () => {
    if (colleges && colleges.length > 0) {
      return;
    }

    collegeService!.findAllColleges();
  };

  const getTabs = (): TabItemModel[] => {
    if (
      menuControlAuth.companyCode === '' ||
      (menuControlAuth.authCode === MenuControlAuth.User &&
        menuControlAuth.useYn === MenuControlAuth.Yes)
    ) {
      return [
        {
          name: MyLearningContentType.InProgress,
          item: getTabItem(MyLearningContentType.InProgress, inprogressCount),
          render: () => <MyTrainingListContainer />,
        },
        {
          name: MyLearningContentType.InMyList,
          item: getTabItem(MyLearningContentType.InMyList, inMyListCount),
          render: () => <InMyLectureListContainer />,
        },
        {
          className: 'division',
          name: MyLearningContentType.Required,
          item: getTabItem(
            MyLearningContentType.Required,
            requiredLecturesCount
          ),
          render: () => <RequiredCardListContainer />,
        },
        {
          name: MyLearningContentType.Enrolled,
          item: getTabItem(
            MyLearningContentType.Enrolled,
            myTrainingTableCount2
          ),
          render: () => <EnrolledListContainer />,
        },
        {
          name: MyLearningContentType.Completed,
          item: getTabItem(MyLearningContentType.Completed, completedCount),
          render: () => <MyTrainingListContainer />,
        },
        {
          name: MyLearningContentType.PersonalCompleted,
          item: getTabItem(
            MyLearningContentType.PersonalCompleted,
            personalCompletedCount
          ),
          render: () => <PersonalCompletedListContainer />,
        },
        {
          name: MyLearningContentType.Retry,
          item: getTabItem(MyLearningContentType.Retry, retryCount),
          render: () => <MyTrainingListContainer />,
        },
      ] as TabItemModel[];
    }

    return [
      {
        name: MyLearningContentType.InProgress,
        item: getTabItem(MyLearningContentType.InProgress, inprogressCount),
        render: () => <MyTrainingListContainer />,
      },
      {
        name: MyLearningContentType.InMyList,
        item: getTabItem(MyLearningContentType.InMyList, inMyListCount),
        render: () => <InMyLectureListContainer />,
      },
      {
        className: 'division',
        name: MyLearningContentType.Required,
        item: getTabItem(MyLearningContentType.Required, requiredLecturesCount),
        render: () => <RequiredCardListContainer />,
      },
      {
        name: MyLearningContentType.Enrolled,
        item: getTabItem(MyLearningContentType.Enrolled, myTrainingTableCount2),
        render: () => <EnrolledListContainer />,
      },
      {
        name: MyLearningContentType.Completed,
        item: getTabItem(MyLearningContentType.Completed, completedCount),
        render: () => <MyTrainingListContainer />,
      },
      {
        name: MyLearningContentType.Retry,
        item: getTabItem(MyLearningContentType.Retry, retryCount),
        render: () => <MyTrainingListContainer />,
      },
    ] as TabItemModel[];
  };

  const getTabItem = (
    contentType: MyLearningContentType,
    count: number = 0
  ) => {
    return (
      <>
        {MyLearningContentTypeName[contentType]}
        <span className="count">+{(count > 0 && count) || 0}</span>
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
        { text: MyLearningContentTypeName[params.tab] },
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

export default inject(
  mobxHelper.injectFrom(
    'notie.notieService',
    'lecture.lectureService',
    'myTraining.inMyLectureService',
    'myTraining.myTrainingService',
    'myTraining.aplService',
    'approval.menuControlAuthService',
    'college.collegeService',
    'shared.filterBoxService'
  )
)(observer(MyTrainingPage));

import { MenuControlAuthService } from 'approval/stores';
import { LectureService } from 'lecture';
import { observer } from 'mobx-react';
import { CountType } from 'myTraining/model/AplRdoModel';
import PersonalCompletedListContainer from 'myTraining/personalLearning/PersonalCompletedListContainer';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import routePaths from 'myTraining/routePaths';
import { AplService } from 'myTraining/stores';
import CompletedListPageContainer from 'myTraining/ui/logic/TabPage/CompletedListPageContainer';
import EnrolledListPageContainer from 'myTraining/ui/logic/TabPage/EnrolledListPageContainer';
import InMyListPageContainer from 'myTraining/ui/logic/TabPage/InMyListPageContainer';
import ProgressPageContainer from 'myTraining/ui/logic/TabPage/ProgressPageContainer';
import RequiredListPageContainer from 'myTraining/ui/logic/TabPage/RequiredListPageContainer';
import RetryListPageContainer from 'myTraining/ui/logic/TabPage/RetryListPageContainer';
import { MyLearningContentType } from 'myTraining/ui/model';
import { NotieService } from 'notie/stores';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TabContainer, { TabItemModel } from 'shared/components/Tab';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import MyTrainingTabItemView from './MyTrainingTabItemView';

function MyTrainingTabContainer() {
  const params = useParams<MyTrainingRouteParams>();
  const { menuControlAuth } = MenuControlAuthService.instance;
  // const { inMyListCount } = InMyLectureService.instance;
  const {
    inProgressCount,
    requiredLecturesCount,
    bookmarkCount,
    completedCount,
    retryCount,
  } = LectureService.instance;
  const { enrolledCount } = PersonalCubeService.instance;
  const {
    aplCount: { all: personalCompletedCount },
  } = AplService.instance;

  useEffect(() => {
    // MyTrainingService.instance.findAllTabCount();
    // InMyLectureService.instance.findAllTabCount();
    LectureService.instance.countLearningTab();
    AplService.instance.findAllTabCount(CountType.patronKeyString);
    PersonalCubeService.instance.findCountByEnrolledTabCount();
  }, []);

  const getTabs = () => {
    const tabItemList: TabItemModel[] = [];

    tabItemList.push({
      name: MyLearningContentType.InProgress,
      item: (
        <MyTrainingTabItemView
          contentType={MyLearningContentType.InProgress}
          count={inProgressCount}
        />
      ),
      render: () => <ProgressPageContainer />,
    });

    tabItemList.push({
      name: MyLearningContentType.InMyList,
      item: (
        <MyTrainingTabItemView
          contentType={MyLearningContentType.InMyList}
          count={bookmarkCount}
        />
      ),
      // render: () => <></>,
      render: () => <InMyListPageContainer />,
    });

    tabItemList.push({
      className: 'division',
      name: MyLearningContentType.Required,
      item: (
        <MyTrainingTabItemView
          contentType={MyLearningContentType.Required}
          count={requiredLecturesCount}
        />
      ),
      // render: () => <></>,
      render: () => <RequiredListPageContainer />,
    });

    tabItemList.push({
      name: MyLearningContentType.Enrolled,
      item: (
        <MyTrainingTabItemView
          contentType={MyLearningContentType.Enrolled}
          count={enrolledCount}
        />
      ),
      // render: () => <></>,
      render: () => <EnrolledListPageContainer />,
    });

    tabItemList.push({
      name: MyLearningContentType.Completed,
      item: (
        <MyTrainingTabItemView
          contentType={MyLearningContentType.Completed}
          count={completedCount}
        />
      ),
      render: () => <CompletedListPageContainer />,
    });

    if (menuControlAuth.useApl === true) {
      //
      tabItemList.push({
        name: MyLearningContentType.PersonalCompleted,
        item: (
          <MyTrainingTabItemView
            contentType={MyLearningContentType.PersonalCompleted}
            count={personalCompletedCount}
          />
        ),
        render: () => <PersonalCompletedListContainer />,
      });
    }

    tabItemList.push({
      name: MyLearningContentType.Retry,
      item: (
        <MyTrainingTabItemView
          contentType={MyLearningContentType.Retry}
          count={retryCount}
        />
      ),
      render: () => <RetryListPageContainer />,
    });

    return tabItemList;
  };

  const onChangeTab = (tab: TabItemModel): string => {
    const notieService = NotieService.instance;
    const currentHistory = getCurrentHistory();
    switch (tab.name) {
      case MyLearningContentType.InProgress:
        notieService.readNotie('Learning_Progress');
        break;
      case MyLearningContentType.Completed:
        notieService.readNotie('Learning_Passed');
        break;
      case MyLearningContentType.Retry:
        notieService.readNotie('Learning_Missed');
        break;
      case MyLearningContentType.Enrolled:
        notieService.readNotie('Learning_Waiting');
        break;
    }
    currentHistory?.push(routePaths.learningTab(tab.name));
    return routePaths.learningTab(tab.name);
  };

  return (
    <TabContainer
      tabs={getTabs()}
      defaultActiveName={params.tab}
      onChangeTab={onChangeTab}
    />
  );
}

export default observer(MyTrainingTabContainer);

import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import { MenuControlAuthService } from 'approval/stores';
import MyTrainingService from 'myTraining/present/logic/MyTrainingService';
import InMyLectureService from 'myTraining/present/logic/InMyLectureService';
import { LectureService } from 'lecture';
import { AplService } from 'myTraining/stores';
import TabContainer, { TabItemModel } from 'shared/components/Tab';
import { MyLearningContentType } from 'myTraining/ui/model';
import { NotieService } from 'notie/stores';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import routePaths from 'myTraining/routePaths';
import MyTrainingTabItemView from './MyTrainingTabItemView';
import ProgressPageContainer from 'myTraining/ui/logic/TabPage/ProgressPageContainer';
import InMyListPageContainer from 'myTraining/ui/logic/TabPage/InMyListPageContainer';
import { CountType } from 'myTraining/model/AplRdoModel';
import RequiredListPageContainer from 'myTraining/ui/logic/TabPage/RequiredListPageContainer';
import EnrolledListContainer from 'myTraining/ui/logic/EnrolledListContainer';
import EnrolledListPageContainer from 'myTraining/ui/logic/TabPage/EnrolledListPageContainer';
import RetryListPageContainer from 'myTraining/ui/logic/TabPage/RetryListPageContainer';
import PersonalCompletedListContainer from 'myTraining/personalLearning/PersonalCompletedListContainer';
import CompletedListPageContainer from 'myTraining/ui/logic/TabPage/CompletedListPageContainer';

function MyTrainingTabContainer() {
  const params = useParams<MyTrainingRouteParams>();
  const { menuControlAuth } = MenuControlAuthService.instance;
  const { inprogressCount, completedCount, myTrainingTableCount2, retryCount } =
    MyTrainingService.instance;
  const { inMyListCount } = InMyLectureService.instance;
  const { requiredLecturesCount } = LectureService.instance;
  const {
    aplCount: { all: personalCompletedCount },
  } = AplService.instance;

  useEffect(() => {
    MyTrainingService.instance.findAllTabCount();
    InMyLectureService.instance.findAllTabCount();
    LectureService.instance.countRequiredLectures();
    AplService.instance.findAllTabCount(CountType.patronKeyString);
  }, []);

  const getTabs = () => {
    const tabItemList: TabItemModel[] = [];

    tabItemList.push({
      name: MyLearningContentType.InProgress,
      item: (
        <MyTrainingTabItemView
          contentType={MyLearningContentType.InProgress}
          count={inprogressCount}
        />
      ),
      render: () => <ProgressPageContainer />,
    });

    tabItemList.push({
      name: MyLearningContentType.InMyList,
      item: (
        <MyTrainingTabItemView
          contentType={MyLearningContentType.InMyList}
          count={inMyListCount}
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
          count={myTrainingTableCount2}
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

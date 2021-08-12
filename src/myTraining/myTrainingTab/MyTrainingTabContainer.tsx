import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from 'myTraining/routeParams';
import { MenuControlAuthService } from 'approval/stores';
import MyTrainingService from 'myTraining/present/logic/MyTrainingService';
import InMyLectureService from 'myTraining/present/logic/InMyLectureService';
import { LectureService } from 'lecture';
import { AplService } from 'myTraining/stores';
import TabContainer, { TabItemModel } from 'shared/components/Tab';
import MyTrainingListContainer from 'myTraining/ui/logic/MyTrainingListContainer';
import InMyLectureListContainer from 'myTraining/ui/logic/InMyLectureListContainer';
import RequiredCardListContainer from 'myTraining/ui/logic/RequiredCardListContainer';
import EnrolledListContainer from 'myTraining/ui/logic/EnrolledListContainer';
import PersonalCompletedListContainer from 'myTraining/personalLearning/PersonalCompletedListContainer';
import { MyLearningContentType } from 'myTraining/ui/model';
import MyTrainingTabItemView from './MyTrainingTabItemView';
import { onChangeTab } from './myTrainingTab.events';

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

  const getTabs = (): TabItemModel[] => {
    if (menuControlAuth.useApl === true) {
      return [
        {
          name: MyLearningContentType.InProgress,
          item: (
            <MyTrainingTabItemView
              contentType={MyLearningContentType.InProgress}
              count={inprogressCount}
            />
          ),
          render: () => <MyTrainingListContainer />,
        },
        {
          name: MyLearningContentType.InMyList,
          item: (
            <MyTrainingTabItemView
              contentType={MyLearningContentType.InMyList}
              count={inMyListCount}
            />
          ),
          render: () => <InMyLectureListContainer />,
        },
        {
          className: 'division',
          name: MyLearningContentType.Required,
          item: (
            <MyTrainingTabItemView
              contentType={MyLearningContentType.Required}
              count={requiredLecturesCount}
            />
          ),
          render: () => <RequiredCardListContainer />,
        },
        {
          name: MyLearningContentType.Enrolled,
          item: (
            <MyTrainingTabItemView
              contentType={MyLearningContentType.Enrolled}
              count={myTrainingTableCount2}
            />
          ),
          render: () => <EnrolledListContainer />,
        },
        {
          name: MyLearningContentType.Completed,
          item: (
            <MyTrainingTabItemView
              contentType={MyLearningContentType.Completed}
              count={completedCount}
            />
          ),
          render: () => <MyTrainingListContainer />,
        },
        {
          name: MyLearningContentType.PersonalCompleted,
          item: (
            <MyTrainingTabItemView
              contentType={MyLearningContentType.PersonalCompleted}
              count={personalCompletedCount}
            />
          ),
          render: () => <PersonalCompletedListContainer />,
        },
        {
          name: MyLearningContentType.Retry,
          item: (
            <MyTrainingTabItemView
              contentType={MyLearningContentType.Retry}
              count={retryCount}
            />
          ),
          render: () => <MyTrainingListContainer />,
        },
      ];
    }

    return [
      {
        name: MyLearningContentType.InProgress,
        item: (
          <MyTrainingTabItemView
            contentType={MyLearningContentType.InProgress}
            count={inprogressCount}
          />
        ),
        render: () => <MyTrainingListContainer />,
      },
      {
        name: MyLearningContentType.InMyList,
        item: (
          <MyTrainingTabItemView
            contentType={MyLearningContentType.InMyList}
            count={inMyListCount}
          />
        ),
        render: () => <InMyLectureListContainer />,
      },
      {
        className: 'division',
        name: MyLearningContentType.Required,
        item: (
          <MyTrainingTabItemView
            contentType={MyLearningContentType.Required}
            count={requiredLecturesCount}
          />
        ),
        render: () => <RequiredCardListContainer />,
      },
      {
        name: MyLearningContentType.Enrolled,
        item: (
          <MyTrainingTabItemView
            contentType={MyLearningContentType.Enrolled}
            count={myTrainingTableCount2}
          />
        ),
        render: () => <EnrolledListContainer />,
      },
      {
        name: MyLearningContentType.Completed,
        item: (
          <MyTrainingTabItemView
            contentType={MyLearningContentType.Completed}
            count={completedCount}
          />
        ),
        render: () => <MyTrainingListContainer />,
      },
      {
        name: MyLearningContentType.Retry,
        item: (
          <MyTrainingTabItemView
            contentType={MyLearningContentType.Retry}
            count={retryCount}
          />
        ),
        render: () => <MyTrainingListContainer />,
      },
    ] as TabItemModel[];
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

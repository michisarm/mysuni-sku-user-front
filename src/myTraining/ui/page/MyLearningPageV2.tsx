import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import routePaths from 'myTraining/routePaths';
import { ActionEventService } from 'shared/stores';
import { NotieService } from 'notie/stores';
import { MyTrainingService, InMyLectureService } from 'myTraining/stores';
import { LectureService } from 'lecture/stores';
import { TabItemModel, ContentLayout } from 'shared';
import TabContainer from 'shared/components/Tab';
import MyLearningContentHeaderContainer from '../logic/MyLearningContentHeaderContainer';
import MyLearningListContainerV2 from '../logic/MyLearningListContainerV2';
import { MyLearningContentType, MyLearningContentTypeName } from '../model';

interface Props extends RouteComponentProps<RouteParams> {
  actionEventService?: ActionEventService;
  notieService?: NotieService;
  myTrainingService?: MyTrainingService;
  inMyLectureService?: InMyLectureService;
  lectureService?: LectureService;
}

interface RouteParams {
  tab: string;
  pageNo?: string;
}

function MyLearningPageV2(props: Props) {
  const { actionEventService, notieService, myTrainingService, inMyLectureService, lectureService } = props;
  const { history, match } = props;
  const currentTab = match.params.tab;

  /* effects */
  useEffect(() => {
    publishViewEvent();
    fetchAllTabCount();
    // 학습완료한 강좌에 대해 sessionStorage 저장하는 로직
    // myTrainingService!.saveNewLearningPassedToStorage('Passed');
  }, []);

  /* functions */
  const publishViewEvent = () => {
    const menu = 'LEARNING_VIEW';
    actionEventService!.registerViewActionLog({ menu });
  };


  const fetchAllTabCount = () => {
    /*
      LearningPage 탭 카운트 조회
        학습중 = inprogressCount
        관심목록 = inMyListCount
        권장과정 = requiredLectureCount
        학습예정 = enrolledCount
        mySUNI 학습완료 = completedCount
        취소/미이수 = retryCount
    */
    myTrainingService!.findAllTabCount(); // 학습중, 학습예정, mySUNI 학습완료, 취수/미이수
    inMyLectureService!.findAllTabCount();  // 관심목록
    lectureService!.countRequiredLectures(); // 권장과정
  };


  const getTabs = (): TabItemModel[] => {
    const { inprogressCount, completedCount, enrolledCount, retryCount } = myTrainingService!;
    const { inMyListCount } = inMyLectureService!;
    const { requiredLecturesCount } = lectureService!;

    return [
      {
        name: MyLearningContentType.InProgress,
        item: getTabItem(MyLearningContentType.InProgress, inprogressCount),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />,
      },
      {
        name: MyLearningContentType.InMyList,
        item: getTabItem(MyLearningContentType.InMyList, inMyListCount),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />,
      },
      {
        className: 'division',
        name: MyLearningContentType.Required,
        item: getTabItem(MyLearningContentType.Required, requiredLecturesCount),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />,
      },
      {
        name: MyLearningContentType.Enrolled,
        item: getTabItem(MyLearningContentType.Enrolled, enrolledCount),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />,
      },
      {
        name: MyLearningContentType.Completed,
        item: getTabItem(MyLearningContentType.Completed, completedCount),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />,
      },
      {
        name: MyLearningContentType.Retry,
        item: getTabItem(MyLearningContentType.Retry, retryCount),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />,
      },
    ] as TabItemModel[];
  };

  /* functions */
  const getTabItem = (contentType: MyLearningContentType, count: number = 0) => {
    return (
      <>
        {MyLearningContentTypeName[contentType]}
        <span className="count">+{count > 0 && count || 0}</span>
      </>
    );
  };


  /* handlers */
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

  /* render */
  return (
    <ContentLayout className="myLearning" breadcrumb={[{ text: 'Learning' }, { text: getContentNameFromTab(currentTab) }]}>
      <MyLearningContentHeaderContainer />
      <TabContainer tabs={getTabs()} defaultActiveName={currentTab} onChangeTab={onChangeTab} />
    </ContentLayout>
  );
}

export default inject(mobxHelper.injectFrom(
  'shared.actionEventService',
  'notie.notieService',
  'lecture.lectureService',
  'myTraining.inMyLectureService',
  'myTraining.myTrainingService'
))(withRouter(observer(MyLearningPageV2)));

/* globals */
const convertTabToContentType = (tab: string) => {
  // 변환된 contentType 은 MyLearningListContainer 의 props로 전달됨.
  return MyLearningContentType[tab as MyLearningContentType];
};

const getContentNameFromTab = (tab: string) => {
  // currentTab 을 BreadCrumb 에 표시할 LearningContentTypeName 으로 변환.
  return MyLearningContentTypeName[tab as MyLearningContentType];
};

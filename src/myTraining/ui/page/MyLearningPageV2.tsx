import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ActionEventService } from 'shared/stores';
import { NotieService } from 'notie/stores';
import { observer, inject } from 'mobx-react';
import { LectureService } from 'lecture';
import InMyLectureService from 'myTraining/present/logic/InMyLectureService';
import { MyTrainingService } from 'myTraining/stores';
import { mobxHelper } from '@nara.platform/accent';
import { TabItemModel, ContentLayout } from 'shared';
import TabContainer from 'shared/components/Tab';
import routePaths from 'myTraining/routePaths';
import { MyLearningContentType, MyLearningContentTypeName } from '../model';
import MyLearningContentHeaderContainer from '../logic/MyLearningContentHeaderContainer';
import MyLearningListContainerV2 from '../logic/MyLearningListContainerV2';

interface Props extends RouteComponentProps<RouteParams> {
  actionEventService?: ActionEventService;
  notieService?: NotieService;
  lectureService?: LectureService;
  inMyLectureService?: InMyLectureService;
  myTrainingService?: MyTrainingService;
}

/* 
  URL path 로 올 수 있는 파라미터는 아래와 같음.
*/
interface RouteParams {
  tab: string;
  pageNo?: string;
}

/* 

*/
function MyLearningPageV2(props: Props) {
  const { actionEventService, notieService, lectureService, inMyLectureService, myTrainingService } = props;
  const { history, match } = props;
  const currentTab = match.params.tab;

  /* lifeCycles */
  useEffect(() => {
    publishViewEvent();
    fetchAllTabCounts();
    // 학습완료한 강좌에 대해 sessionStorage 저장하는 로직
    // myTrainingService!.saveNewLearningPassedToStorage('Passed');
  }, []);

  /* functions */

  // 뷰 액션로그 생성
  const publishViewEvent = () => {
    const menu = 'LEARNING_VIEW';
    actionEventService!.registerViewActionLog({ menu });
  };

  /*
    LearningPage 탭 카운트 조회
      학습중 = inProgressCount
      관심목록 = inMyLectureAllCount
      권장과정 = requiredLectureCount
      학습예정 = enrolledCount
      mySUNI 학습완료 = completedCount
      개인 학습완료 = ?
      취소/미이수 = retryCount
  */
  const fetchAllTabCounts = () => {
    myTrainingService!.findAllTabMyTraining(); // 학습중, 학습예정, mySUNI 학습완료, 취수/미이수
    lectureService!.countRequiredLectures(); // 권장과정
  };

  /*
    TabItemModel[] 을 생성해 return 함.
  */
  const getTabs = (): TabItemModel[] => {
    // personalCompletedCount 가 추가되어야 함.
    const { inprogressCount, completedCount, enrolledCount, retryCount } = myTrainingService!;
    const { inMyLectureAllCount } = inMyLectureService!;
    const { requiredLecturesCount } = lectureService!;

    return [
      {
        name: MyLearningContentType.InProgress,
        item: getTabItem(MyLearningContentType.InProgress, inprogressCount),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />,
      },
      {
        name: MyLearningContentType.InMyList,
        item: getTabItem(MyLearningContentType.InMyList, inMyLectureAllCount),
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
        name: MyLearningContentType.PersonalCompleted,
        item: getTabItem(MyLearningContentType.PersonalCompleted, 0),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />,
      },
      {
        name: MyLearningContentType.Retry,
        item: getTabItem(MyLearningContentType.Retry, retryCount),
        render: () => <MyLearningListContainerV2 contentType={convertTabToContentType(currentTab)} />,
      },
    ] as TabItemModel[];
  };

  /*
    화면에 보여질 tabItem을 return 함. tabItem 은 하나의 컴포넌트 (element)
  */
  const getTabItem = (contentType: MyLearningContentType, count: number = 0) => {
    return (
      <>
        {MyLearningContentTypeName[contentType]}
        {(count > 0 && <span className="count">+{count}</span>) || <span className="count">0</span>}
      </>
    );
  };

  /*
    currentTab => MyLearningContentType으로 변환.
  */
  const convertTabToContentType = (tab: string) => {
    return MyLearningContentType[tab as MyLearningContentType];
  };

  const getContentNameFromTab = (tab: string) => {
    return MyLearningContentTypeName[tab as MyLearningContentType];
  };
  /* event handlers */

  // 탭 전환 시, 액션 로그를 생성하기 위해 routePath를 return 함.
  const onChangeTab = (tab: TabItemModel): string => {
    // 전환되는 탭에 따라, notie를 read 함.
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
    <ContentLayout className="myLearning" breadcrumb={[{ text: 'learning' }, { text: getContentNameFromTab(currentTab) }]}>
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
)
)(withRouter(observer(MyLearningPageV2)));

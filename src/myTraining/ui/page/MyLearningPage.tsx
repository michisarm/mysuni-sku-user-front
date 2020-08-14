
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout, Tab, TabItemModel } from 'shared';
import { ActionLogService, ActionEventService } from 'shared/stores';
import { NotieService } from 'notie/stores';
import { LectureService } from 'lecture/stores';

import routePaths from '../../routePaths';
import { InMyLectureService } from '../../stores';
import MyLearningContentType from '../model/MyLearningContentType';
import MyLearningContentTypeName from '../model/MyLearningContentTypeName';
import MyLearningContentHeaderContainer from '../logic/MyLearningContentHeaderContainer';
import MyLearningListContainer from '../logic/MyLearningListContainer';
import MyTrainingService from '../../present/logic/MyTrainingService';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  actionLogService?: ActionLogService,
  actionEventService: ActionEventService,
  notieService?: NotieService,
  lectureService: LectureService,
  inMyLectureService: InMyLectureService,
  myTrainingService: MyTrainingService,

}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'shared.actionEventService',
  'notie.notieService',
  'lecture.lectureService',
  'myTraining.inMyLectureService',
  'myTraining.myTrainingService',
))
@observer
@reactAutobind
class MyLearningPage extends Component<Props> {
  //
  componentDidMount(): void {
    //
    this.getNoties();
    this.publishViewEvent();
  }

  getNoties() {
    //
    const { myTrainingService, lectureService } = this.props;

    myTrainingService!.findAllTabMyTraining();

    //권장과정 갯수 조회
    lectureService!.countRequiredLectures();
  }

  publishViewEvent() {
    const {actionEventService} = this.props;
    const menu = `LEARNING_VIEW`;

    actionEventService.registerViewActionLog({menu});
  }

  getTabs() {
    //
    const { myTrainingService, inMyLectureService, lectureService } = this.props;

    const progressCount = myTrainingService!.inprogressCount;
    const enrolledCount = myTrainingService!.enrolledCount;
    const completedCount = myTrainingService!.completedCount;
    const missedCount = myTrainingService!.retryCount;

    const inMyLectureAllCount = inMyLectureService!.inMyLectureAllCount;
    const requiredLecturesCount = lectureService!.requiredLecturesCount;

    return [
      {
        name: MyLearningContentType.InProgress,
        item: this.getTabItem(MyLearningContentType.InProgress, progressCount),
        render: () => <MyLearningListContainer />,
      },
      {
        name: MyLearningContentType.InMyList,
        item: this.getTabItem(MyLearningContentType.InMyList, inMyLectureAllCount),
        render: () => <MyLearningListContainer />,
      },
      {
        name: MyLearningContentType.Required,
        className: 'division',
        item: this.getTabItem(MyLearningContentType.Required, requiredLecturesCount),
        render: () => <MyLearningListContainer />,
      },
      {
        name: MyLearningContentType.Enrolled,
        item: this.getTabItem(MyLearningContentType.Enrolled, enrolledCount),
        render: () => <MyLearningListContainer />,
      },
      {
        name: MyLearningContentType.Completed,
        item: this.getTabItem(MyLearningContentType.Completed, completedCount),
        render: () => <MyLearningListContainer />,
      },
      {
        name: MyLearningContentType.Retry,
        item: this.getTabItem(MyLearningContentType.Retry, missedCount),
        render: () => <MyLearningListContainer />,
      },
    ] as TabItemModel[];
  }

  getContentTypeName() {
    //
    const { params } = this.props.match;
    const contentType = params.tab as MyLearningContentType;

    return MyLearningContentTypeName[contentType];
  }

  getTabItem(contentType: MyLearningContentType, count: number = 0) {
    //
    return (
      <>
        {MyLearningContentTypeName[contentType]}
        {count > 0 && <span className="count">+{count}</span> || <span className="count">0</span>}
      </>
    );
  }

  onChangeTab(tab: TabItemModel): string {
    //
    const notieService = this.props.notieService!;
    const { history, actionLogService } = this.props;

    actionLogService?.registerClickActionLog({ subAction: MyLearningContentTypeName[tab.name as keyof typeof MyLearningContentType] });

    history.push(routePaths.learningTab(tab.name));

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
    }

    return routePaths.learningTab(tab.name);
  }

  render() {
    //
    const { params } = this.props.match;

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `Learning` },
          { text: `${this.getContentTypeName()}` },
        ]}
      >
        <MyLearningContentHeaderContainer />

        <Tab
          tabs={this.getTabs()}
          defaultActiveName={params.tab}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(MyLearningPage);

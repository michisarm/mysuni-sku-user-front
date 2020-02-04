
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout, Tab, TabItemModel } from 'shared';
import NotieService from 'layout/UserApp/present/logic/NotieService';
import routePaths from '../../routePaths';
import MyLearningContentType from '../model/MyLearningContentType';
import MyLearningContentTypeName from '../model/MyLearningContentTypeName';
import MyLearningContentHeaderContainer from '../logic/MyLearningContentHeaderContainer';
import MyLearningListContainer from '../logic/MyLearningListContainer';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  notieService?: NotieService,
}

@inject(mobxHelper.injectFrom(
  'layout.notieService',
))
@observer
@reactAutobind
class MyLearningPage extends Component<Props> {
  //
  componentDidMount(): void {
    //
    this.getNoties();
  }

  getNoties() {
    //
    const { notieService } = this.props;

    notieService!.countMenuNoties('Learning_Progress');
    notieService!.countMenuNoties('Learning_Passed');
    notieService!.countMenuNoties('Learning_Missed');
    notieService!.countMenuNoties('Learning_Waiting');
  }

  getTabs() {
    //
    const { notieService } = this.props;

    const progressCount = notieService!.progressedCount;
    const enrolledCount = notieService!.waitingCount;
    const completedCount = notieService!.completedCount;
    const missedCount = notieService!.missedCount;

    return [
      {
        name: MyLearningContentType.InProgress,
        item: this.getTabItem(MyLearningContentType.InProgress, progressCount),
        render: () => <MyLearningListContainer />,
      },
      {
        name: MyLearningContentType.InMyList,
        item: this.getTabItem(MyLearningContentType.InMyList),
        render: () => <MyLearningListContainer />,
      },
      {
        name: MyLearningContentType.Required,
        className: 'division',
        item: this.getTabItem(MyLearningContentType.Required),
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
        {count > 0 && <span className="count">+{count}</span>}
      </>
    );
  }

  onChangeTab(tab: TabItemModel) {
    //
    const notieService = this.props.notieService!;
    const { history } = this.props;

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

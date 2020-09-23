import React, {Component, useEffect, useState} from 'react';
import {mobxHelper, reactAutobind} from '@nara.platform/accent';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps, withRouter} from 'react-router';

import {ActionLogService} from 'shared/stores';
import {ContentLayout, Tab, TabItemModel} from 'shared';
import routePaths from '../../routePaths';
import MyPageContentType from '../model/MyPageContentTypeV2';
import MyPageContentHeaderContainer from '../logic/MyPageContentHeaderContainer';
import MyPageListContainer from '../logic/MyPageListContainerV2';

import MyApprovalListContainer from '../logic/MyApprovalListContainer';
import EarnedBadgeListContainer from '../../../certification/ui/logic/EarnedBadgeListContainer';
import BadgeService from '../../../certification/present/logic/BadgeService';
import MyBadgeContentType from '../../../certification/ui/model/MyBadgeContentType';

// import {ApprovalListBoard} from '../view/ApprovalListBoard';

interface Props extends RouteComponentProps<RouteParams> {
//interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  actionLogService?: ActionLogService
  badgeService?: BadgeService,

  profileMemberName: string,
}

interface State {
  subBreadcrumb: string
  completedCount: number
  earnedStampCount: number
}

interface RouteParams {
  tab: string
  pageNo: string
}

enum SubBreadcrumb {
  // CompletedList = '학습완료',
  //ApprovalList = '승인관리',
  EarnedBadgeList = 'My Badge',
  EarnedStampList = 'My Stamp',
}

@inject(mobxHelper.injectFrom('shared.actionLogService', 'badge.badgeService'))
@observer
@reactAutobind
class MyPagePageV2 extends Component<Props, State> {
  //
  state = {
    // 시작하는 탭 설정
    //subBreadcrumb: SubBreadcrumb.EarnedStampList,
    subBreadcrumb: SubBreadcrumb.EarnedBadgeList,
    completedCount: 0,
    earnedStampCount: 0,
  };


  componentDidMount(): void {
    //
    this.setSubBreadcrumb();
    this.initCountOfBadges();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.setSubBreadcrumb();
    }
  }

  setSubBreadcrumb() {
    //
    const { match } = this.props;

    this.setState({
      subBreadcrumb: (SubBreadcrumb as any)[match.params.tab] || '',
    });
  }

  initCountOfBadges() {
    //
    const { badgeService } = this.props;
    badgeService?.getCountOfBadges();
  }

  getTabs() {
    //
    const { completedCount, earnedStampCount  } = this.state;
    const { badgeService, profileMemberName, history, match } = this.props;

    return [
      // 0521 학습완료탭 삭제, MyBadge Add
      {
        name: MyBadgeContentType.EarnedBadgeList,
        item: (
          <>
            My Badge
            { <span className="count">+{badgeService?.earnedCount || 0} </span> }
          </>
        ),
        render: () => (
          <EarnedBadgeListContainer
            profileMemberName={profileMemberName}
            badgeCount={badgeService?.earnedCount || 0}
          />
        )
      },
      {
        name: MyPageContentType.EarnedStampList,
        item: (
          <>
            My Stamp
            <span className="count">{earnedStampCount > 0 ? `+${earnedStampCount}` : earnedStampCount}</span>
          </>
        ),
        render: () => (
          <MyPageListContainer
            contentType={MyPageContentType.EarnedStampList}
            onChangeCompletedCount={this.onChangeCompletedCount}
            onChangeEarnedStampCount={this.onChangeEarnedStampCount}
          />
        ),
      },
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel): string {
    //
    this.props.actionLogService?.registerClickActionLog({ subAction: (SubBreadcrumb as any)[tab.name] });
    this.props.history.push(routePaths.myPageTab(tab.name));

    return routePaths.myPageTab(tab.name);
  }

  onChangeCompletedCount(completedCount: number) {
    //
    this.setState({ completedCount });
  }

  onChangeEarnedStampCount(earnedStampCount: number) {
    //
    this.setState({ earnedStampCount });
  }

  render() {
    //
    const { params } = this.props.match;
    const { subBreadcrumb } = this.state;

    return (
      <ContentLayout
        className="MyPage"
        breadcrumb={[
          { text: 'MyPage' },
          { text: subBreadcrumb },
        ]}
      >
        <MyPageContentHeaderContainer />

        <Tab
          tabs={this.getTabs()}
          defaultActiveName={params.tab}
          onChangeTab={this.onChangeTab}
        />
      </ContentLayout>
    );
  }
}

export default withRouter(MyPagePageV2);

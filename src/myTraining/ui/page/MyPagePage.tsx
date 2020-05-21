import React, {Component} from 'react';
import {mobxHelper, reactAutobind} from '@nara.platform/accent';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps, withRouter} from 'react-router';

import {ActionLogService} from 'shared/stores';
import {ContentLayout, Tab, TabItemModel} from 'shared';
import routePaths from '../../routePaths';
import MyPageContentType from '../model/MyPageContentType';
import MyPageContentHeaderContainer from '../logic/MyPageContentHeaderContainer';
import MyPageListContainer from '../logic/MyPageListContainer';

import {ApprovalListBoard} from '../view/ApprovalListBoard';

interface Props extends RouteComponentProps<RouteParams> {
  actionLogService?: ActionLogService
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
  EarnedStampList = '보유스탬프',
  ApprovalList = '승인관리',
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
@observer
@reactAutobind
class MyPagePage extends Component<Props, State> {
  //
  state = {
    // 시작하는 탭 설정
    subBreadcrumb: SubBreadcrumb.EarnedStampList,
    completedCount: 0,
    earnedStampCount: 0,
  };


  componentDidMount(): void {
    //
    this.setSubBreadcrumb();
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

  getTabs() {
    //
    const { completedCount, earnedStampCount } = this.state;

    return [
      {
        name: MyPageContentType.EarnedStampList,
        item: (
          <>
            보유스탬프
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
      {
        name: MyPageContentType.ApprovalList,
        item: (
          <>
            승인관리
          </>
        ),
        render: () => (
          <ApprovalListBoard/>
        )
      }
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel) {
    //
    this.props.actionLogService?.registerClickActionLog({ subAction: (SubBreadcrumb as any)[tab.name] });
    this.props.history.push(routePaths.myPageTab(tab.name));
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

export default withRouter(MyPagePage);

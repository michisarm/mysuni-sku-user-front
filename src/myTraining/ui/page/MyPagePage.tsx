import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ContentLayout, Tab, TabItemModel } from 'shared';
import routePaths from '../../routePaths';
import MyPageContentType from '../model/MyPageContentType';
import MyPageContentHeaderContainer from '../logic/MyPageContentHeaderContainer';
import MyPageListContainer from '../logic/MyPageListContainer';


interface Props extends RouteComponentProps<RouteParams> {
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
  CompletedList = '학습완료',
  EarnedStampList = '보유스탬프',
}

@observer
@reactAutobind
class MyPagePage extends Component<Props, State> {
  //
  state = {
    subBreadcrumb: SubBreadcrumb.CompletedList,
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
        name: MyPageContentType.CompletedList,
        item: (
          <>
            학습완료
            <span className="count">{completedCount > 0 ? `+${completedCount}` : completedCount}</span>
          </>
        ),
        render: () => (
          <MyPageListContainer
            contentType={MyPageContentType.CompletedList}
            onChangeCompletedCount={this.onChangeCompletedCount}
            onChangeEarnedStampCount={this.onChangeEarnedStampCount}
          />
        ),
      },
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
    ] as TabItemModel[];
  }

  onChangeTab(tab: TabItemModel) {
    //
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

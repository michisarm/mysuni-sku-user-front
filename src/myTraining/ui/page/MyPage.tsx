
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ContentLayout } from 'shared';
import MyPageContentHeaderContainer from '../logic/MyPageContentHeaderContainer';
import MenuItemContainer from '../logic/MenuItemContainer';


interface Props extends RouteComponentProps<RouteParams> {
}

interface State {
  subBreadcrumb: string
}

interface RouteParams {
  tab: string
}

enum SubBreadcrumb {
  CompletedList = '학습완료',
  EarnedStampList = '보유스탬프',
}

@observer
@reactAutobind
class MyPage extends Component<Props, State> {
  //
  state = {
    subBreadcrumb: SubBreadcrumb.CompletedList,
  };

  componentDidMount(): void {
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


  render() {
    //
    const { subBreadcrumb } = this.state;

    return (
      <ContentLayout
        className = "MyPage"
        breadcrumb={[
          { text: 'MyPage' },
          { text: subBreadcrumb },
        ]}
      >
        <MyPageContentHeaderContainer />
        <MenuItemContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(MyPage);

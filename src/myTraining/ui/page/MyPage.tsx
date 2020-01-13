
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ContentLayout } from 'shared';
import TitleContainer from '../logic/TitleContainer';
import MenuItemContainer from '../logic/MenuItemContainer';
import FavoriteChannelContainer from '../logic/FavoriteChannelContainer';


interface Props extends RouteComponentProps<RouteParams> {
}

interface State {
  subBreadcrumb: string
}

interface RouteParams {
  tab: string
}

@observer
@reactAutobind
class MyPage extends Component<Props, State> {
  //
  state = {
    subBreadcrumb: 'CompletedList',
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
      subBreadcrumb: match.params.tab,
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
        <div className="main-info-area">
          <TitleContainer />
          <FavoriteChannelContainer />
        </div>

        <MenuItemContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(MyPage);

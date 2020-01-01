
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import { observer } from 'mobx-react';
import TitleContainer from '../logic/TitleContainer';
import MenuItemContainer from '../logic/MenuItemContainer';
import FavoriteChannelContainer from '../logic/FavoriteChannelContainer';

@observer
@reactAutobind
class MyPage extends Component {

  render() {
    return (
      <ContentLayout
        className = "MyPage"
        breadcrumb={[
          { text: 'MyPage' },
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

export default MyPage;

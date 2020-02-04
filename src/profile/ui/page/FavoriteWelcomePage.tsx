
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import FavoriteWelcomeContainer from '../logic/FavoriteWelcomeContainer';


@observer
@reactAutobind
class FavoriteWelcomePage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="bg-white"
      >
        <FavoriteWelcomeContainer />
      </ContentLayout>
    );
  }
}

export default FavoriteWelcomePage;

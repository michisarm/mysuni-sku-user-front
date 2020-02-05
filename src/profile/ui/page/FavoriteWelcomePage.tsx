
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import FavoriteWelcomeContainer from '../logic/FavoriteWelcomeContainer';
import FavoriteWelcomeMySuniIntroView from '../view/FavoriteWelcomeMySuniIntroView';
import FavoriteStartButtonView from '../view/FavoriteStartButtonView';


@observer
@reactAutobind
class FavoriteWelcomePage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="introduction login-set bg-white"
      >
        <FavoriteWelcomeContainer />
        <FavoriteWelcomeMySuniIntroView />
        <div className="start-wrap">
          <FavoriteStartButtonView />
        </div>
      </ContentLayout>
    );
  }
}

export default FavoriteWelcomePage;

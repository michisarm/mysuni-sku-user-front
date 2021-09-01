import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import FavoriteWelcomeContainer from '../logic/FavoriteWelcomeContainer';
import FavoriteWelcomeMySuniIntroView from '../view/FavoriteWelcomeMySuniIntroView';
import FavoriteStartButtonView from '../view/FavoriteStartButtonView';
import MySuniView from 'main/ui/view/MySuniView';

@observer
@reactAutobind
class FavoriteWelcomePage extends Component {
  //
  componentDidMount(): void {
    //
    document.body.classList.add('white');
  }

  componentWillUnmount(): void {
    //
    document.body.classList.remove('white');
  }

  render() {
    //
    return (
      <ContentLayout className="introduction login-set bg-white">
        <FavoriteWelcomeContainer />
        {/* <FavoriteWelcomeMySuniIntroView /> */}
        <MySuniView />
        <div className="start-wrap">
          <FavoriteStartButtonView />
        </div>
      </ContentLayout>
    );
  }
}

export default FavoriteWelcomePage;

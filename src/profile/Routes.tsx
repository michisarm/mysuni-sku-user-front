import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import GuideAgreementPage from './ui/page/GuideAgreementPage';
import PersonalInfoAgreementPage from './ui/page/PersonalInfoAgreementPage';

import FavoriteWelcomePage from './ui/page/FavoriteWelcomePage';
import FavoriteCollegePage from './ui/page/FavoriteCollegePage';
import CurrentJobPage from './ui/page/CurrentJobPage';
import CurrentJobRePage from './ui/page/CurrentJobRePage';
import FavoriteJobPage from './ui/page/FavoriteJobPage';
import FavoriteLearningTypePage from './ui/page/FavoriteLearningTypePage';

import ProgressPage from './ui/page/ProgressPage';

class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="/profile/guide" component={GuideAgreementPage} />
        <Route
          exact
          path="/profile/agreement"
          component={PersonalInfoAgreementPage}
        />
        <Route exact path="/profile/interest" component={FavoriteWelcomePage} />
        <Route
          exact
          path="/profile/interest/currentjob"
          component={CurrentJobPage}
        />
        <Route
          exact
          path="/profile/interest/favoritejob"
          component={FavoriteJobPage}
        />
        <Route
          exact
          path="/profile/interest/college"
          component={FavoriteCollegePage}
        />
        <Route
          exact
          path="/profile/interest/learningType"
          component={FavoriteLearningTypePage}
        />
        <Route
          exact
          path="/profile/interest/progress"
          component={ProgressPage}
        />
        <Route
          exact
          path="/profile/interest/currentjobRe"
          component={CurrentJobRePage}
        />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;

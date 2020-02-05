
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import PersonalInfoAgreementPage from './ui/page/PersonalInfoAgreementPage';

import FavoriteWelcomePage from './ui/page/FavoriteWelcomePage';
import FavoriteCollegePage from './ui/page/FavoriteCollegePage';
import FavoriteJobPage from './ui/page/FavoriteJobPage';
import FavoriteLearningTypePage from './ui/page/FavoriteLearningTypePage';

import ProgressPage from './ui/page/ProgressPage';


class ProfileRoutes extends React.PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="/profile/agreement" component={PersonalInfoAgreementPage} />

        <Route exact path="/profile/interest" component={FavoriteWelcomePage} />
        <Route exact path="/profile/interest/college" component={FavoriteCollegePage} />
        <Route exact path="/profile/interest/job" component={FavoriteJobPage} />
        <Route exact path="/profile/interest/learningType" component={FavoriteLearningTypePage} />
        <Route exact path="/profile/interest/progress" component={ProgressPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default ProfileRoutes;

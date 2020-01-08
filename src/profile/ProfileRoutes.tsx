
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import PisAgreementContainer from './ui/logic/PisAgreementContainer';
import FavoriteWelcomePage from './ui/page/FavoriteWelcomePage';
import FavoriteCollegeContainer from './ui/logic/FavoriteCollegeContainer';
import FavoriteJobContainer from './ui/logic/FavoriteJobContainer';
import FavoriteLearningTypeContainer from './ui/logic/FavoriteLearningTypeContainer';
import LoadingPage from './ui/page/LoadingPage';


class ProfileRoutes extends React.PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="/profile/agreement" component={PisAgreementContainer} />
        <Route exact path="/profile/interest" component={FavoriteWelcomePage} />
        <Route exact path="/profile/interest/college" component={FavoriteCollegeContainer} />
        <Route exact path="/profile/interest/job" component={FavoriteJobContainer} />
        <Route exact path="/profile/interest/learningType" component={FavoriteLearningTypeContainer} />
        <Route exact path="/profile/interest/loading" component={LoadingPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default ProfileRoutes;

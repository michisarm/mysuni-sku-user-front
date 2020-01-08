
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import UserMainPage from './ui/page/UserMainPage';
import IntroductionPage from './ui/page/IntroductionPage';


class MainRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="/" component={UserMainPage} />
        <Route exact path="/introduction" component={IntroductionPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;

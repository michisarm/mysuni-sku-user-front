
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
        <Redirect exact from="/introduction" to="/introduction/MySuni" />
        <Route exact path="/introduction/:tab" component={IntroductionPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;

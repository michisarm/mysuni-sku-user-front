import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import IntroductionPage from './ui/page/IntroductionPage';
import FavoriteChannel from './sub/FavoriteChannelChange/FavoriteChannelChangeContainer';
import UserMainPage from './ui/page/UserMainPage';

import CollegeView from './ui/view/CollegeView';
import CollegeInnerTabAi from './ui/view/CollegeInnerTabAi';
import CollegeInnerTabDt from './ui/view/CollegeInnerTabDt';

class Routes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect exact from="/" to="/pages/1" />
        <Route exact path="/pages/:pageNo" component={UserMainPage} />
        <Redirect exact from="/introduction" to="/introduction/MySuni" />
        <Route exact path="/introduction/:tab" component={IntroductionPage} />
        <Route exact path="/introduction/college" component={CollegeInnerTabDt} />
        <Route
          exact
          path="/empty"
          render={() => <div style={{ minHeight: 1000 }} />}
        />
        <Route
          exact
          path="/favorite/channel/change"
          component={FavoriteChannel}
        />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;

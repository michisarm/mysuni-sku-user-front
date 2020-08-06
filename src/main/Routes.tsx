
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import UserMainPageV2 from './ui/page/UserMainPageV2';
import IntroductionPage from './ui/page/IntroductionPage';
import FavoriteChannel from './sub/FavoriteChannelChange/FavoriteChannelChangeContainer';

class Routes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect exact from="/" to="/pages/1" />
        <Route exact path="/pages/:pageNo" component={UserMainPageV2} />
        <Redirect exact from="/introduction" to="/introduction/MySuni" />
        <Route exact path="/introduction/:tab" component={IntroductionPage} />
        <Route exact path="/empty" render={() => <div style={{ minHeight: 1000 }} />} />
        // by JSM
        <Route exact path="/favorite/channel/change" component={FavoriteChannel} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;

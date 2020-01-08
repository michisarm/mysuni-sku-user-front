
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import MyTrainingPage from './ui/page/MyTrainingPage';
import MyCommunityPage from './ui/page/MyCommunityPage';
import MyPage from './ui/page/MyPage';


class MainRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect exact from="/my-training" to="/my-training/InProgress" />
        <Route exact path="/my-training/:tab" component={MyTrainingPage} />

        <Redirect exact from="/my-training/community" to="/my-training/community/MyCommunity" />
        <Route exact path="/my-training/community/:tab" component={MyCommunityPage} />

        <Redirect exact from="/my-training/my-page" to="/my-training/my-page/CompletedList" />
        <Route exact path="/my-training/my-page/:tab" component={MyPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;

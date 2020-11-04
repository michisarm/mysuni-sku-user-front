
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import MyCommunityPage from './MyCommunityPage';
import OpenCommunityPage from './OpenCommunityPage';
import FollowPage from './FollowPage';


class MainRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="community/main" component={MyCommunityPage} />
        <Route exact path="community/main/open-communities" component={OpenCommunityPage} />
        <Route exact path="community/main/follow" component={FollowPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;

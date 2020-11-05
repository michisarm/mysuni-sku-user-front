
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import MyProfilePage from './MyProfilePage';
import MyProfileFeedPage from './MyProfileFeedPage';
import MyProfileCommunitiesPage from './MyProfileCommunitiesPage';
import MyProfileBookmarkPage from './MyProfileBookmarkPage';


class MyProfileRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="/community/my-profile" component={MyProfilePage} />
        <Route exact path="/community/my-profile/feed" component={MyProfileFeedPage} />
        <Route exact path="/community/my-profile/communities" component={MyProfileCommunitiesPage} />
        <Route exact path="/community/my-profile/bookmark" component={MyProfileBookmarkPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MyProfileRoutes;

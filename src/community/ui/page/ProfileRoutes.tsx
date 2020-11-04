
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import ProfilePage from './ProfilePage';
import ProfileFeedPage from './ProfileFeedPage';
import ProfileCommunitiesPage from './ProfileCommunitiesPage';


class ProfileRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="community/profile/:profileId" component={ProfilePage} />
        <Route exact path="community/profile/:profileId/feed" component={ProfileFeedPage} />
        <Route exact path="community/profile/:profileId/communities" component={ProfileCommunitiesPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default ProfileRoutes;


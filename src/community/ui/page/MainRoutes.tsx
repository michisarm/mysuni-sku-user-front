import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import MyCommunityPage from './MyCommunityPage';
import OpenCommunityPage from './OpenCommunityPage';
import FollowPage from './FollowPage';
import CommunityMainHeaderContainer from '../logic/CommunityMainHeaderContainer';
import { findProfile } from '../../api/communityApi';
import { setMyProfile } from '../../store/MyProfileStore';
import FollowModal from './FollowModalPage';

function MainRoutes() {
  useEffect(() => {
    findProfile().then(setMyProfile);
  }, []);

  return (
    <section className="content community">
      <CommunityMainHeaderContainer />
      <Switch>
        <Route exact path="/community/main" component={MyCommunityPage} />
        <Route
          exact
          path="/community/main/open-communities"
          component={OpenCommunityPage}
        />
        <Route exact path="/community/main/follow" component={FollowPage} />
        <Route path="/community/main/follow-modal" component={FollowModal} />

        <Route component={NotFoundPage} />
      </Switch>
    </section>
  );
}

export default MainRoutes;

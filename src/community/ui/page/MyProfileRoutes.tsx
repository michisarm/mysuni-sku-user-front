import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import MyProfilePage from './MyProfilePage';
import MyProfileFeedPage from './MyProfileFeedPage';
import MyProfileCommunitiesPage from './MyProfileCommunitiesPage';
import MyProfileBookmarkPage from './MyProfileBookmarkPage';
import { getCommunityProfile } from 'community/service/useCommunityProfile/utility/getCommunityProfile';
import CommunityMyProfileTitleContainer from '../logic/CommunityMyProfileTitleContainer';
import CommunityMyProfileMenuContainer from '../logic/CommunityMyProfileMenuContainer';
import { requestProfileCommunities } from '../../service/useCommunityProfile/utility/requestProfileCommunities';

const MyProfileRoutes: React.FC = function MyProfileRoutes() {
  //

  useEffect(() => {
    getCommunityProfile();
    requestProfileCommunities();
  }, []);

  return (
    <section className="content community profile">
      <CommunityMyProfileTitleContainer />
      <div>
        <CommunityMyProfileMenuContainer />
        <Switch>
          <Route exact path="/community/my-profile" component={MyProfilePage} />
          <Route
            exact
            path="/community/my-profile/feed"
            component={MyProfileFeedPage}
          />
          <Route
            exact
            path="/community/my-profile/communities"
            component={MyProfileCommunitiesPage}
          />
          <Route
            exact
            path="/community/my-profile/bookmark"
            component={MyProfileBookmarkPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </section>
  );
};

export default MyProfileRoutes;

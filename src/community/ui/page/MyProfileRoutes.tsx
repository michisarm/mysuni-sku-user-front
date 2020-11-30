import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import MyProfilePage from './MyProfilePage';
import ProfileFeedPage from './ProfileFeedPage';
import MyProfileCommunitiesPage from './MyProfileCommunitiesPage';
import MyProfileBookmarkPage from './MyProfileBookmarkPage';
import { getCommunityProfile } from 'community/service/useCommunityProfile/utility/getCommunityProfile';
import CommunityMyProfileTitleContainer from '../logic/CommunityMyProfileTitleContainer';
import CommunityMyProfileMenuContainer from '../logic/CommunityMyProfileMenuContainer';
import { requestProfileCommunities } from '../../service/useCommunityProfile/utility/requestProfileCommunities';
import { requestProfileFeeds } from '../../service/useCommunityProfile/utility/requestProfileFeeds';
import { requestProfileBookmarks } from 'community/service/useCommunityProfile/utility/requestProfileBookmarks';

const MyProfileRoutes: React.FC = function MyProfileRoutes() {
  //

  useEffect(() => {
    getCommunityProfile();
    requestProfileCommunities();
    requestProfileFeeds();
    requestProfileBookmarks();
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
            component={ProfileFeedPage}
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

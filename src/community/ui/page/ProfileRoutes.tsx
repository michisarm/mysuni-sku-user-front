import React, { useEffect, useState } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import ProfilePage from './ProfilePage';
import ProfileFeedPage from './ProfileFeedPage';
import ProfileCommunitiesPage from './ProfileCommunitiesPage';
import ReadOnlyProfileTitleView from '../view/CommunityProfile/ReadOnlyProfileTitleView';
import Profile from '../../model/Profile';
import OtherProfileMenuView from '../view/CommunityProfile/OtherProfileMenuView';
import { findCommunityProfile, findCommunityProfile_new } from '../../api/profileApi';
import OtherProfileView from '../view/CommunityProfile/OtherProfileView';
import { requestProfileFeeds } from 'community/service/useCommunityProfile/utility/requestProfileFeeds';
import { requestOtherProfileCommunities } from 'community/service/useCommunityProfile/utility/requestOtherProfileCommunities';

interface Params {
  profileId: string;
}

const ProfileRoutes: React.FC = function ProfileRoutes() {
  const [profile, setProfile] = useState<Profile>();
  const { profileId } = useParams<Params>();

  useEffect(() => {
    findCommunityProfile_new(profileId);
    findCommunityProfile(profileId).then(setProfile);
    requestOtherProfileCommunities(profileId);
    requestProfileFeeds(profileId);
  }, [profileId]);
  return (
    <section className="content community profile">
      <ReadOnlyProfileTitleView profile={profile} />
      <div>
        <OtherProfileMenuView />
        <Switch>
          <Route
            exact
            path="/community/profile/:profileId"
            component={() => <OtherProfileView profile={profile} />}
          />
          <Route
            exact
            path="/community/profile/:profileId/feed"
            component={() => ProfileFeedPage(profileId)}
          />
          <Route
            exact
            path="/community/profile/:profileId/communities"
            component={ProfileCommunitiesPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </section>
  );
};

export default ProfileRoutes;

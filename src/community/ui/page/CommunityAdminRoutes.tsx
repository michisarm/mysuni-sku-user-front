import React, { useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

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
import CommunityAdminMenuContainer from '../logic/CommunityAdminMenuContainer';
import { Segment } from 'semantic-ui-react';
import AdminMemberPage from './AdminMemberPage';
import AdminTitleView from '../view/CommunityAdmin/AdminTitleView';

interface Params {
  communityId: string;
}

const CommunityAdminRoutes: React.FC = function CommunityAdminRoutes() {
  //
  const { communityId } = useParams<Params>();

  // useEffect(() => {
  //   getCommunityProfile();
  //   requestProfileCommunities();
  //   requestProfileFeeds('');
  //   requestProfileBookmarks();
  // }, []);
  
  useEffect(() => {
    // requestCommunity(communityId);
    // requestCommunityMenus(communityId);
    console.log('CommunityAdminRoutes communityId', communityId);
  }, [communityId]);

  return (
    <section className="content admin">
      <div>
        <AdminTitleView communityId={communityId}/>
        <Segment className="full">
          <div className="admin-container">              
            <CommunityAdminMenuContainer />
            <Switch>
              <Route exact path="/community/admin/:communityId/memberManagement/member" component={()=>AdminMemberPage(communityId)} />
              <Route
                exact
                path="/community/my-profile/feed"
                component={()=>ProfileFeedPage('')}
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
        </Segment>          
      </div>
    </section>
  );
};

export default CommunityAdminRoutes;

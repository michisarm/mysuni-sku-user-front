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
import { requestCommunity } from 'community/service/useCommunityHome/requestCommunity';
import AdminMemberRegisterPage from './AdminMemberRegisterPage';
import AdminGroupPage from './AdminGroupPage';
import AdminGroupCreatePage from './AdminGroupCreatePage';
import AdminHomePage from './AdminHomePage';

import CommunityMenuPage from './CommunityMenuPage';

interface Params {
  communityId: string;
}

const CommunityAdminRoutes: React.FC = function CommunityAdminRoutes() {
  //
  const { communityId  } = useParams<Params>();
  

  useEffect(() => {
    requestCommunity(communityId);
    // requestCommunityMenus(communityId);
  }, [communityId]);

  return (
        <section className="content admin">
          <div>
            <AdminTitleView communityId={communityId} />
            <Segment className="full">
              <div className="admin-container">
                <CommunityAdminMenuContainer />
                <Switch>
                  <Route exact path="/community/admin/:communityId/memberManagement/member" component={()=>AdminMemberPage(communityId,true,'')} />
                  <Route exact path="/community/admin/:communityId/memberManagement/memberJoin" component={()=>AdminMemberPage(communityId,false,'')} />
                  <Route exact path="/community/admin/:communityId/memberManagement/memberRegister" component={()=>AdminMemberRegisterPage(communityId,false)} />
                  <Route exact path="/community/admin/:communityId/memberManagement/group" component={()=>AdminGroupPage(communityId)} />
                  <Route
                    exact
                    path="/community/admin/:communityId/memberManagement/group/create"
                    component={AdminGroupCreatePage}
                  />        
                  <Route
                    exact
                    path="/community/admin/:communityId/memberManagement/group/detail/:groupId"
                    component={()=>AdminGroupCreatePage(communityId)}
                  />
                  <Route
                    exact
                    path="/community/admin/:communityId/homeManagement"
                    component={() => AdminHomePage(communityId)}
                  />                     
                  <Route exact path="/community/admin/:communityId/menuManagement" component={()=>CommunityMenuPage(communityId)} />
                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </Segment>
          </div>
        </section>
  );
};

export default CommunityAdminRoutes;

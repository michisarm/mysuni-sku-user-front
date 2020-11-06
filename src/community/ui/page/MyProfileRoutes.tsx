
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import MyProfilePage from './MyProfilePage';
import MyProfileFeedPage from './MyProfileFeedPage';
import MyProfileCommunitiesPage from './MyProfileCommunitiesPage';
import MyProfileBookmarkPage from './MyProfileBookmarkPage';
import TitleArea from '../view/CommunityProfile/ProfileTitleView';
import { useCommunityProfile } from 'community/service/useCommunityProfile/useCommunityProfile';
import { getCommunityProfile } from 'community/service/useCommunityProfile/utility/getCommunityProfile';
import CommunityMyProfileTitleContainer from '../logic/CommunityMyProfileTitleContainer';


class MyProfileRoutes extends React.Component {
  //

  componentDidMount() {
    getCommunityProfile();
  }

  render() {
    //
    return (
      <section className="content community profile">
        <CommunityMyProfileTitleContainer />
        <Switch>
          <Route exact path="/community/my-profile" component={MyProfilePage} />
          <Route exact path="/community/my-profile/feed" component={MyProfileFeedPage} />
          <Route exact path="/community/my-profile/communities" component={MyProfileCommunitiesPage} />
          <Route exact path="/community/my-profile/bookmark" component={MyProfileBookmarkPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </section>
    );
  }
}

export default MyProfileRoutes;

import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import MyCommunityPage from './MyCommunityPage';
import OpenCommunityPage from './OpenCommunityPage';
import FollowPage from './FollowPage';
import CommunityMainHeaderContainer from '../logic/CommunityMainHeaderContainer';
import { findProfile } from '../../api/communityApi';
import { setMyProfile } from '../../store/MyProfileStore';
import {
  requestMyCommunityList,
  requestMyCommunityPostList,
} from '../../service/useMyCommunityIntro/utility/requestMyCommunityIntro';
import {
  requestFieldList,
  requestOpenCommunityList,
} from '../../service/useOpenCommunityIntro/utility/requestOpenCommunityIntro';
import {
  setMyCommunityIntro,
  setOpenCommunityIntro,
} from '../../store/CommunityMainStore';
import { getEmptyMyCommunityIntro } from '../../viewModel/MyCommunityIntro/MyCommunityIntro';
import { getEmptyOpenCommunityIntro } from '../../viewModel/OpenCommunityIntro/OpenCommunityIntro';

function MainRoutes() {
  useEffect(() => {
    findProfile().then(setMyProfile);
    requestMyCommunityList();
    requestMyCommunityPostList();
    requestFieldList();
    requestOpenCommunityList();

    return () => {
      setMyProfile();
      setMyCommunityIntro(getEmptyMyCommunityIntro());
      setOpenCommunityIntro(getEmptyOpenCommunityIntro());
    };
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

        <Route component={NotFoundPage} />
      </Switch>
    </section>
  );
}

export default MainRoutes;

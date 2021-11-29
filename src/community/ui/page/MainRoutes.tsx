import React from 'react';
import { MainHeaderView } from '../main/MainHeaderView';
import { Switch, Redirect, Route } from 'react-router-dom';
import { MainInitializer } from '../main/MainInitializer';
import OpenCommunityPage from '../main/opencommunity/OpenCommunityPage';
import { FollowPage } from '../main/follow/FollowPage';
import { MyCommunityPage } from '../main/mycommunity/MyCommunityPage';
import { MyFeedPage } from '../main/myfeed/MyFeedPage';
import { BookMarkPage } from '../main/bookmark/BookMarkPage';
import { RedirectCommunityPage } from '../main/mycommunity/RedirectCommunityPage';
// import { CommunityHeader, LMSHeader } from '../header/Header';
// import { checkExternalInstructor } from '../app.services';

export function MainRoutes() {
  return (
    <>
      {/* {checkExternalInstructor() && <CommunityHeader />}
      {!checkExternalInstructor() && <LMSHeader />} */}
      <section className="content community">
        <MainInitializer />
        <MainHeaderView />
        <Switch>
          <Redirect exact path="/community" to={MAIN_MYCOMMUNITIES_PATH} />
          <Redirect exact path={MAIN_PATH} to={MAIN_MYCOMMUNITIES_PATH} />
          <Route
            exact
            path={MAIN_MYCOMMUNITIES_PATH}
            component={MyCommunityPage}
          />
          <Route
            exact
            path={MAIN_OPENCOMMUNITIES_PATH}
            component={OpenCommunityPage}
          />
          <Route exact path={MAIN_MYFEED_PATH} component={MyFeedPage} />
          <Route exact path={MAIN_FOLLOWFEED_PATH} component={FollowPage} />
          <Route exact path={MAIN_BOOKMARK_PATH} component={BookMarkPage} />
          <Route
            path="/community/:communityId"
            component={RedirectCommunityPage}
          />
          <Redirect to={MAIN_MYCOMMUNITIES_PATH} />
        </Switch>
      </section>
    </>
  );
}

export const MAIN_PATH = '/community/main';
export const MAIN_MYCOMMUNITIES_PATH = '/community/main/my-communities';
export const MAIN_OPENCOMMUNITIES_PATH = '/community/main/open-communities';
export const MAIN_MYFEED_PATH = '/community/main/my-feed';
export const MAIN_FOLLOWFEED_PATH = '/community/main/follow-feed';
export const MAIN_BOOKMARK_PATH = '/community/main/bookmark';

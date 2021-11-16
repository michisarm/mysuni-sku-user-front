import React, { useContext, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import { MainRoutes } from './ui/page/MainRoutes';
import MyProfileRoutes from './ui/page/MyProfileRoutes';
import ProfileRoutes from './ui/page/ProfileRoutes';
import CommunityRoutes from './ui/page/CommunityRoutes';
import CommunityPreviewPage from './ui/page/CommunityPreviewPage';
import AppContext from '../layout/UserApp/ui/logic/AppContext';
import CommunityAdminRoutes from './ui/page/CommunityAdminRoutes';

const Routes = function Routes() {
  // const {
  //   breadcrumb: { setBreadcrumb },
  // } = useContext(AppContext);
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   setBreadcrumb([
  //     { text: 'community', path: '/community/main/my-communities' },
  //   ]);
  // }, [pathname]);

  return (
    <Switch>
      <Route path="/community" component={MainRoutes} />
      {/* <Route path="/community/my-profile" component={MyProfileRoutes} />
      <Route path="/community/profile/:profileId" component={ProfileRoutes} />
      <Route
        exact
        path="/community/:communityId/preview"
        component={CommunityPreviewPage}
      />
      <Route
        path="/community/admin/:communityId"
        component={CommunityAdminRoutes}
      />
      <Route path="/community/:communityId" component={CommunityRoutes} />
      <Route component={NotFoundPage} /> */}
    </Switch>
  );
};

export default Routes;

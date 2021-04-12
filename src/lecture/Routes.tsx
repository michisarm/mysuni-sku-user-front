import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from 'layout/NotFoundPage';
import CollegeLecturesPage from './category/ui/page/CollegeLecturesPage';
import ChannelLecturesPage from './category/ui/page/ChannelLecturesPage';
import ChannelsLecturesPage from './recommend/ui/page/ChannelsPage';
import RecommendChannelLecturesPage from './recommend/ui/page/ChannelLecturesPage';
import LectureDetailRoutes from './detail/LectureDetailRoutes';

function Routes() {
  return (
    <Switch>
      {/* category */}
      <Redirect
        exact
        from="/lecture/college/:collegeId/channels"
        to="/lecture/college/:collegeId/channels/pages/1"
      />

      <Route
        exact
        path="/lecture/college/:collegeId/channels/pages/:pageNo"
        component={CollegeLecturesPage}
      />

      <Route
        exact
        path="/lecture/college/:collegeId/channel/:channelId"
        component={ChannelLecturesPage}
      />

      <Route path="/lecture/card/:cardId" component={LectureDetailRoutes} />
      {/* recommend */}
      <Redirect
        exact
        from="/lecture/recommend"
        to="/lecture/recommend/pages/1"
      />
      <Route
        exact
        path="/lecture/recommend/pages/:pageNo"
        component={ChannelsLecturesPage}
      />

      <Redirect
        exact
        from="/lecture/recommend/channel/:channelId"
        to="/lecture/recommend/channel/:channelId/pages/1"
      />
      <Route
        exact
        path="/lecture/recommend/channel/:channelId/pages/:pageNo"
        component={RecommendChannelLecturesPage}
      />

      {/* community  */}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes;

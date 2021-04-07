import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from 'layout/NotFoundPage';
import CollegeLecturesPage from './category/ui/page/CollegeLecturesPage';
import ChannelLecturesPage from './category/ui/page/ChannelLecturesPage';
import ChannelsLecturesPage from './recommend/ui/page/ChannelsPage';
import RecommendChannelLecturesPage from './recommend/ui/page/ChannelLecturesPage';
import PostFormPage from './community/ui/page/PostFormPage';
import PostDetailPage from './community/ui/page/PostDetailPage';
import ReplyFormPage from './community/ui/page/ReplyFormPage';
import ReplyDetailPage from './community/ui/page/ReplyDetailPage';
import LectureDetailCubeRoutes from './detail/LectureDetailCubeRoutes';
import LectureDetailCourseRoutes from './detail/LectureDetailCourseRoutes';

class Routes extends Component {
  //
  render() {
    //
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

        <Route
          path="/lecture/card/:cardId/cube/:cubeId/:viewType/:cubeType"
          component={LectureDetailCubeRoutes}
        />

        <Route
          path="/lecture/card/:cardId/:viewType"
          component={LectureDetailCourseRoutes}
        />
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
}

export default Routes;

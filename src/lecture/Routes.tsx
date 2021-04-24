import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from 'layout/NotFoundPage';
import CollegeLecturesPage from './category/ui/page/CollegeLecturesPage';
import ChannelLecturesPage from './category/ui/page/ChannelLecturesPage';
import RecommendRoutes from './recommend/Routes';
import LectureDetailRoutes from './detail/LectureDetailRoutes';
import OldCoursePage from './detail/ui/logic/OldCoursePage';
import OldCubePage from './detail/ui/logic/OldCubePage';

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
          path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId"
          component={OldCoursePage}
        />
        <Route
          path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId"
          component={OldCoursePage}
        />

        <Route
          path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
          component={OldCubePage}
        />
        <Route
          path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
          component={OldCubePage}
        />

        <Route path="/lecture/card/:cardId" component={LectureDetailRoutes} />

        {/* recommend */}
        <Route path="/lecture/recommend" component={RecommendRoutes} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;

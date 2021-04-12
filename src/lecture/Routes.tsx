import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from 'layout/NotFoundPage';
import CollegeLecturesPage from './category/ui/page/CollegeLecturesPage';
import ChannelLecturesPage from './category/ui/page/ChannelLecturesPage';
import RecommendRoutes from './recommend/Routes';
import LectureDetailRoutes from './detail/LectureDetailRoutes';

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

        <Route path="/lecture/card/:cardId" component={LectureDetailRoutes} />

        {/* recommend */}
        <Route path="/lecture/recommend" component={RecommendRoutes} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;

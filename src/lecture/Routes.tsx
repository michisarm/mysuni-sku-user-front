import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFoundPage from 'layout/NotFoundPage';
import CollegeLecturesPage from './category/ui/page/CollegeLecturesPage';
import ChannelLecturesPage from './category/ui/page/ChannelLecturesPage';
import CoursePageV2 from './category/ui/page/CoursePageV2';
import LectureCardPage from './category/ui/page/LectureCardPage';
import ChannelsLecturesPage from './recommend/ui/page/ChannelsPage';
import RecommendChannelLecturesPage from './recommend/ui/page/ChannelLecturesPage';
import PostFormPage from './community/ui/page/PostFormPage';
import PostDetailPage from './community/ui/page/PostDetailPage';
import ReplyFormPage from './community/ui/page/ReplyFormPage';
import ReplyDetailPage from './community/ui/page/ReplyDetailPage';
import LectureStructureContainer from './detail/ui/logic/LectureStructureContainer';
import LectureDetailContainer from './detail/ui/logic/LectureDetailContainer';

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
          exact
          path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId"
          component={CoursePageV2}
        />
        <Route
          exact
          path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId"
          component={CoursePageV2}
        />

        <Route
          exact
          path="/lecture/cineroom/:cineroomId/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId/new"
          component={LectureDetailContainer}
        />

        <Route
          exact
          path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
          component={LectureCardPage}
        />
        <Route
          exact
          path="/lecture/cineroom/:cineroomId/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId"
          component={LectureCardPage}
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
        <Route
          exact
          path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/new"
          component={PostFormPage}
        />
        <Route
          exact
          path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId"
          component={PostDetailPage}
        />
        <Route
          exact
          path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/edit"
          component={PostFormPage}
        />
        <Route
          exact
          path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/new"
          component={ReplyFormPage}
        />
        <Route
          exact
          path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/:replyId"
          component={ReplyDetailPage}
        />
        <Route
          exact
          path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/:replyId/edit"
          component={ReplyFormPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;


import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import CollegeLecturesPage from './category/ui/page/CollegeLecturesPage';
import ChannelLecturesPage from './category/ui/page/ChannelLecturesPage';
import CoursePage from './category/ui/page/CoursePage';
import LectureCardPage from './category/ui/page/LectureCardPage';

import ChannelsLecturesPage from './recommend/ui/page/ChannelsLecturesPage';
import RecommendChannelLecturesPage from './recommend/ui/page/ChannelLecturesPage';

import PostFormPage from './community/ui/page/PostFormPage';
import PostDetailPage from './community/ui/page/PostDetailPage';
import ReplyFormPage from './community/ui/page/ReplyFormPage';
import ReplyDetailPage from './community/ui/page/ReplyDetailPage';


class LectureRoutes extends Component {
  //
  render() {
    //
    return (
      <Switch>
        {/* category */}
        <Redirect exact from="/lecture/college/:collegeId/channels" to="/lecture/college/:collegeId/channels/pages/1" />
        <Route exact path="/lecture/college/:collegeId/channels/pages/:pageNo" component={CollegeLecturesPage} />

        <Route exact path="/lecture/college/:collegeId/channel/:channelId" component={ChannelLecturesPage} />
        <Route exact path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId" component={CoursePage} />
        <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId" component={LectureCardPage} />

        {/* recommend */}
        <Route exact path="/lecture/recommend" component={ChannelsLecturesPage} />
        <Redirect exact from="/lecture/recommend/channel/:channelId" to="/lecture/recommend/channel/:channelId/pages/1" />
        <Route exact path="/lecture/recommend/channel/:channelId/pages/:pageNo" component={RecommendChannelLecturesPage} />

        {/* community  */}
        <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/new" component={PostFormPage} />
        <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId" component={PostDetailPage} />
        <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/edit" component={PostFormPage} />
        <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/new" component={ReplyFormPage} />
        <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/:replyId" component={ReplyDetailPage} />
        <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/:replyId/edit" component={ReplyFormPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default LectureRoutes;
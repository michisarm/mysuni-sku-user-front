
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import MainRoutes from './ui/page/MainRoutes';
import CommunityHomePage from './ui/page/CommunityHomePage';
import AllPostsPage from './ui/page/AllPostsPage';
import NoticePostsPage from './ui/page/NoticePostsPage';
import PostsPage from './ui/page/PostsPage';
import CreatePostPage from './ui/page/CreatePostPage';
import BasicPostPage from './ui/page/BasicPostPage';
import DataPostPage from './ui/page/DataPostPage';
import DiscussionPostPage from './ui/page/DiscussionPostPage';
import SurveyPostPage from './ui/page/SurveyPostPage';
import MemberRoutes from './ui/page/MemberRoutes';
import MyProfileRoutes from './ui/page/MyProfileRoutes';
import ProfileRoutes from './ui/page/ProfileRoutes';

class Routes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Route path="/community/main" component={MainRoutes} />
        <Route path="/community/my-profile" component={MyProfileRoutes} />
        <Route path="/community/profile/:profileId" component={ProfileRoutes} />

        <Route exact path="/community/cineroom/:cineroomId/college/:collegeId/:communityId" component={CommunityHomePage} />
        <Route exact path="/community/cineroom/:cineroomId/college/:collegeId/:communityId/all" component={AllPostsPage} />
        <Route exact path="/community/cineroom/:cineroomId/college/:collegeId/:communityId/notice" component={NoticePostsPage} />
        <Route exact path="/community/cineroom/:cineroomId/college/:collegeId/:communityId/board/:menuId" component={PostsPage} />
        <Route exact path="/community/cineroom/:cineroomId/college/:collegeId/:communityId/board/:menuId/create" component={CreatePostPage} />
        <Route exact path="/community/cineroom/:cineroomId/college/:collegeId/:communityId/post/:postId" component={BasicPostPage} />
        <Route exact path="/community/cineroom/:cineroomId/college/:collegeId/:communityId/data/:postId" component={DataPostPage} />
        <Route exact path="/community/cineroom/:cineroomId/college/:collegeId/:communityId/discussion/:postId" component={DiscussionPostPage} />
        <Route exact path="/community/cineroom/:cineroomId/college/:collegeId/:communityId/poll/:postId" component={SurveyPostPage} />
        <Route path="/community/cineroom/:cineroomId/college/:collegeId/:communityId/member" component={MemberRoutes} />


        <Route exact path="/community/college/:collegeId/:communityId" component={CommunityHomePage} />
        <Route exact path="/community/college/:collegeId/:communityId/all" component={AllPostsPage} />
        <Route exact path="/community/college/:collegeId/:communityId/notice" component={NoticePostsPage} />
        <Route exact path="/community/college/:collegeId/:communityId/board/:menuId" component={PostsPage} />
        <Route exact path="/community/college/:collegeId/:communityId/board/:menuId/create" component={CreatePostPage} />
        <Route exact path="/community/college/:collegeId/:communityId/post/:postId" component={BasicPostPage} />
        <Route exact path="/community/college/:collegeId/:communityId/data/:postId" component={DataPostPage} />
        <Route exact path="/community/college/:collegeId/:communityId/discussion/:postId" component={DiscussionPostPage} />
        <Route exact path="/community/college/:collegeId/:communityId/poll/:postId" component={SurveyPostPage} />
        <Route path="/community/college/:collegeId/:communityId/member" component={MemberRoutes} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;

// 커뮤니티 홈
// community/cineroom/:cineroomId/college/:collegeId/:communityId

// 커뮤니티 게시글 목록
// community/cineroom/:cineroomId/college/:collegeId/:communityId/all
// community/cineroom/:cineroomId/college/:collegeId/:communityId/notice
// community/cineroom/:cineroomId/college/:collegeId/:communityId/board/:menuId

// 커뮤니티 게시글 등록
// community/cineroom/:cineroomId/college/:collegeId/:communityId/board/:menuId/create

// 커뮤니티 게시글 상세
// community/cineroom/:cineroomId/college/:collegeId/:communityId/post/:postId
// community/cineroom/:cineroomId/college/:collegeId/:communityId/data/:postId
// community/cineroom/:cineroomId/college/:collegeId/:communityId/discussion/:postId
// community/cineroom/:cineroomId/college/:collegeId/:communityId/poll/:postId

// 커뮤니티 멤버
// community/cineroom/:cineroomId/college/:collegeId/:communityId/member
// community/cineroom/:cineroomId/college/:collegeId/:communityId/member/group
// community/cineroom/:cineroomId/college/:collegeId/:communityId/member/approve

// 커뮤니티 프로필
// community/my-profile
// community/my-profile/feed
// community/my-profile/communities
// community/my-profile/bookmark

// community/profile/:profileId
// community/profile/:profileId/feed
// community/profile/:profileId/communities


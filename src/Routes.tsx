
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { withSplitting, UserApp, AppLayout } from './shared';
import NotFoundPage from './layout/NotFoundPage';
import { CollegeLecturesPage } from './lecture';


class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UserApp>
          <Switch>

            <Route
              path="/profile"
              render={() => (
                <Switch>
                  {/* profile */}
                  <Route exact path="/profile/agreement" component={withSplitting(() => import('./profile').then(({ PisAgreementContainer }) => PisAgreementContainer))} />
                  <Route exact path="/profile/interest" component={withSplitting(() => import('./profile').then(({ FavoriteWelcomePage }) => FavoriteWelcomePage))} />
                  <Route exact path="/profile/interest/college" component={withSplitting(() => import('./profile').then(({ FavoriteCollegeContainer }) => FavoriteCollegeContainer))} />
                  <Route exact path="/profile/interest/job" component={withSplitting(() => import('./profile').then(({ FavoriteJobContainer }) => FavoriteJobContainer))} />
                  <Route exact path="/profile/interest/learningType" component={withSplitting(() => import('./profile').then(({ FavoriteLearningTypeContainer }) => FavoriteLearningTypeContainer))} />
                  <Route exact path="/profile/interest/loading" component={withSplitting(() => import('./profile').then(({ LoadingPage }) => LoadingPage))} />

                  <Route component={NotFoundPage} />
                </Switch>
              )}
            />

            <Route
              path="/"
              render={() => (
                <AppLayout>
                  <Switch>
                    {/* main */}
                    <Route exact path="/" component={withSplitting(() => import('./main').then(({ UserMainPage }) => UserMainPage))} />

                    {/* create */}
                    <Redirect exact from="/personalcube/create" to="/personalcube/create/Create" />
                    <Route exact path="/personalcube/create/:tab" component={withSplitting(() => import('./create').then(({ CreateContainer }) => CreateContainer))} />
                    <Route exact path="/personalcube/create-detail" component={withSplitting(() => import('./create').then(({ CreateDetailContainer }) => CreateDetailContainer))} />
                    <Route exact path="/personalcube/create-detail/:personalCubeId/:cubeType" component={withSplitting(() => import('./create').then(({ CreateDetailContainer }) => CreateDetailContainer))} />
                    <Route exact path="/personalcube/create-intro/:personalCubeId/:cubeType" component={withSplitting(() => import('./create').then(({ CreateIntroContainer }) => CreateIntroContainer))} />
                    <Route exact path="/personalcube/shared-detail/:personalCubeId/:cubeType/:cubeState" component={withSplitting(() => import('./create').then(({ SharedDetailContainer }) => SharedDetailContainer))} />

                    {/* lecture  */}
                    <Redirect exact from="/lecture/college/:collegeId/channels" to="/lecture/college/:collegeId/channels/pages/1" />
                    <Route exact path="/lecture/college/:collegeId/channels/pages/:pageNo" component={CollegeLecturesPage} />

                    <Route exact path="/lecture/college/:collegeId/channel/:channelId" component={withSplitting(() => import('./lecture').then(({ ChannelLecturesPage }) => ChannelLecturesPage))} />
                    <Route exact path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId" component={withSplitting(() => import('./lecture').then(({ CoursePage }) => CoursePage))} />
                    <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId" component={withSplitting(() => import('./lecture').then(({ LectureCardPage }) => LectureCardPage))} />

                    {/* lecture - recommend */}
                    <Route exact path="/lecture/recommend" component={withSplitting(() => import('./lecture').then(({ ChannelsLecturesPage }) => ChannelsLecturesPage))} />
                    <Route exact path="/lecture/recommend/channel/:channelId" component={withSplitting(() => import('./lecture').then(({ RecommendChannelLecturesPage }) => RecommendChannelLecturesPage))} />

                    {/* community  */}
                    <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/new" component={withSplitting(() => import('./personalcube').then(({ PostFormPage }) => PostFormPage))} />
                    <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId" component={withSplitting(() => import('./personalcube').then(({ PostDetailPage }) => PostDetailPage))} />
                    <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/edit" component={withSplitting(() => import('./personalcube').then(({ PostFormPage }) => PostFormPage))} />
                    <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/new" component={withSplitting(() => import('./personalcube').then(({ ReplyFormPage }) => ReplyFormPage))} />
                    <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/:replyId" component={withSplitting(() => import('./personalcube').then(({ ReplyDetailPage }) => ReplyDetailPage))} />
                    <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/:replyId/edit" component={withSplitting(() => import('./personalcube').then(({ ReplyFormPage }) => ReplyFormPage))} />

                    {/* board */}
                    <Route exact path="/board/support/:boardId" component={withSplitting(() => import('./board').then(({ BookMainContainer }) => BookMainContainer))} />
                    <Route exact path="/board/support/notice-detail/:postId" component={withSplitting(() => import('./board').then(({ NoticeDetailContainer }) => NoticeDetailContainer))} />
                    <Route exact path="/board/support/faq-detail/:postId" component={withSplitting(() => import('./board').then(({ FaqDetailContainer }) => FaqDetailContainer))} />
                    <Route exact path="/board/support-qna" component={withSplitting(() => import('./board').then(({ QnaRegisterContainer }) => QnaRegisterContainer))} />
                    <Route exact path="/board/support/qna-detail/:postId" component={withSplitting(() => import('./board').then(({ QnaDetailContainer }) => QnaDetailContainer))} />
                    <Route exact path="/board/support/answered-detail/:postId" component={withSplitting(() => import('./board').then(({ AnsweredDetailContainer }) => AnsweredDetailContainer))} />


                    {/* mypage */}
                    <Redirect exact from="/my-training" to="/my-training/InProgress" />
                    <Route exact path="/my-training/:tab" component={withSplitting(() => import('./mypage').then(({ MyTrainingPage }) => MyTrainingPage))} />

                    <Redirect exact from="/community" to="/community/MyCommunity" />
                    <Route exact path="/community/:tab" component={withSplitting(() => import('./mypage').then(({ MyCommunityPage }) => MyCommunityPage))} />

                    <Redirect exact from="/mypage" to="/mypage/CompletedList" />
                    <Route exact path="/mypage/:tab" component={withSplitting(() => import('./mypage').then(({ MyPage }) => MyPage))} />

                    {/*  expert */}
                    <Route exact path="/expert/instructor/:instructorId" component={withSplitting(() => import('./expert').then(({ ExpertContainer }) => ExpertContainer))} />

                    <Route component={NotFoundPage} />
                  </Switch>
                </AppLayout>
              )}
            />
          </Switch>
        </UserApp>
      </BrowserRouter>
    );
  }
}

export default Routes;

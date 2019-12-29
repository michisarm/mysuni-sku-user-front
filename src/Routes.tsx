
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as shared from 'shared';

import MyLearningDetailDesign from './design/Learning/MyLearningDetailInProgress';

const UserApp = shared.UserApp;
const withSplitting = shared.withSplitting;


class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UserApp>
          <Switch>
            {/* main */}
            <Route exact path="/" component={withSplitting(() => import('./main').then(({ UserMainPage }) => UserMainPage))} />

            {/* course  */}

            {/*create*/}

            <Route exact path="/personalcube/create" component={withSplitting(() => import('./create').then(({ CreateContainer }) => CreateContainer))} />
            <Route exact path="/personalcube/create-detail" component={withSplitting(() => import('./create').then(({ CreateDetailContainer }) => CreateDetailContainer))} />
            <Route exact path="/personalcube/create-detail/:personalCubeId/:cubeType" component={withSplitting(() => import('./create').then(({ CreateDetailContainer }) => CreateDetailContainer))} />
            <Route exact path="/personalcube/create-intro/:personalCubeId/:cubeType" component={withSplitting(() => import('./create').then(({ CreateIntroContainer }) => CreateIntroContainer))} />
            <Route exact path="/personalcube/shared-detail/:personalCubeId/:cubeType/:cubeState" component={withSplitting(() => import('./create').then(({ SharedDetailContainer }) => SharedDetailContainer))} />

            {/* lecture  */}
            <Route exact path="/lecture/college/:collegeId/channels" component={withSplitting(() => import('./lecture').then(({ CollegeLecturesPage }) => CollegeLecturesPage))} />
            <Route exact path="/lecture/college/:collegeId/channel/:channelId" component={withSplitting(() => import('./lecture').then(({ ChannelLecturesPage }) => ChannelLecturesPage))} />
            <Route exact path="/lecture/college/:collegeId/course-plan/:coursePlanId/:serviceType/:serviceId" component={withSplitting(() => import('./lecture').then(({ CoursePage }) => CoursePage))} />
            <Route exact path="/lecture/college/:collegeId/course-plan/:coursePlanId/cube/:cubeId/lecture-card/:lectureCardId" component={withSplitting(() => import('./lecture').then(({ LectureCardPage }) => LectureCardPage))} />
            <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId" component={withSplitting(() => import('./lecture').then(({ LectureCardPage }) => LectureCardPage))} />

            {/* community  */}
            <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/new" component={withSplitting(() => import('./personalcube').then(({ PostFormPage }) => PostFormPage))} />
            <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId" component={withSplitting(() => import('./personalcube').then(({ PostDetailPage }) => PostDetailPage))} />
            <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/edit" component={withSplitting(() => import('./personalcube').then(({ PostFormPage }) => PostFormPage))} />
            <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/new" component={withSplitting(() => import('./personalcube').then(({ ReplyFormPage }) => ReplyFormPage))} />
            <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/:replyId" component={withSplitting(() => import('./personalcube').then(({ ReplyDetailPage }) => ReplyDetailPage))} />
            <Route exact path="/lecture/college/:collegeId/cube/:cubeId/lecture-card/:lectureCardId/posts/:postId/reply/:replyId/edit" component={withSplitting(() => import('./personalcube').then(({ ReplyFormPage }) => ReplyFormPage))} />

            {/* profile */}
            <Route exact path="/profile/interest" component={withSplitting(() => import('./profile').then(({ FavoriteWelcomePage }) => FavoriteWelcomePage))} />
            <Route exact path="/profile/interest/college" component={withSplitting(() => import('./profile').then(({ FavoriteCollegeContainer }) => FavoriteCollegeContainer))} />
            <Route exact path="/profile/interest/job" component={withSplitting(() => import('./profile').then(({ FavoriteJobContainer }) => FavoriteJobContainer))} />
            <Route exact path="/profile/interest/learningType" component={withSplitting(() => import('./profile').then(({ FavoriteLearningTypeContainer }) => FavoriteLearningTypeContainer))} />
            <Route exact path="/profile/interest/loading" component={withSplitting(() => import('./profile').then(({ LoadingPage }) => LoadingPage))} />

            {/*board*/}
            /* eslint-disable-next-line max-len */
            {/*<Route exact path="/board/support" component={withSplitting(() => import('./board').then(({ BookMainContainer }) => BookMainContainer))} />*/}
            <Route exact path="/board/support/:boardId" component={withSplitting(() => import('./board').then(({ BookMainContainer }) => BookMainContainer))} />
            <Route exact path="/board/support/notice-detail/:postId" component={withSplitting(() => import('./board').then(({ NoticeDetailContainer }) => NoticeDetailContainer))} />
            <Route exact path="/board/support/faq-detail/:postId" component={withSplitting(() => import('./board').then(({ FaqDetailContainer }) => FaqDetailContainer))} />
            <Route exact path="/board/support-qna" component={withSplitting(() => import('./board').then(({ QnaRegistContainer }) => QnaRegistContainer))} />
            <Route exact path="/board/support/qna-detail/:postId" component={withSplitting(() => import('./board').then(({ QnaDetailContainer }) => QnaDetailContainer))} />
            <Route exact path="/board/support/answered-detail/:postId" component={withSplitting(() => import('./board').then(({ AnsweredDetailContainer }) => AnsweredDetailContainer))} />


            {/*recommend*/}
            <Route exact path="/recommend" component={withSplitting(() => import('./lecture').then(({ ChannelsLecturesPage }) => ChannelsLecturesPage))} />
            <Route exact path="/channel/:channelId/recommend" component={withSplitting(() => import('./lecture').then(({ RecommendChannelLecturesPage }) => RecommendChannelLecturesPage))} />

            {/*mypage*/}
            <Route exact path="/my-training" component={withSplitting(() => import('./mytraining').then(({ MyTrainingPage }) => MyTrainingPage))} />
            <Route exact path="/mypage" component={withSplitting(() => import('./mypage').then(({ MyPage }) => MyPage))} />
            <Route exact path="/community" component={withSplitting(() => import('./mytraining').then(({ MyCommunityPage }) => MyCommunityPage))} />

            {/*  expert */}
            {/*<Route path="/expert/instructor" component={ExpertContainer} />*/}
            <Route exact path="/expert/instructor" component={withSplitting(() => import('./expert').then(({ ExpertContainer }) => ExpertContainer))} />

            {/* design  */}
            <Route exact path="/design/learning/my-learning" component={MyLearningDetailDesign} />
          </Switch>
        </UserApp>
      </BrowserRouter>
    );
  }
}

export default Routes;

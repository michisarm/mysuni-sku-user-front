
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserApp, withSplitting } from 'shared';


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

            {/* personalcube  */}
            <Route exact path="/personalcube/community/:cubeId" component={withSplitting(() => import('./personalcube').then(({ MyPostListPage }) => MyPostListPage))} />
            {/* course  */}

            {/*create*/}

            <Route exact path="/personalcube/create" component={withSplitting(() => import('./create').then(({ CreateContainer }) => CreateContainer))} />
            <Route exact path="/personalcube/create-detail" component={withSplitting(() => import('./create').then(({ CreateDetailContainer }) => CreateDetailContainer))} />

            {/* lecture  */}
            <Route exact path="/lecture/college/:collegeId" component={withSplitting(() => import('./lecture').then(({ CategoryLecturesPage }) => CategoryLecturesPage))} />
            <Route exact path="/lecture/college/:collegeId/channel/:channelId" component={withSplitting(() => import('./lecture').then(({ ChannelLecturesPage }) => ChannelLecturesPage))} />
            <Route exact path="/lecture/college/:collegeId/lecture-card/:lectureCardId" component={withSplitting(() => import('./lecture').then(({ LectureCardPage }) => LectureCardPage))} />

            {/*  expert */}
            <Route exact path="/expert/instructor" component={withSplitting(() => import('./expert').then(({ ExpertContainer }) => ExpertContainer))} />

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


            {/*mypage*/}
            <Route exact path="/mypage" component={withSplitting(() => import('./mypage').then(({ MyPageContainer }) => MyPageContainer))} />

            {/*<Route path="/expert/instructor" component={ExpertContainer} />*/}
            <Route exact path="/expert/instructor" component={withSplitting(() => import('./expert').then(({ ExpertContainer }) => ExpertContainer))} />
          </Switch>
        </UserApp>
      </BrowserRouter>
    );
  }
}

export default Routes;

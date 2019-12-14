
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

            {/* course  */}

            {/*create*/}

            <Route exact path="/cube/create" component={withSplitting(() => import('./create').then(({ CreateContainer }) => CreateContainer))} />
            <Route exact path="/cube/create-detail" component={withSplitting(() => import('./create').then(({ CreateDetailContainer }) => CreateDetailContainer))} />

            {/* lecture  */}
            <Route exact path="/lecture/category/:categoryId" component={withSplitting(() => import('./lecture').then(({ CategoryLecturesPage }) => CategoryLecturesPage))} />

            {/*  expert */}
            <Route exact path="/expert/instructor" component={withSplitting(() => import('./expert').then(({ ExpertContainer }) => ExpertContainer))} />

            {/* profile */}
            <Route exact path="/profile/favorite" component={withSplitting(() => import('./profile').then(({ FavoriteWelcomePage }) => FavoriteWelcomePage))} />
            <Route exact path="/profile/favorite/college" component={withSplitting(() => import('./profile').then(({ FavoriteCollegeContainer }) => FavoriteCollegeContainer))} />
            <Route exact path="/profile/favorite/job" component={withSplitting(() => import('./profile').then(({ FavoriteJobContainer }) => FavoriteJobContainer))} />
            <Route exact path="/profile/favorite/learningType" component={withSplitting(() => import('./profile').then(({ FavoriteLearningTypeContainer }) => FavoriteLearningTypeContainer))} />
            <Route exact path="/profile/favorite/loading" component={withSplitting(() => import('./profile').then(({ LoadingPage }) => LoadingPage))} />

            {/*board*/}
            {/*<Route exact path="/board/support" component={withSplitting(() => import('./board').then(({ BookMainContainer }) => BookMainContainer))} />*/}
            <Route exact path="/board/support/:boardId" component={withSplitting(() => import('./board').then(({ BookMainContainer }) => BookMainContainer))} />
            <Route exact path="/board/support/notice-detail/:postId" component={withSplitting(() => import('./board').then(({ NoticeDetailContainer }) => NoticeDetailContainer))} />
            <Route exact path="/board/support/faq-detail/:postId" component={withSplitting(() => import('./board').then(({ FaqDetailContainer }) => FaqDetailContainer))} />
            <Route exact path="/board/support-qna" component={withSplitting(() => import('./board').then(({ QnaRegistContainer }) => QnaRegistContainer))} />
            <Route exact path="/board/support/qna-detail/:postId" component={withSplitting(() => import('./board').then(({ QnaDetailContainer }) => QnaDetailContainer))} />
            <Route exact path="/board/support/answered-detail/:postId" component={withSplitting(() => import('./board').then(({ AnsweredDetailContainer }) => AnsweredDetailContainer))} />


            {/*mypage*/}
            <Route exact path="/mypage" component={withSplitting(() => import('./mypage').then(({ MyPage }) => MyPage))} />

            {/*<Route path="/expert/instructor" component={ExpertContainer} />*/}
            <Route exact path="/expert/instructor" component={withSplitting(() => import('./expert').then(({ ExpertContainer }) => ExpertContainer))} />
          </Switch>
        </UserApp>
      </BrowserRouter>
    );
  }
}

export default Routes;

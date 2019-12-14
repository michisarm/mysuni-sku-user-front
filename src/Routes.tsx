
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

            <Route path="/expert/instructor" component={withSplitting(() => import('./expert').then(({ ExpertContainer }) => ExpertContainer))} />

            {/* profile */}
            <Route exact path="/profile/favorite" component={withSplitting(() => import('./profile').then(({ FavoriteWelcomePage }) => FavoriteWelcomePage))} />
            <Route exact path="/profile/favorite/college" component={withSplitting(() => import('./profile').then(({ FavoriteCollegeContainer }) => FavoriteCollegeContainer))} />
            <Route exact path="/profile/favorite/job" component={withSplitting(() => import('./profile').then(({ FavoriteJobContainer }) => FavoriteJobContainer))} />
            <Route exact path="/profile/favorite/learningType" component={withSplitting(() => import('./profile').then(({ FavoriteLearningTypeContainer }) => FavoriteLearningTypeContainer))} />
            <Route exact path="/profile/favorite/loading" component={withSplitting(() => import('./profile').then(({ LoadingPage }) => LoadingPage))} />

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

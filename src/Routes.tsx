
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserApp, withSplitting } from './shared';


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

            {/* lecture  */}
            <Route exact path="/lecture/college-lectures" component={withSplitting(() => import('./lecture').then(({ CollegeLectureListPage }) => CollegeLectureListPage))} />

            {/*  expert */}

            <Route path="/expert/instructor" component={withSplitting(() => import('./expert').then(({ ExpertContainer }) => ExpertContainer))} />

            {/* profile */}
            <Route exact path="/profile/favorite" component={withSplitting(() => import('./profile').then(({ FavoriteWelcomePage }) => FavoriteWelcomePage))} />
            <Route exact path="/profile/favorite/college" component={withSplitting(() => import('./profile').then(({ FavoriteCollegeContainer }) => FavoriteCollegeContainer))} />
            <Route exact path="/profile/favorite/job" component={withSplitting(() => import('./profile').then(({ FavoriteJobContainer }) => FavoriteJobContainer))} />
            <Route exact path="/profile/favorite/learningType" component={withSplitting(() => import('./profile').then(({ FavoriteLearningTypeContainer }) => FavoriteLearningTypeContainer))} />
            <Route exact path="/profile/favorite/loading" component={withSplitting(() => import('./profile').then(({ LoadingPage }) => LoadingPage))} />

            {/*<Route path="/expert/instructor" component={ExpertContainer} />*/}
          </Switch>
        </UserApp>
      </BrowserRouter>
    );
  }
}

export default Routes;


import React, { PureComponent, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { withSplitting, UserApp, AppLayout } from './shared';


const MainRoutes = lazy(() => import('./main/MainRoutes'));
const ProfileRoutes = lazy(() => import('./profile/ProfileRoutes'));
const PersonalCubeRoutes = lazy(() => import('./personalcube/PersonalCubeRoutes'));
const LectureRoutes = lazy(() => import('./lecture/LectureRoutes'));
const BoardRoutes = lazy(() => import('./board/BoardRoutes'));
const ExpertRoutes = lazy(() => import('./expert/ExpertRoutes'));


class Routes extends PureComponent {
  //
  render() {
    //
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UserApp>
          <Suspense fallback="">
            <Switch>

              <Route path="/profile" component={ProfileRoutes} />

              <Route
                path="/"
                render={() => (
                  <AppLayout>
                    <Switch>

                      <Route path="/personalcube" component={PersonalCubeRoutes} />
                      <Route path="/lecture" component={LectureRoutes} />


                      {/* mypage */}
                      <Redirect exact from="/my-training" to="/my-training/InProgress" />
                      <Route exact path="/my-training/:tab" component={withSplitting(() => import('./mypage').then(({ MyTrainingPage }) => MyTrainingPage))} />

                      <Redirect exact from="/community" to="/community/MyCommunity" />
                      <Route exact path="/community/:tab" component={withSplitting(() => import('./mypage').then(({ MyCommunityPage }) => MyCommunityPage))} />

                      <Redirect exact from="/mypage" to="/mypage/CompletedList" />
                      <Route exact path="/mypage/:tab" component={withSplitting(() => import('./mypage').then(({ MyPage }) => MyPage))} />

                      {/* board */}
                      <Route path="/board" component={BoardRoutes} />
                      <Route path="/expert" component={ExpertRoutes} />
                      <Route path="/" component={MainRoutes} />
                    </Switch>
                  </AppLayout>
                )}
              />
            </Switch>
          </Suspense>
        </UserApp>
      </BrowserRouter>
    );
  }
}

export default Routes;

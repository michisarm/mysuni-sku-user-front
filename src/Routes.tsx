
import React, { PureComponent, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { UserApp, AppLayout } from './shared';


const MainRoutes = lazy(() => import('./main/MainRoutes'));
const ProfileRoutes = lazy(() => import('./profile/Routes'));
const PersonalCubeRoutes = lazy(() => import('./personalcube/PersonalCubeRoutes'));
const LectureRoutes = lazy(() => import('./lecture/LectureRoutes'));
const MyTrainingRoutes = lazy(() => import('./myTraining/MyTrainingRoutes'));
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
                      <Route path="/my-training" component={MyTrainingRoutes} />
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

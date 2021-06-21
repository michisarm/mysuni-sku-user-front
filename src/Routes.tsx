import React, { PureComponent, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AppInitializer from './AppInitializer';
import { getCookie } from '@nara.platform/accent';
import ScrollToTop from './ScrollToTop';

import { UserApp, AppLayout } from './shared';
import HistoryContainer from './shared/ui/logic/HistoryContainer';
import { TrackerRoute } from 'tracker-react';
// import { trackClick } from 'tracker/present/apiclient';
import {
  actionTrack,
  actionTrackView,
} from 'tracker/present/logic/ActionTrackService';
import NotFoundPage from 'layout/NotFoundPage';
import { isExternalInstructor } from './shared/helper/findUserRole';
import LectureNoteContainer from './lecture/detail/ui/logic/LectureNoteContainer';

const MainRoutes = lazy(() => import('./main/Routes'));
const ProfileRoutes = lazy(() => import('./profile/Routes'));
const PersonalCubeRoutes = lazy(() => import('./personalcube/Routes'));
const LectureRoutes = lazy(() => import('./lecture/Routes'));
const MyTrainingRoutes = lazy(() => import('./myTraining/Routes'));
const ApprovalRoutes = lazy(() => import('./approval/Routes'));
const BoardRoutes = lazy(() => import('./board/Routes'));
const ExpertRoutes = lazy(() => import('./expert/Routes'));
const CommunityRoutes = lazy(() => import('./community/Routes'));
// const MyTrainingRoutes2 = lazy(() => import('./apl/Routes'));

const CertificationRoutes = lazy(() => import('./certification/Routes'));
const PreviewRoutes = lazy(() => import('./preview/Routes'));
const SearchRoutes = lazy(() => import('./search/Routes'));

const ExtraRoutes = lazy(() => import('./extra/ExtraRoutes'));

class Routes extends PureComponent {
  state = {
    email:
      (window.sessionStorage.getItem('email') as string) ||
      (window.localStorage.getItem('nara.email') as string) ||
      getCookie('tryingLoginId'),
  };

  componentDidMount() {
    const isExternal = isExternalInstructor();

    if (
      isExternal &&
      window.location.pathname !== '/suni-main/community/main'
    ) {
      window.location.href = '/suni-main/community/main';
    }
  }

  render() {
    const { email } = this.state;

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ScrollToTop />
        <UserApp>
          <Suspense fallback="">
            <Switch>
              <Route path="/profile" component={ProfileRoutes} />
              <Route path="/preview" component={PreviewRoutes} />
              <Route
                path="/lecture/card/:cardId/cube/:cubeId/cubeType/:cubeType/learningTime/:learningTime/:viewType/new"
                exact
                component={LectureNoteContainer}
              />
              <Route
                path="/"
                render={() => (
                  <AppLayout>
                    <Switch>
                      <Route
                        path="/certification"
                        component={CertificationRoutes}
                      />
                      <Route
                        path="/personalcube"
                        component={PersonalCubeRoutes}
                      />
                      <Route path="/lecture" component={LectureRoutes} />
                      <Route path="/my-training" component={MyTrainingRoutes} />
                      {/* <Route
                          path="/my-training2"
                        // component={MyTrainingRoutes2}
                        /> */}
                      <Route path="/approval" component={ApprovalRoutes} />
                      <Route path="/board" component={BoardRoutes} />
                      <Route path="/expert" component={ExpertRoutes} />
                      <Route path="/community" component={CommunityRoutes} />
                      <Route path="/search" component={SearchRoutes} />
                      <Route path="/extra" component={ExtraRoutes} />

                      <Route path="/" component={MainRoutes} />
                      <Route path="/404" component={NotFoundPage} />
                    </Switch>
                  </AppLayout>
                )}
              />
            </Switch>
          </Suspense>
        </UserApp>
        <TrackerRoute
          value={{
            userId: email,
            trackAction: actionTrack,
            trackView: actionTrackView,
          }}
        />
        <HistoryContainer />
        <AppInitializer />
      </BrowserRouter>
    );
  }
}

export default Routes;


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
            {/*<Route path="/expert/instructor" component={ExpertContainer} />*/}
          </Switch>
        </UserApp>
      </BrowserRouter>
    );
  }
}

export default Routes;

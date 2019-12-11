import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { UserApp, withSplitting } from './shared';


class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UserApp>
          <Switch>
            <Route exact path="/" render={() => <Redirect exact from="/" to="/main" />} />

            {/* main */}
            <Route path="/main" component={withSplitting(() => import('./main').then(({ UserMainPage }) => UserMainPage))} />

            {/* personalcube  */}

            {/* course  */}

            {/* lecture  */}

            <Route path="/expert/instructor" component={withSplitting(() => import('./expert').then(({ ExpertContainer }) => ExpertContainer))} />
            {/*<Route path="/expert/instructor" component={ExpertContainer} />*/}
          </Switch>
        </UserApp>
      </BrowserRouter>
    );
  }
}

export default Routes;

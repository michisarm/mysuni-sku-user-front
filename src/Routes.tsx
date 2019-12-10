
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { UserApp, withSplitting } from './shared';
import { ExpertContainer } from './expert';


class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UserApp>
          <Switch>
            <Route exact path="/" render={() => <Redirect exact from="/" to="/main" />} />

            <Route path="/main" component={withSplitting(() => import('./main').then(({ UserMainPage }) => UserMainPage))} />
            <Route path="/learning-management/expert" component={ExpertContainer} />
          </Switch>
        </UserApp>
      </BrowserRouter>
    );
  }
}

export default Routes;

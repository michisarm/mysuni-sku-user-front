
import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { withSplitting } from './shared';


class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/" render={() => <Redirect exact from="/" to="/main" />} />

        <Route path="/main" component={withSplitting(() => import('./main').then(({ UserMainPage }) => UserMainPage))} />
      </BrowserRouter>
    );
  }
}

export default Routes;

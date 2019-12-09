import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import { withSplitting } from './shared';

class Routes extends React.PureComponent {

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/" render={() => <Redirect exact from="/" to="/posts" />} />
        <Route path="/posts" component={withSplitting(() => import('./post/Routes'))} />
        <Route path="/snaptest" component={withSplitting(() => import('./snap/SnapTest'))} />
      </BrowserRouter>
    );
  }
}

export default Routes;

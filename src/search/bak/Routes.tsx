import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import SearchComponent from './index';
import SearchPage from './SearchPage';

const Routes: React.FC = () => {
  //

  return (
    <Switch>
      <Route exact path="/search" component={SearchComponent} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;

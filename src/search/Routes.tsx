import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import { SearchPage } from './SearchPage';

const Routes: React.FC = () => {
  //

  return (
    <Switch>
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/search/:searchType" component={SearchPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;

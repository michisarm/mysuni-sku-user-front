import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { MainRoutes } from './ui/page/MainRoutes';

const Routes = function Routes() {
  return (
    <Switch>
      <Route path="/community" component={MainRoutes} />
    </Switch>
  );
};

export default Routes;

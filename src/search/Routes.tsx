import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import SearchComponent from './index';

const Routes: React.FC = () => {
  //
  return (
    <Switch>
      <Route exact path="/search" component={SearchComponent} />
      {/* 계속 추가.. */}
    </Switch>
  );
};

export default Routes;

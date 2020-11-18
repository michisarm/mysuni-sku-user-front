import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import SearchComponent from './index';
import NoDataPage from './SectionArea/NoDataPage';
import queryString from "query-string";

const Routes: React.FC = ({ location }: any) => {
  //
  const queryId = queryString.parse(location.search);
  console.log('query', queryId);

  return (
    <Switch>
      <Route exact path="/search" component={SearchComponent} />
      <Route exact path="/" component={NotFoundPage} />
      {/* 계속 추가.. */}
    </Switch>
  );
};

export default Routes;


import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import ExpertPage from './ui/page/ExpertPage';


class ExpertRoutes extends React.PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="/expert/instructor/:instructorId" component={ExpertPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default ExpertRoutes;


import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import InstructorPage from './ui/page/InstructorPage';


class Routes extends React.PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect exact from="/expert/instructor/:instructorId" to="/expert/instructor/:instructorId/Introduce" />
        <Route exact path="/expert/instructor/:instructorId/:tab" component={InstructorPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;

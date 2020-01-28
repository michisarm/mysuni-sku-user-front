
import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import {
  CreateListPage,
  CreatePersonalCubeDetailPage,
  CreateCubeIntroDetailPage,
  SharedDetailPage,
} from './create';


class PersonalCubeRoutes extends PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect exact from="/personalcube/create" to="/personalcube/create/Create" />
        <Route exact path="/personalcube/create/:tab" component={CreateListPage} />

        <Route exact path="/personalcube/create/cubes/new" component={CreatePersonalCubeDetailPage} />
        <Route exact path="/personalcube/create/cubes/cube/:personalCubeId/:cubeType" component={CreatePersonalCubeDetailPage} />
        <Route exact path="/personalcube/create/cubes/intro/:personalCubeId/:cubeType" component={CreateCubeIntroDetailPage} />
        <Route exact path="/personalcube/create/cubes/shared/:personalCubeId/:cubeType/:cubeState" component={SharedDetailPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default PersonalCubeRoutes;


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

        <Route exact path="/personalcube/create/detail/new" component={CreatePersonalCubeDetailPage} />
        <Route exact path="/personalcube/create/detail/:personalCubeId/:cubeType" component={CreatePersonalCubeDetailPage} />
        <Route exact path="/personalcube/create/intro/:personalCubeId/:cubeType" component={CreateCubeIntroDetailPage} />
        <Route exact path="/personalcube/create/shared/detail/:personalCubeId/:cubeType/:cubeState" component={SharedDetailPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default PersonalCubeRoutes;

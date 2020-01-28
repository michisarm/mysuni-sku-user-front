
import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import CreateContainer from './create/ui/logic/CreateContainer';
import CreatePersonalCubeDetailPage from './create/ui/page/CreatePersonalCubeDetailPage';
import CreateCubeIntroDetailPage from './create/ui/page/CreateCubeIntroDetailPage';
import SharedDetailContainer from './create/ui/logic/SharedDetailContainer';


class PersonalCubeRoutes extends PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect exact from="/personalcube/create" to="/personalcube/create/Create" />
        <Route exact path="/personalcube/create/:tab" component={CreateContainer} />

        <Route exact path="/personalcube/create/detail/new" component={CreatePersonalCubeDetailPage} />
        <Route exact path="/personalcube/create/detail/:personalCubeId/:cubeType" component={CreatePersonalCubeDetailPage} />
        <Route exact path="/personalcube/create/intro/:personalCubeId/:cubeType" component={CreateCubeIntroDetailPage} />
        <Route exact path="/personalcube/create/shared/detail/:personalCubeId/:cubeType/:cubeState" component={SharedDetailContainer} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default PersonalCubeRoutes;

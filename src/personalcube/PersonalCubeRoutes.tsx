
import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import CreateContainer from './create/ui/logic/CreateContainer';
import CreateDetailContainer from './create/ui/logic/CreateDetailContainer';
import CreateIntroContainer from './create/ui/logic/CreateIntroContainer';
import SharedDetailContainer from './create/ui/logic/SharedDetailContainer';


class PersonalCubeRoutes extends PureComponent {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect exact from="/personalcube/create" to="/personalcube/create/Create" />
        <Route exact path="/personalcube/create/:tab" component={CreateContainer} />
        <Route exact path="/personalcube/create-detail" component={CreateDetailContainer} />
        <Route exact path="/personalcube/create-detail/:personalCubeId/:cubeType" component={CreateDetailContainer} />
        <Route exact path="/personalcube/create-intro/:personalCubeId/:cubeType" component={CreateIntroContainer} />
        <Route exact path="/personalcube/shared-detail/:personalCubeId/:cubeType/:cubeState" component={SharedDetailContainer} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default PersonalCubeRoutes;

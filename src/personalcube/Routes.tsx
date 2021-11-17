import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import {
  CreateCubeListPage,
  CreateCubePage,
  CreateCubeIntroPage,
  CreateCubeDetailPage,
} from './create';
import { findAvailablePageElementsCache } from '../lecture/shared/api/arrangeApi';

class Routes extends PureComponent {
  componentDidMount() {
    this.isCheckedAllowCommunity();
  }

  isCheckedAllowCommunity = async () => {
    const available = await findAvailablePageElementsCache();

    if (available === undefined) {
      window.location.href = '/suni-main';
      return null;
    }

    const isAvailable = available.some((item) => item.type === 'Community');

    if (!isAvailable) {
      window.location.href = '/suni-main';
      return null;
    }
  };

  render() {
    //
    return (
      <Switch>
        <Redirect
          exact
          from="/personalcube/create"
          to="/personalcube/create/Create/pages/1"
        />
        <Route
          exact
          path="/personalcube/create/:tab"
          component={CreateCubeListPage}
        />
        <Route
          exact
          path="/personalcube/create/:tab/pages/:pageNo"
          component={CreateCubeListPage}
        />

        <Route
          exact
          path="/personalcube/create/cubes/new"
          component={CreateCubePage}
        />
        <Route
          exact
          path="/personalcube/create/cubes/cube/:personalCubeId/:cubeType"
          component={CreateCubePage}
        />
        <Route
          exact
          path="/personalcube/create/cubes/intro/:personalCubeId/:cubeType"
          component={CreateCubeIntroPage}
        />
        <Route
          exact
          path="/personalcube/create/cubes/shared/:personalCubeId/:cubeType/:cubeState"
          component={CreateCubeDetailPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PanoptoPlayerTestPage from './ui/logic/PanoptoPlayerTestPage';

function ExtraRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/extra/panopto-player-test"
        component={PanoptoPlayerTestPage}
      />
    </Switch>
  );
}

export default ExtraRoutes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import BadgePreviewPage from 'certification/ui/page/BadgePreviewPage';

class PreviewRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Route
          exact
          path="/preview/badge/:badgeId"
          component={BadgePreviewPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default PreviewRoutes;

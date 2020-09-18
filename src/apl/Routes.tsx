import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import CreateAplModelContainer from './ui/logic/CreateAplContainer';

class AplRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        {
          /* <Redirect exact from="/certification/badge" to="/certification/badge/AllBadgeList/pages/1" />
        <Route exact path="/certification/badge/:tab" component={MyBadgePage}/>
        <Route exact path="/certification/badge/:tab/pages/:pageNo" component={MyBadgePage}/>

        <Route exact path="/certification/badge/badge-detail/:badgeId" component={BadgeDetailPage} />

        <Route component={NotFoundPage} /> */
          <Route
            exact
            path="/my-training2/apl/create2"
            component={CreateAplModelContainer}
          />
        }
      </Switch>
    );
  }
}

export default AplRoutes;

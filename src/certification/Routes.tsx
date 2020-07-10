
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import MyBadgePage from './ui/page/MyBadgePage';



class CertificationRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect exact from="/certification/badge" to="/certification/badge/AllBadgeList/pages/1" />
        <Route exact path="/certification/badge/:tab" component={MyBadgePage}/>
        <Route exact path="/certification/badge/:tab/pages/:pageNo" component={MyBadgePage}/>

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default CertificationRoutes;

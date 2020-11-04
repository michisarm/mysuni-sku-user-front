
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
import MemberPage from './MemberPage';
import MemberGroupPage from './MemberGroupPage';
import MemberApprovePage from './MemberApprovePage';


class MemberRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Route exact path="community/cineroom/:cineroomId/college/:collegeId/:communityId/member" component={MemberPage} />
        <Route exact path="community/cineroom/:cineroomId/college/:collegeId/:communityId/member/group" component={MemberGroupPage} />
        <Route exact path="community/cineroom/:cineroomId/college/:collegeId/:communityId/member/approve" component={MemberApprovePage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MemberRoutes;

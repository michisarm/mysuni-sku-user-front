import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NotFoundPage from 'layout/NotFoundPage';
import AplDetailPage from 'myTraining/aplDetail/AplDetailPage';
import ApprovalSharedDetailContainer from '../myTraining/ui/logic/ApprovalSharedDetailContainer';
import MyApprovalPage from '../myTraining/ui/page/MyApprovalPage';

class ApprovalRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/approval" to="/approval/PaidCourse/pages/1" />
        <Route exact path="/approval/:tab" component={MyApprovalPage} />
        <Route
          exact
          path="/approval/:tab/pages/:pageNo"
          component={MyApprovalPage}
        />
        <Route
          exact
          path="/approval/ApprovalList/detail/:studentId"
          component={ApprovalSharedDetailContainer}
        />
        <Route
          exact
          path="/approval/PersonalLearning/:page/:aplId"
          component={AplDetailPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default ApprovalRoutes;

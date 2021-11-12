import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NotFoundPage from 'layout/NotFoundPage';
import ApprovalSharedDetailContainer from './ui/logic/ApprovalSharedDetailContainer';
import NewLearningPage from './ui/page/NewLearningPage';
import { AplCreatePage } from './index';
import MyPagePage from './ui/page/MyPagePage';
import MyTrainingPage from './ui/page/MyTrainingPage';

export default function MainRoutes() {
  return (
    <Switch>
      <Redirect
        exact
        from="/my-training/learning"
        to="/my-training/learning/InProgress/pages/1"
      />
      <Redirect
        exact
        from="/my-training/my-page"
        to="/my-training/my-page/MyProfile"
      />
      <Route
        exact
        path="/my-training/learning/:tab"
        component={MyTrainingPage}
      />
      <Route
        exact
        path="/my-training/learning/:tab/pages/:pageNo"
        component={MyTrainingPage}
      />
      <Route exact path="/my-training/my-page/:tab" component={MyPagePage} />
      <Route
        exact
        path="/my-training/my-page/:tab/pages/:pageNo"
        component={MyPagePage}
      />
      <Route
        exact
        path="/my-training/my-page/ApprovalList/detail/:studentId"
        component={ApprovalSharedDetailContainer}
      />
      <Route exact path="/my-training/apl/create" component={AplCreatePage} />
      <Route
        path="/my-training/new-learning/:type"
        component={NewLearningPage}
      />
      <Route
        path="/my-training/new-learning/:type/pages/:pageNo"
        component={NewLearningPage}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

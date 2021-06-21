import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';
// import MyCommunityPage from './ui/page/MyCommunityPage';
//import ApprovalManagerDetailPage from './ui/page/ApprovalManagerDetailPage';
import ApprovalSharedDetailContainer from './ui/logic/ApprovalSharedDetailContainer';
// 고도화
import NewLearningPage from './ui/page/NewLearningPage';
import { AplCreatePage } from './index';
import MyPagePage from './ui/page/MyPagePage';
import MyTrainingPage from './ui/page/MyTrainingPage';

class MainRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect
          exact
          from="/my-training/learning"
          to="/my-training/learning/InProgress/pages/1"
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

        {/* <Redirect exact from="/my-training/learning" to="/my-training/learning/InProgress/pages/1" /> */}
        {/* <Route exact path="/my-training/learning/:tab" component={MyTrainingPage} /> */}
        {/* <Route exact path="/my-training/learning/:tab/pages/:pageNo" component={MyTrainingPage} /> */}
        {/* <Redirect exact from="/my-training/community" to="/my-training/community/MyCommunity" /> */}
        {/* <Route exact path="/my-training/community/:tab" component={MyCommunityPage} /> */}
        {/* <Redirect exact from="/my-training/my-page" to="/my-training/my-page/EarnedStampList/pages/1" /> */}
        {/* <Route exact path="/my-training/my-page/:tab" component={MyPage} /> */}
        {/* <Route exact path="/my-training/my-page/:tab/pages/:pageNo" component={MyPage} /> */}

        <Redirect
          exact
          from="/my-training/my-page"
          to="/my-training/my-page/MyProfile"
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
          exact
          path="/my-training/new-learning/:type"
          component={NewLearningPage}
        />
        <Route
          exact
          path="/my-training/new-learning/:type/pages/:pageNo"
          component={NewLearningPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;

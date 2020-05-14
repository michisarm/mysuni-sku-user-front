
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFoundPage from 'layout/NotFoundPage';

import MyTrainingPage from './ui/page/MyLearningPage';
// import MyCommunityPage from './ui/page/MyCommunityPage';
import MyPage from './ui/page/MyPagePage';
import ApprovalManagerDetailPage from './ui/page/ApprovalManagerDetailPage';

class MainRoutes extends React.Component {
  //
  render() {
    //
    return (
      <Switch>
        <Redirect exact from="/my-training/learning" to="/my-training/learning/InProgress/pages/1" />
        <Route exact path="/my-training/learning/:tab" component={MyTrainingPage} />
        <Route exact path="/my-training/learning/:tab/pages/:pageNo" component={MyTrainingPage} />

        {/*<Redirect exact from="/my-training/community" to="/my-training/community/MyCommunity" />*/}
        {/*<Route exact path="/my-training/community/:tab" component={MyCommunityPage} />*/}

        <Redirect exact from="/my-training/my-page" to="/my-training/my-page/CompletedList/pages/1" />
        <Route exact path="/my-training/my-page/:tab" component={MyPage} />
        <Route exact path="/my-training/my-page/:tab/pages/:pageNo" component={MyPage} />

        <Route exact path="/my-training/my-page/ApprovalList/detail" component={ApprovalManagerDetailPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default MainRoutes;

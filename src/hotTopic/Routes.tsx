import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NotFoundPage from 'layout/NotFoundPage';
import { HotTopicDetailPage } from './ui/page/HotTopicDetailPage';

export default function MainRoutes() {
  return (
    <Switch>
      <Route exact path="/hot-topic/:id" component={HotTopicDetailPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

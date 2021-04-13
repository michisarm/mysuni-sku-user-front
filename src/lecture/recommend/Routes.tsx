import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import NotFoundPage from '../../layout/NotFoundPage';
import { useRequestCheckableChannels } from '../../shared/service/useRequestCheckableChannels/useRequestCheckableChannels';
import RecommendChannelLecturesPage from './ui/page/RecommendChannelLecturesPage';
import RecommendChannelsPage from './ui/page/RecommendChannelsPage';

export default function Routes() {
  useRequestCheckableChannels();
  return (
    <Switch>
      <Route
        exact
        path="/lecture/recommend"
        component={RecommendChannelsPage}
      />
      <Route
        exact
        path="/lecture/recommend/channel/:channelId"
        component={RecommendChannelLecturesPage}
      />

      <Route component={NotFoundPage} />
    </Switch>
  );
}

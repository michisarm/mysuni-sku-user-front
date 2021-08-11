import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { SkProfileService } from 'profile/stores';
import routePaths from '../../../routePaths';
import ChannelsContentHeaderContainer from '../logic/ChannelsContentHeaderContainer';
import RecommendContentBodyContainer from '../logic/RecommendContentBodyContainer';

interface Props extends RouteComponentProps {}
@observer
@reactAutobind
class RecommendChannelsPage extends Component<Props> {
  componentDidMount(): void {
    SkProfileService.instance.findStudySummary();
  }

  routeTo(e: any, data: any) {
    const { channel } = data;
    this.props.history.push(routePaths.recommendChannelLectures(channel.id));
  }

  render() {
    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[{ text: `Recommend` }]}
      >
        <ChannelsContentHeaderContainer />
        <RecommendContentBodyContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(RecommendChannelsPage);

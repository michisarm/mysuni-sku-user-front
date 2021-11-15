import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout } from 'shared';
import { ChannelModel } from 'college/model';
import { CollegeService } from 'college/stores';
import { SkProfileService } from 'profile/stores';
import routePaths from '../../../routePaths';
import ChannelLecturesHeaderView from '../view/ChannelLecturesHeaderView';
import ChannelLecturesContainer from '../../../category/ui/logic/ChannelLecturesContainer';
import { getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';
import { IdName } from '../../../../shared/model';

interface Props extends RouteComponentProps<{ channelId: string }> {
  collegeService: CollegeService;
  skProfileService: SkProfileService;
}

@inject(
  mobxHelper.injectFrom('college.collegeService', 'profile.skProfileService')
)
@reactAutobind
@observer
class RecommendChannelLecturesPage extends Component<Props> {
  //
  // componentDidMount() {
  //   //
  //   this.init();
  // }

  constructor(props: Props) {
    //
    super(props);

    this.init();
  }

  async init() {
    //
    const { skProfileService, collegeService } = this.props;

    await skProfileService.findStudySummary();
  }

  onSelectChannel(channel: ChannelModel) {
    this.props.history.push(routePaths.recommendChannelLectures(channel.id));
  }

  render() {
    //
    const {
      skProfileService,
      match: {
        params: { channelId },
      },
    } = this.props;

    const { studySummaryFavoriteChannels } = skProfileService;
    const channel: IdName = new IdName({
      id: channelId,
      name: getChannelName(channelId),
    });

    // console.log(studySummaryFavoriteChannels);

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `Recommend`, path: routePaths.recommend() },
          {
            text: `${channel.name}`,
          },
        ]}
      >
        <ChannelLecturesHeaderView
          channelIdName={channel}
          channels={studySummaryFavoriteChannels.map(
            (channelId) =>
              new ChannelModel({
                id: channelId,
                name: getChannelName(channelId),
                channelId,
                checked: true,
              })
          )}
          onSelectChannel={this.onSelectChannel}
        />
        <ChannelLecturesContainer />
      </ContentLayout>
    );
  }
}

export default withRouter(RecommendChannelLecturesPage);


import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Segment } from 'semantic-ui-react';
import { SkProfileService } from 'profile';
import { ChannelModel, CollegeService } from 'college';
import lectureRoutePaths from 'lecture/routePaths';
import { ChannelLecturesPanel } from 'lecture';
import RecommendHeaderContainer from './RecommendHeaderContainer';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
  collegeService?: CollegeService
}

@inject(mobxHelper.injectFrom('profile.skProfileService', 'college.collegeService'))
@observer
@reactAutobind
class RecommendContainer extends Component<Props> {
  //
  componentDidMount(): void {
    this.init();
  }

  init() {
    //
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  routeTo(e: any, data: any) {
    this.props.history.push(lectureRoutePaths.recommendChannelLectures(data.channel.id));
  }

  onFindStudySummary() {
    //
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  render() {
    //
    const { skProfileService } = this.props;

    const { studySummaryFavoriteChannels } = skProfileService!;
    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );

    return (
      <RecommendWrapper>
        <RecommendHeaderContainer
          favoriteChannels={favoriteChannels}
          onFindStudySummary={this.onFindStudySummary}
        />

        {
          favoriteChannels.map((channel: ChannelModel, index: number) => (
            channel.checked && (
              <ChannelLecturesPanel
                key={`channel_cont_${index}`}
                channel={channel}
                onViewAll={this.routeTo}
              />
            )
          ))
        }
      </RecommendWrapper>
    );
  }
}

const RecommendWrapper: React.FunctionComponent = ({ children }) => (
  <div className="recommend-area" id="recommend">
    <Segment className="full">
      {children}
    </Segment>
  </div>
);

export default withRouter(RecommendContainer);


import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { LectureService, RecommendLectureRdo, ChannelLecturesLine } from 'lecture';
import { ChannelModel } from 'college';
import { SkProfileService } from 'profile';
import lectureRoutePaths from 'lecture/routePaths';
import HeaderContainer from './HeaderContainer';
import { Wrapper, EmptyContents } from './RecommendElementsView';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
  lectureService?: LectureService
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'lecture.lectureService',
))
@observer
@reactAutobind
class RecommendChannelsContainer extends Component<Props> {
  //
  CHANNELS_SIZE = 50;
  LECTURES_SIZE = 8;


  componentDidMount(): void {
    //
    this.findPagingRecommendLectures();
    this.findStudySummary();
  }

  findStudySummary() {
    //
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  findPagingRecommendLectures() {
    //
    const { lectureService } = this.props;

    lectureService!.findPagingRecommendLectures(this.CHANNELS_SIZE, 0, this.LECTURES_SIZE, 0);
  }

  routeTo(e: any, data: any) {
    //
    this.props.history.push(lectureRoutePaths.recommendChannelLectures(data.channel.id));
  }


  render() {
    //
    const { skProfileService, lectureService } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService!;
    const { recommendLectures } = lectureService!;

    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );

    console.log(recommendLectures);
    return (
      <Wrapper>
        <HeaderContainer
          favoriteChannels={favoriteChannels}
          onFindStudySummary={() => {
            this.findStudySummary();
            this.findPagingRecommendLectures();
          }}
        />

        {
          recommendLectures && recommendLectures.length > 0 ?
            recommendLectures.map((recommendLecture: RecommendLectureRdo, index: number) => (
              <ChannelLecturesLine
                key={`channel_cont_${index}`}
                channel={new ChannelModel(recommendLecture.channel)}
                lectures={recommendLecture.lectures}
                onViewAll={this.routeTo}
              />
            ))
            :
            <EmptyContents />
        }
      </Wrapper>
    );
  }
}

export default withRouter(RecommendChannelsContainer);

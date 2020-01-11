
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { LectureService, RecommendLectureRdo, ChannelLecturesPanel } from 'lecture';
import { ChannelModel } from 'college';
import { SkProfileService } from 'profile';
import lectureRoutePaths from 'lecture/routePaths';
import HeaderContainer from './HeaderContainer';
import { Wrapper, EmptyContents } from './RecommendElementsView';


interface Props extends RouteComponentProps {
  lectureService?: LectureService
  reviewService?: ReviewService
  skProfileService?: SkProfileService
}

@inject(mobxHelper.injectFrom(
  'lecture.lectureService',
  'shared.reviewService',
  'profile.skProfileService',
))
@observer
@reactAutobind
class RecommendChannelsContainer extends Component<Props> {
  //
  componentDidMount(): void {
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
    const { lectureService, reviewService } = this.props;
    lectureService!.findPagingRecommendLectures(8, 0)
      .then((recommendLectures) => {
        let feedbackIds: string[] = [];
        if (recommendLectures && recommendLectures.length) {
          recommendLectures.map(recommendLecture => {
            if (recommendLecture && recommendLecture.lectures && recommendLecture.lectures.results && recommendLecture.lectures.results.length) {
              feedbackIds = feedbackIds.concat(recommendLecture.lectures.results.map(lecture => lecture.reviewId));
            }
          });
          reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
        }
      });
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
              <ChannelLecturesPanel
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


import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { ReviewService } from '@nara.drama/feedback';
import { ChannelModel, CollegeService } from 'college';
import { LectureService, RecommendLectureRdo } from 'lecture';
import ChannelLecturesContentWrapperContainer from './ChannelLecturesContentWrapperContainer';
import ChannelLecturesContainer from './ChannelLecturesContainer';
import { NoSuchContentPanel } from '../../../../shared';


interface Props {
  collegeService?: CollegeService
  lectureService?: LectureService
  reviewService?: ReviewService

  channels: ChannelModel[]
  onViewAll:(e: any, data: any) => void
}

interface State {
}

@inject(mobxHelper.injectFrom(
  'college.collegeService',
  'lecture.lectureService',
  'shared.reviewService',
))
@reactAutobind
@observer
class ChannelsLecturesContainer extends Component<Props, State> {
  //
  componentDidMount(): void {
    const { collegeService, channels } = this.props;

    collegeService!.setChannels(channels && channels.length && channels.map(chanel => ({ ...chanel, checked: true })) || []);
    this.findPagingRecommendLectures();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { collegeService, channels } = this.props;
    const { channels: prevChannels } = prevProps;

    if (channels !== prevChannels) {
      collegeService!.setChannels(channels && channels.length && channels.map(chanel => ({
        ...chanel,
        checked: true,
      })) || []);
    }
  }

  findPagingRecommendLectures() {
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

  onSelectChannel(channel: ChannelModel) {
    const { collegeService } = this.props;
    if (collegeService) {
      const index = collegeService._channels.map((channel: ChannelModel) => channel.id).findIndex((id: string) => channel.id === id);
      collegeService!.setChannelsProp(index, 'checked', !channel.checked);
    }
  }

  render() {
    //
    const { collegeService, lectureService, onViewAll } = this.props;
    const { channels } = collegeService as CollegeService;
    const { recommendLectures } = lectureService as LectureService;
    const channelIds = channels.filter((channel: ChannelModel) => channel.checked).map((channel: ChannelModel) => channel.id);

    return (
      <ChannelLecturesContentWrapperContainer
        channels={channels}
        onSelectChannel={this.onSelectChannel}
        onConfirmCallback={this.findPagingRecommendLectures}
      >
        <div className="recommend-area">
          {
            (!recommendLectures || recommendLectures.length < 1) ?
              <NoSuchContentPanel message="추천 학습 과정이 없습니다." />
              :
              recommendLectures.map((lecture: RecommendLectureRdo, index: number) => {
                if (!channelIds.includes(lecture.channel.id)) return null;
                return (
                  <ChannelLecturesContainer
                    channel={new ChannelModel(lecture.channel)}
                    lectures={lecture.lectures}
                    onViewAll={onViewAll}
                    key={`channel_cont_${index}`}
                  />
                );
              })
          }
        </div>
      </ChannelLecturesContentWrapperContainer>
    );
  }
}

export default ChannelsLecturesContainer;

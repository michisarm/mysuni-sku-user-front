
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ReviewService } from '@nara.drama/feedback';
import { ChannelModel, CollegeService } from 'college';
import { LectureService, RecommendLectureRdo } from 'lecture';
import routePaths from '../../../routePaths';
import ChannelLecturesContentWrapperContainer from './ChannelLecturesContentWrapperContainer';
import ChannelLecturesLineContainer from './ChannelLecturesLineContainer';
import { NoSuchContentPanel } from '../../../../shared';
import SeeMoreButtonView from '../view/SeeMoreButtonView';


interface Props extends RouteComponentProps<RouteParams> {
  collegeService?: CollegeService
  lectureService?: LectureService
  reviewService?: ReviewService

  channels: ChannelModel[]
  onViewAll:(e: any, data: any) => void
}

interface RouteParams {
  pageNo: string
}

@inject(mobxHelper.injectFrom(
  'college.collegeService',
  'lecture.lectureService',
  'shared.reviewService',
))
@reactAutobind
@observer
class ChannelsLecturesContainer extends Component<Props> {
  //
  CHANNELS_SIZE = 5;

  LECTURES_SIZE = 8;


  componentDidMount(): void {
    const { collegeService, channels } = this.props;

    collegeService!.setChannels(channels && channels.length && channels.map(chanel => ({ ...chanel, checked: true })) || []);
    this.findPagingRecommendLectures();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { channels: prevChannels } = prevProps;
    const { collegeService, channels } = this.props;

    if (prevChannels !== channels) {
      collegeService!.setChannels(channels && channels.map(chanel => ({
        ...chanel,
        checked: true,
      })) || []);
    }

    if (prevProps.match.params.pageNo !== this.props.match.params.pageNo) {
      this.addPagingRecommendLectures();
    }
  }

  findPagingRecommendLectures() {
    //
    const { lectureService } = this.props;
    const initialLimit = this.getPageNo() * this.CHANNELS_SIZE;

    lectureService!.findPagingRecommendLectures(initialLimit, this.LECTURES_SIZE);
  }

  async addPagingRecommendLectures() {
    //
    const { lectureService } = this.props;

    lectureService!.addFindPagingRecommendLectures(this.CHANNELS_SIZE, this.getPageNo() - 1, this.LECTURES_SIZE, 0);
  }

  getPageNo() {
    //
    const { match } = this.props;

    return parseInt(match.params.pageNo, 10);
  }

  isContentMore() {
    //
    const { lectureService } = this.props;
    const { recommendLectures, recommendLecturesCount } = lectureService!;

    return recommendLectures.length < recommendLecturesCount;
  }

  onConfirmChangeFavorite() {
    //
    const { history } = this.props;
    history.replace(routePaths.recommend());
  }

  onSelectChannel(channel: ChannelModel) {
    const { collegeService } = this.props;

    const index = collegeService!._channels.map((channel: ChannelModel) => channel.id).findIndex((id: string) => channel.id === id);
    collegeService!.setChannelsProp(index, 'checked', !channel.checked);
  }

  onClickSeeMore() {
    //
    const { history } = this.props;

    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  render() {
    //
    const { collegeService, lectureService, onViewAll } = this.props;
    const { channels } = collegeService!;
    const { recommendLectures } = lectureService!;
    const channelIds = channels.filter((channel: ChannelModel) => channel.checked).map((channel: ChannelModel) => channel.id);

    // console.log('render channels', channels);

    return (
      <ChannelLecturesContentWrapperContainer
        channels={channels}
        onSelectChannel={this.onSelectChannel}
        onConfirmCallback={this.onConfirmChangeFavorite}
      >
        <div className="recommend-area">
          {
            (!recommendLectures || recommendLectures.length < 1) ?
              <NoSuchContentPanel message="추천 학습 과정이 없습니다." />
              :
              recommendLectures.map((lecture: RecommendLectureRdo, index: number) => {
                if (!channelIds.includes(lecture.channel.id)) return null;
                return (
                  <ChannelLecturesLineContainer
                    channel={new ChannelModel(lecture.channel)}
                    lectures={lecture.lectures}
                    onViewAll={onViewAll}
                    key={`channel_cont_${index}`}
                  />
                );
              })
          }
          { this.isContentMore() && (
            <SeeMoreButtonView onClick={this.onClickSeeMore} />
          )}
        </div>
      </ChannelLecturesContentWrapperContainer>
    );
  }
}

export default withRouter(ChannelsLecturesContainer);

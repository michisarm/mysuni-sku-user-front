
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { NoSuchContentPanel } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import { LectureService, RecommendLectureRdo } from 'lecture';
import routePaths from '../../../routePaths';
import ChannelLecturesContentWrapperContainer from './ChannelLecturesContentWrapperContainer';
import ChannelLecturesLineContainer from './ChannelLecturesLineContainer';
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

    collegeService!.setChannels(channels && channels.length && channels.map(chanel => ({ ...chanel, checked: false })) || []);
    this.findPagingRecommendLectures();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { channels: prevChannels } = prevProps;
    const { collegeService, channels } = this.props;

    if (prevChannels !== channels) {
      collegeService!.setChannels(channels && channels.map(chanel => ({
        ...chanel,
        checked: false,
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

  getDisplayableRecommendLectures() {
    //
    const { recommendLectures } = this.props.lectureService!;
    const { channels, channelIds } = this.props.collegeService!;
    const notChecked = channels.every((channel) => !channel.checked);
    let displayableRecommendLectures: RecommendLectureRdo[] = [];

    /**
     * 관심채널보기 전체해제인 경우는 전체 관심채널들에 대한 추천Lecture 라인들을 보여줌.
     */
    if (notChecked) {
      displayableRecommendLectures = recommendLectures;
    }
    // 선택된 관심채널에 대한 추천Lecture 라인들만 보여줌.(체크확인 filter 처리)
    else {
      const checkedChannelIds = channels.filter((channel) => channel.checked)
        .map((channel) => channel.id);

      displayableRecommendLectures = recommendLectures.filter((lecture) => checkedChannelIds.includes(lecture.channel.id));
    }
    return displayableRecommendLectures;
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
    const { collegeService, onViewAll } = this.props;
    const { channels } = collegeService!;
    const displayableRecommendLectures = this.getDisplayableRecommendLectures();

    return (
      <ChannelLecturesContentWrapperContainer
        channels={channels}
        onSelectChannel={this.onSelectChannel}
        onConfirmCallback={this.onConfirmChangeFavorite}
      >
        <div className="recommend-area">
          { (!displayableRecommendLectures || displayableRecommendLectures.length < 1) ?
            <NoSuchContentPanel message="추천 학습 과정이 없습니다." />
            :
            displayableRecommendLectures
              .map((lecture: RecommendLectureRdo, index: number) => (
                <ChannelLecturesLineContainer
                  channel={new ChannelModel(lecture.channel)}
                  lectures={lecture.lectures}
                  onViewAll={onViewAll}
                  key={`channel_cont_${index}`}
                />
              ))
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

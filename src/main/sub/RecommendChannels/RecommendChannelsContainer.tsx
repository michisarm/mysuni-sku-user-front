
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { LectureService, CollegeLectureCountService, RecommendLectureRdo, ChannelLecturesLine } from 'lecture';
import { ChannelModel } from 'college/model';
import { SkProfileService } from 'profile/stores';
import lectureRoutePaths from 'lecture/routePaths';
import HeaderContainer from './HeaderContainer';
import { Wrapper, EmptyContents } from './RecommendElementsView';
import SeeMoreButtonView from './SeeMoreButtonView';
import routePaths from '../../routePaths';


interface Props extends RouteComponentProps<RouteParams> {
  skProfileService?: SkProfileService
  collegeLectureCountService?: CollegeLectureCountService
  lectureService?: LectureService
}

interface RouteParams {
  pageNo: string
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'lecture.collegeLectureCountService',
  'lecture.lectureService',
))
@observer
@reactAutobind
class RecommendChannelsContainer extends Component<Props> {
  //
  CHANNELS_SIZE = 5;
  LECTURES_SIZE = 8;


  componentDidMount(): void {
    //
    this.findCollegeLectureCounts();
    this.findPagingRecommendLectures();
    this.findStudySummary();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { params: prevParams } = prevProps.match;
    const { params } = this.props.match;

    if (prevParams.pageNo !== params.pageNo) {
      this.addPagingRecommendLectures();
    }
  }

  findCollegeLectureCounts() {
    //
    const { collegeLectureCountService } = this.props;
    collegeLectureCountService!.findCollegeLectureCounts();
  }

  findStudySummary() {
    //
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  async findPagingRecommendLectures() {
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

  routeTo(e: any, data: any) {
    //
    this.props.history.push(lectureRoutePaths.recommendChannelLectures(data.channel.id));
  }

  onClickSeeMore() {
    //
    const { history } = this.props;

    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  render() {
    //
    const { skProfileService, collegeLectureCountService, lectureService } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService!;
    const { totalChannelCount } = collegeLectureCountService!;
    const { recommendLectures } = lectureService!;

    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );

    return (
      <Wrapper>
        <HeaderContainer
          totalChannelCount={totalChannelCount}
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
        { this.isContentMore() && (
          <SeeMoreButtonView onClick={this.onClickSeeMore} />
        )}

      </Wrapper>
    );
  }
}

export default withRouter(RecommendChannelsContainer);

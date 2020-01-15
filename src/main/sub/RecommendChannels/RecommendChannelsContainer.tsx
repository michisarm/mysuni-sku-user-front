
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
import SeeMoreButtonView from './SeeMoreButtonView';
import routePaths from '../../routePaths';


interface Props extends RouteComponentProps<RouteParams> {
  skProfileService?: SkProfileService
  lectureService?: LectureService
}

interface State {
  offset: number
  totalCount: number
}

interface RouteParams {
  pageNo: string
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'lecture.lectureService',
))
@observer
@reactAutobind
class RecommendChannelsContainer extends Component<Props, State> {
  //
  CHANNELS_SIZE = 50;
  LECTURES_SIZE = 8;

  state = {
    offset: 0,
    totalCount: 0,
  };


  componentDidMount(): void {
    //
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

  findStudySummary() {
    //
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  async findPagingRecommendLectures() {
    //
    const { lectureService } = this.props;

    const rdo = await lectureService!.findPagingRecommendLectures(this.CHANNELS_SIZE, this.LECTURES_SIZE);
    this.setState({
      totalCount: rdo.totalCount,
      // offset: rdo.recommendLectureRdos.length,
      // offset:
    });
  }

  async addPagingRecommendLectures() {
    //
    const { lectureService } = this.props;
    const { offset } = this.state;

    const rdo = await lectureService!.addFindPagingRecommendLectures(this.CHANNELS_SIZE, parseInt(this.props.match.params.pageNo, 10) - 1, this.LECTURES_SIZE, 0);

    this.setState({
      totalCount: rdo.totalCount,
      offset: rdo.recommendLectureRdos.length,
    });
  }

  isContentMore() {
    //
    const { lectureService } = this.props;
    const { recommendLectures } = lectureService!;
    const { offset, totalCount } = this.state;

    return recommendLectures.length < totalCount;
  }

  routeTo(e: any, data: any) {
    //
    this.props.history.push(lectureRoutePaths.recommendChannelLectures(data.channel.id));
  }

  onClickSeeMore() {
    //
    const { match, history } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);

    history.replace(routePaths.main(pageNo + 1));
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
        {/*{ this.isContentMore() && (*/}
        {/*  <SeeMoreButtonView onClick={this.onClickSeeMore} />*/}
        {/*)}*/}

      </Wrapper>
    );
  }
}

export default withRouter(RecommendChannelsContainer);

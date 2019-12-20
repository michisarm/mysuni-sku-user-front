
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { mobxHelper, PageService, Lecture } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureService, LectureCardService, LectureModel, LectureServiceType } from 'lecture';
import { CardSorting, SeeMoreButton } from '../../../shared';
import ChannelLecturesContentWrapperView from '../view/ChannelLecturesContentWrapperView';



interface Props extends RouteComponentProps<{ channelId: string }> {
  pageService?: PageService,
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
  reviewService?: ReviewService,
}

interface State {
  sorting: string,
}

@inject(mobxHelper.injectFrom('shared.pageService', 'lecture.lectureService', 'lecture.lectureCardService', 'shared.reviewService'))
@reactAutobind
@observer
class ChannelLecturesContainer extends Component<Props, State> {
  //
  PAGE_KEY = 'lecture.channel';

  PAGE_SIZE = 8;

  state = {
    sorting: 'latest',
  };


  constructor(props: Props) {
    //
    super(props);
    this.init();
  }


  componentDidMount() {
    //
    this.findPagingChannelLectures();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.channelId !== this.props.match.params.channelId) {
      this.init();
      this.findPagingChannelLectures();
    }
  }

  init() {
    //
    const { pageService, lectureService } = this.props;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    lectureService!.clear();
  }

  async findPagingChannelLectures() {
    //
    const { match, pageService, lectureService, reviewService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    const lectureOffsetList = await lectureService!.findPagingChannelLectures(match.params.channelId, page!.limit, page!.nextOffset);
    const feedbackIds = (lectureService!.lectures || []).map((lecture: LectureModel) => lecture.reviewFeedbackId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, page!.pageNo + 1);
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    console.log('is more', page!.pageNo, page!.totalPages);
    return page!.pageNo < page!.totalPages;
  }

  onChangeSorting(e: any, data: any) {
    //
    this.setState({
      sorting: data.value,
    });
  }

  onActionLecture() {

  }

  onViewDetail(e: any, data: any) {
    //
    const { lecture } = data;
    const { history } = this.props;

    console.log('serviceType', lecture.serviceType);
    if (lecture.serviceType === LectureServiceType.Card) {
      history.push(`../lecture-card/${lecture.serviceId}`);
    }
  }

  onClickSeeMore() {
    //
    this.findPagingChannelLectures();
  }

  render() {
    //
    const { pageService, lectureService, reviewService } = this.props;
    const { sorting } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { lectures } = lectureService!;
    const { ratingMap } = reviewService!;

    console.log('rating', ratingMap);
    return (
      <ChannelLecturesContentWrapperView
        lectureCount={page!.totalCount}
      >
        <>
          <CardSorting
            value={sorting}
            onChange={this.onChangeSorting}
          />

          <div className="section">
            <Lecture.Group type={Lecture.GroupType.Box}>
              {lectures.map((lecture: LectureModel, index: number) => {
                const rating = ratingMap.get(lecture.reviewFeedbackId) || 0;
                return (
                  <Lecture
                    key={`lecture-${index}`}
                    lecture={lecture}
                    rating={rating}
                    // thumbnailImage="http://placehold.it/60x60"
                    action={Lecture.ActionType.Add}
                    onAction={this.onActionLecture}
                    onViewDetail={this.onViewDetail}
                  />
                );
              })}
            </Lecture.Group>

            { this.isContentMore() && (
              <SeeMoreButton
                onClick={this.onClickSeeMore}
              />
            )}
          </div>
        </>
      </ChannelLecturesContentWrapperView>
    );
  }
}

export default withRouter(ChannelLecturesContainer);


import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { mobxHelper, PageService, Lecture, NoSuchContentPanel } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureService, LectureCardService, LectureModel, LectureServiceType } from 'lecture';
import LectureCountService from '../../present/logic/LectureCountService';

import { ChannelsPanel, CardSorting, SeeMoreButton } from '../../../shared';
import CategoryLecturesContentWrapperView from '../view/CategoryLecturesContentWrapperView';
import LecturesWrapperView from '../view/LecturesWrapperView';
import { DescriptionView } from '../view/CategoryLecturesElementsView';



interface Props extends RouteComponentProps<{ collegeId: string }> {
  pageService?: PageService,
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
  lectureCountService?: LectureCountService,
  reviewService?: ReviewService,
}

interface State {
  sorting: string,
}

@inject(mobxHelper.injectFrom('shared.pageService', 'collegeService', 'personalCube.personalCubeService', 'lecture.lectureService', 'lecture.lectureCardService', 'lecture.lectureCountService', 'shared.reviewService'))
@reactAutobind
@observer
class CategoryLecturesContainer extends Component<Props, State> {
  //
  PAGE_KEY = 'lecture.category';

  PAGE_SIZE = 8;

  state = {
    sorting: 'latest',
  };


  constructor(props: Props) {
    //
    super(props);
    props.pageService!.initPageMap(this.PAGE_KEY);
    props.pageService!.setPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
  }

  componentDidMount() {
    //
    this.init();
    this.findPagingCollegeLectures();
    this.findChannels();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.collegeId !== this.props.match.params.collegeId) {
      this.init();
      this.findPagingCollegeLectures();
    }
  }

  init() {
    //
    this.props.lectureService!.clear();
  }

  async findPagingCollegeLectures() {
    //
    const { match, pageService, lectureService, reviewService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    const lectureOffsetList = await lectureService!.findPagingCollegeLectures(match.params.collegeId, page!.limit, page!.offset);
    const feedbackIds = (lectureService!.lectures || []).map((lecture: LectureModel) => lecture.reviewFeedbackId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, page!.pageNo + 1);
  }

  findChannels() {
    //
    const { match, collegeService, lectureCountService } = this.props;

    lectureCountService!.findLectureCountByCollegeId(match.params.collegeId, collegeService!.channels);
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    return page!.pageNo < page!.totalPages;
  }

  onSelectChannel(e: any, { index, channel }: any) {
    //
    const { lectureCountService } = this.props;

    lectureCountService!.setChannelsProp(index, 'checked', !channel.checked);
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
      history.push(`./lecture-card/${lecture.serviceId}`);
    }
  }

  onClickSeeMore() {
    //
    this.findPagingCollegeLectures();
  }

  render() {
    //
    const { pageService, collegeService, lectureService, lectureCountService, reviewService } = this.props;
    const { sorting } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { college } = collegeService!;
    const { lectures } = lectureService!;
    const { channels } = lectureCountService!;
    const { ratingMap } = reviewService!;

    return (
      <CategoryLecturesContentWrapperView>
        <ChannelsPanel
          channels={channels}
          onSelectChannel={this.onSelectChannel}
        />
        <LecturesWrapperView
          header={
            <>
              <DescriptionView
                name={`${college.name} College`}
                count={page!.totalCount}
              />
              <CardSorting
                value={sorting}
                onChange={this.onChangeSorting}
              />
            </>
          }
        >
          {lectures && lectures.length > 0 ?
            <>
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
            </>
            :
            <NoSuchContentPanel message="수강중인 학습 과정이 없습니다." />
          }
        </LecturesWrapperView>
      </CategoryLecturesContentWrapperView>
    );
  }
}



export default withRouter(CategoryLecturesContainer);

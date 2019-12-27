import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { mobxHelper, NoSuchContentPanel, PageService } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import { LectureModel, LectureService } from 'lecture';
import LectureCountService from '../../present/logic/LectureCountService';

import { CardSorting, ChannelsPanel, SeeMoreButton } from '../../../shared';
import Lecture from '../../../shared/Lecture';
import CategoryLecturesContentWrapperView from '../view/CategoryLecturesContentWrapperView';
import CategoryLecturesWrapperView from '../view/CategoryLecturesWrapperView';
import ChannelsLecturesWrapperView from '../view/ChannelsLecturesWrapperView';
import { DescriptionView } from '../view/CategoryLecturesElementsView';
import ChannelLecturesContainer from '../../../recommend/ui/logic/ChannelLecturesContainer';
import LectureServiceType from '../../../shared/model/LectureServiceType';


interface Props extends RouteComponentProps<{ collegeId: string }> {
  pageService?: PageService,
  collegeService?: CollegeService,
  lectureService?: LectureService,
  lectureCountService?: LectureCountService,
  reviewService?: ReviewService,
}

interface State {
  lectures: LectureModel[],
  sorting: string,
}

@inject(mobxHelper.injectFrom(
  'shared.pageService', 'collegeService', 'lecture.lectureService', 'lecture.lectureCountService', 'shared.reviewService',
))
@reactAutobind
@observer
class CategoryLecturesContainer extends Component<Props, State> {
  //
  PAGE_KEY = 'lecture.category';

  PAGE_SIZE = 8;

  state = {
    lectures: [],
    sorting: 'latest',
  };


  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  componentDidMount() {
    //
    this.findPagingCollegeLectures();
    this.findChannels();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.match.params.collegeId !== this.props.match.params.collegeId) {
      this.reInit();
      this.findPagingCollegeLectures();
    }
  }

  init() {
    //
    const { pageService, lectureService } = this.props;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    lectureService!.clear();
  }

  reInit() {
    //
    const { pageService, lectureService } = this.props;

    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    lectureService!.clear();
    this.setState({ lectures: []});
  }

  async findPagingCollegeLectures() {
    //
    const { match, pageService, lectureService, reviewService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    const lectureOffsetList = await lectureService!.findPagingCollegeLectures(match.params.collegeId, page!.limit, page!.nextOffset);
    const feedbackIds = (lectureService!.lectures || []).map((lecture: LectureModel) => lecture.reviewId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);

    this.setState((prevState) => ({
      lectures: [ ...prevState.lectures, ...lectureOffsetList.results],
    }));
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

    if (data.lecture.serviceType === LectureServiceType.Program ||  data.lecture.serviceType === LectureServiceType.Course) {
      history.push(`./course-plan/${lecture.coursePlanId}/${data.lecture.serviceType}/${lecture.serviceId}`);
    }
    else if (lecture.serviceType === LectureServiceType.Card) {
      history.push(`./cube/${lecture.cubeId}/lecture-card/${lecture.serviceId}`);
    }
  }

  onClickSeeMore() {
    //
    this.findPagingCollegeLectures();
  }

  onViewChannelAll(e: string, data: any) {
    //
    this.props.history.push(`./channel/${data.channel.id}`);
  }


  renderCollegeLectures() {
    //
    const { pageService, collegeService, reviewService } = this.props;
    const { lectures, sorting } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { college } = collegeService!;
    const { ratingMap } = reviewService!;

    return (
      <CategoryLecturesWrapperView
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
                const rating = ratingMap.get(lecture.reviewId) || 0;
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
      </CategoryLecturesWrapperView>
    );
  }

  renderChannelsLectures() {
    //
    const { lectureCountService } = this.props;
    const { channels } = lectureCountService!;

    return (
      <ChannelsLecturesWrapperView>
        { channels && channels.length
          && channels.map((channel: ChannelModel) => (
            channel.checked && (
              <ChannelLecturesContainer
                channel={channel}
                onViewAll={this.onViewChannelAll}
                key={`channel_cont_${channel.id}`}
              />
            )
          ))
        }
      </ChannelsLecturesWrapperView>
    );
  }

  render() {
    //
    const { lectureCountService } = this.props;
    const { channels, allSelected } = lectureCountService!;

    return (
      <CategoryLecturesContentWrapperView>
        <ChannelsPanel
          channels={channels}
          onSelectChannel={this.onSelectChannel}
        />
        {allSelected ?
          this.renderCollegeLectures()
          :
          this.renderChannelsLectures()
        }
      </CategoryLecturesContentWrapperView>
    );
  }
}



export default withRouter(CategoryLecturesContainer);

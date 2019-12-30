import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { mobxHelper, NoSuchContentPanel, PageService } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import { LectureModel, LectureService } from 'lecture';
import { InMyLectureService, InMyLectureCdoModel, InMyLectureModel } from 'mytraining';
import LectureCountService from '../../present/logic/LectureCountService';
import routePaths from '../../../routePaths';

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
  inMyLectureService?: InMyLectureService,
}

interface State {
  lectures: LectureModel[],
  sorting: string,
}

@inject(mobxHelper.injectFrom(
  'shared.pageService',
  'collegeService',
  'lecture.lectureService',
  'lecture.lectureCountService',
  'shared.reviewService',
  'myTraining.inMyLectureService',
))
@reactAutobind
@observer
class CollegeLecturesContainer extends Component<Props, State> {
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


  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;
    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(this.findPagingCollegeLectures);
    }
    else {
      inMyLectureService!.addInMyLecture(new InMyLectureCdoModel({
        serviceId: lecture.serviceId,
        serviceType: lecture.serviceType,
        category: lecture.category,
        name: lecture.name,
        description: lecture.description,
        cubeType: lecture.cubeType,
        learningTime: lecture.learningTime,
        stampCount: lecture.stampCount,
        coursePlanId: lecture.coursePlanId,

        requiredSubsidiaries: lecture.requiredSubsidiaries,
        cubeId: lecture.cubeId,
        courseSetJson: lecture.courseSetJson,
        courseLectureUsids: lecture.courseLectureUsids,
        lectureCardUsids: lecture.lectureCardUsids,

        reviewId: lecture.reviewId,
      }));
    }
  }

  onViewDetail(e: any, { model }: any) {
    //
    const { history, collegeService } = this.props;
    const { college } = collegeService!;

    if (model.serviceType === LectureServiceType.Program ||  model.serviceType === LectureServiceType.Course) {
      history.push(routePaths.courseOverview(college.collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(routePaths.lectureCardOverview(college.collegeId, model.cubeId, model.serviceId));
    }
  }

  onClickSeeMore() {
    //
    this.findPagingCollegeLectures();
  }

  onViewChannelAll(e: string, data: any) {
    //
    const { match, history } = this.props;

    history.push(routePaths.channelLectures(match.params.collegeId, data.channel.id));
  }


  renderCollegeLectures() {
    //
    const { pageService, collegeService, reviewService, inMyLectureService } = this.props;
    const { lectures, sorting } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { college } = collegeService!;
    const { ratingMap } = reviewService!;
    const { inMyLectureMap } =  inMyLectureService!;

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
                const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;
                return (
                  <Lecture
                    key={`lecture-${index}`}
                    model={lecture}
                    rating={rating}
                    // thumbnailImage="http://placehold.it/60x60"
                    action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                    onAction={() => this.onActionLecture(inMyLecture || lecture)}
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



export default withRouter(CollegeLecturesContainer);

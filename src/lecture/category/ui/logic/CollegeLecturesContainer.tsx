import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { NoSuchContentPanel, NewPageService, CubeType } from 'shared';
import { ChannelModel, CollegeService } from 'college';
import { LectureModel, LectureService } from 'lecture';
import { InMyLectureService, InMyLectureCdoModel, InMyLectureModel } from 'myTraining';
import LectureCountService from '../../present/logic/LectureCountService';
import routePaths from '../../../routePaths';

import { CardSorting, ChannelsPanel, SeeMoreButton, OrderByType } from '../../../shared';
import Lecture from '../../../shared/Lecture';
import CategoryLecturesContentWrapperView from '../view/CategoryLecturesContentWrapperView';
import CategoryLecturesWrapperView from '../view/CategoryLecturesWrapperView';
import ChannelsLecturesWrapperView from '../view/ChannelsLecturesWrapperView';
import { DescriptionView } from '../view/CategoryLecturesElementsView';
import LecturesByChannelContainer from '../../../category/ui/logic/LecturesByChannelContainer';
import LectureServiceType from '../../../shared/model/LectureServiceType';


interface Props extends RouteComponentProps<RouteParams> {
  newPageService?: NewPageService,
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

interface RouteParams {
  collegeId: string
  pageNo: string,
}

@inject(mobxHelper.injectFrom(
  'shared.newPageService',
  'college.collegeService',
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
    sorting: OrderByType.Time,
  };


  constructor(props: Props) {
    //
    super(props);
    this.init();
  }

  componentDidMount() {
    //
    this.initialFindPagingCollegeLectures();
    this.findChannels();
    this.findInMyLectures();
  }

  componentDidUpdate(prevProps: Props) {
    //
    const { params: prevParams } = prevProps.match;
    const { params } = this.props.match;

    if (prevParams.collegeId !== params.collegeId) {
      this.clearAndInit();
      this.initialFindPagingCollegeLectures();
      this.findInMyLectures();
    }
    if (prevParams.pageNo !== params.pageNo) {
      this.addFindPagingCollegeLectures();
    }
  }

  init() {
    //
    const { match, newPageService, lectureService } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);

    newPageService!.initPageMap(this.PAGE_KEY, this.PAGE_SIZE, pageNo);
    lectureService!.clearLectures();
  }

  clearAndInit() {
    //
    this.init();
    this.setState({ lectures: []});
  }

  findChannels() {
    //
    const { match, collegeService, lectureCountService } = this.props;

    lectureCountService!.findLectureCountByCollegeId(match.params.collegeId, collegeService!.channels);
  }

  findInMyLectures() {
    const { inMyLectureService } = this.props;
    inMyLectureService!.findAllInMyLectures();
  }

  async initialFindPagingCollegeLectures() {
    //
    const { newPageService } = this.props;
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    this.findPagingCollegeLectures(page.limit * page.pageNo, 0);
  }

  async addFindPagingCollegeLectures() {
    //
    const { newPageService } = this.props;
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    this.findPagingCollegeLectures(page.limit, page.nextOffset);
  }

  async findPagingCollegeLectures(limit: number, offset: number) {
    //
    const { match, newPageService, lectureService, reviewService } = this.props;
    const { sorting } = this.state;
    const pageNo = parseInt(match.params.pageNo, 10);


    const lectureOffsetList = await lectureService!.findPagingCollegeLectures(match.params.collegeId, limit, offset, sorting);

    const feedbackIds = (lectureService!.lectures || []).map((lecture: LectureModel) => lecture.reviewId);
    if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);

    this.setState((prevState) => ({
      lectures: [ ...prevState.lectures, ...lectureOffsetList.results],
    }));
    newPageService!.setTotalCountAndPageNo(this.PAGE_KEY, lectureOffsetList.totalCount, pageNo);
  }

  isContentMore() {
    //
    const { match, newPageService } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);
    const page = newPageService!.pageMap.get(this.PAGE_KEY)!;

    return pageNo < page.totalPages;
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
    }, () => {
      this.clearAndInit();
      this.initialFindPagingCollegeLectures();
    });
  }


  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;

    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(() => inMyLectureService!.findAllInMyLectures());
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
      }))
        .then(() => inMyLectureService!.findAllInMyLectures());
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
    const { match, history } = this.props;
    const pageNo = parseInt(match.params.pageNo, 10);
    // this.findPagingCollegeLectures();
    history.replace(routePaths.collegeLecturesPage(pageNo + 1));
  }

  onViewChannelAll(e: string, data: any) {
    //
    const { match, history } = this.props;

    history.push(routePaths.channelLectures(match.params.collegeId, data.channel.id));
  }


  renderCollegeLectures() {
    //
    const { newPageService, collegeService, reviewService, inMyLectureService } = this.props;
    const { lectures, sorting } = this.state;
    const page = newPageService!.pageMap.get(this.PAGE_KEY);
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
                let rating: number | undefined = ratingMap.get(lecture.reviewId) || 0;
                const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;
                if (lecture.cubeType === CubeType.Community) rating = undefined;
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
          <NoSuchContentPanel message="등록된 학습 과정이 없습니다." />
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
              <LecturesByChannelContainer
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

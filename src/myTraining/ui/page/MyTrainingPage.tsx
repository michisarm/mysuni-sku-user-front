import React, { Component } from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { Segment } from 'semantic-ui-react';

import { ContentHeader, ContentLayout, ContentMenu, NoSuchContentPanel, PageService, CubeType } from 'shared';
import { SkProfileModel, SkProfileService } from 'profile';
import { Lecture, LectureService, LectureModel } from 'lecture';
import { ChannelModel } from 'college';
import lectureRoutePaths from 'lecture/routePaths';
import { LectureServiceType, SeeMoreButton } from 'lecture/shared';
import routePaths from '../../routePaths';
import { ContentHeaderTotalTimeItem } from '../../shared';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';
import MyTrainingService from '../../present/logic/MyTrainingService';
import InMyLectureService from '../../present/logic/InMyLectureService';
import LineHeaderContainer from '../logic/LineHeaderContainer';

import MyTrainingModel from '../../model/MyTrainingModel';
import InMyLectureModel from '../../model/InMyLectureModel';
import InMyLectureCdoModel from '../../model/InMyLectureCdoModel';


interface Props extends RouteComponentProps<{ tab: string }> {
  pageService?: PageService,
  reviewService?: ReviewService,
  skProfileService?: SkProfileService
  lectureService?: LectureService
  myTrainingService?: MyTrainingService
  inMyLectureService?: InMyLectureService
  myLearningSummaryService?: MyLearningSummaryService
}

interface State {
  type: string
  channels: ChannelModel[]
}

enum Type {
  InProgress= 'InProgress',
  InMyList= 'InMyList',
  Enrolled= 'Enrolled',
  Required= 'Required',
  Completed= 'Completed',
  Retry= 'Retry',
}

@inject(mobxHelper.injectFrom(
  'shared.pageService',
  'shared.reviewService',
  'profile.skProfileService',
  'lecture.lectureService',
  'myTraining.myTrainingService',
  'myTraining.inMyLectureService',
  'myTraining.myLearningSummaryService',
))
@observer
@reactAutobind
class MyTrainingPage extends Component<Props, State> {
  //
  PAGE_KEY = 'training';

  PAGE_SIZE = 8;

  state= {
    type: Type.InProgress,
    channels: [],
  };

  componentDidMount(): void {
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const currentTab = this.props.match.params.tab;

    if (prevProps.match.params.tab !== currentTab) {
      this.selectMenu(currentTab);
    }
  }

  init() {
    const { match, skProfileService, myLearningSummaryService } = this.props;

    skProfileService!.findSkProfile();
    myLearningSummaryService!.findMyLearningSummary();

    this.selectMenu(match.params.tab);
  }

  selectMenu(type: string) {
    //
    const { type: prevType } = this.state;

    if (type !== prevType) {
      const { pageService, lectureService, inMyLectureService, myTrainingService } = this.props;

      if (type === Type.InMyList) {
        inMyLectureService!.clear();
      }
      if (type === Type.Required) {
        lectureService!.clearLectures();
      } else {
        myTrainingService!.clear();
      }
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.setState({ type }, this.findPagingList);
    }
  }

  onSelectMenu(type: string) {
    //
    this.props.history.push(routePaths.learningTab(type));
  }

  async findPagingList() {
    const { inMyLectureService, myTrainingService, lectureService, pageService, reviewService } = this.props;
    const { channels } = this.state;
    const channelIds = channels.map((channel: ChannelModel) => channel.channelId);
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { type } = this.state;
    let offsetList: any = null;
    let feedbackIds: string[] = [];

    inMyLectureService!.findAllInMyLectures();
    if (type === Type.InMyList) {
      offsetList = await inMyLectureService!.findInMyLectures(page!.limit, page!.nextOffset, channelIds);
      feedbackIds = (offsetList.results || []).map((lecture: InMyLectureModel) => lecture.reviewId);
      await reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }
    else if (type === Type.Required) {
      offsetList = await lectureService!.findPagingRequiredLectures(page!.limit, page!.nextOffset, channelIds);
    }
    else {
      offsetList = await myTrainingService!.findAndAddAllMyTrainingsWithState(type, page!.limit, page!.nextOffset, channelIds);
    }

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, page!.pageNo + 1);
  }

  onActionLecture(training: MyTrainingModel | InMyLectureModel) {
    //
    const { type } = this.state;
    const { inMyLectureService } = this.props;
    if (training instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(training.id)
        .then(() => {
          if (type === Type.InMyList) this.init();
          else inMyLectureService!.findAllInMyLectures();
        });
    }
    else {
      inMyLectureService!.addInMyLecture(new InMyLectureCdoModel({
        serviceId: training.serviceId,
        serviceType: training.serviceType,
        category: training.category,
        name: training.name,
        description: training.description,
        cubeType: training.cubeType,
        learningTime: training.learningTime,
        stampCount: training.stampCount,
        coursePlanId: training.coursePlanId,

        requiredSubsidiaries: training.requiredSubsidiaries,
        cubeId: training.cubeId,
        courseSetJson: training.courseSetJson,
        courseLectureUsids: training.courseLectureUsids,
        lectureCardUsids: training.lectureCardUsids,

        reviewId: training.reviewId,
      }))
        .then(() => {
          if (type === Type.InMyList) this.findPagingList();
          else inMyLectureService!.findAllInMyLectures();
        });
    }
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(lectureRoutePaths.courseOverview(model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.lectureCardOverview(model.category.college.id, model.cubeId, model.serviceId));
    }
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    if (!page || !page.pageNo || !page.totalPages) return false;
    return page!.pageNo < page!.totalPages;
  }

  onFilter(channels: ChannelModel[]) {
    const { pageService, inMyLectureService, lectureService, myTrainingService } = this.props;
    const { type } = this.state;
    this.setState({ channels }, () => {
      if (type === Type.InMyList) {
        inMyLectureService!.clear();
      } else if (type === Type.Required) {
        lectureService!.clearLectures();
      } else {
        myTrainingService!.clear();
      }
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findPagingList();
    });
  }

  renderList() {
    const { skProfileService, inMyLectureService, lectureService, myTrainingService, reviewService, pageService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;
    const { member } = skProfile as SkProfileModel;
    const { ratingMap } =  reviewService as ReviewService;
    const { type, channels } = this.state;
    const { inMyLectureMap } =  inMyLectureService!;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    let cardType = Lecture.GroupType.Box;
    let list: (MyTrainingModel | LectureModel | InMyLectureModel)[] = [];
    let noSuchContentPanel = '';

    switch (type) {
      case Type.InMyList:
        list = inMyLectureService!.inMyLectures;
        noSuchContentPanel = '관심목록에 추가한 학습 과정이 없습니다.';
        break;
      case Type.Required:
        list = lectureService!.lectures;
        noSuchContentPanel = '권장과정에 해당하는 학습 과정이 없습니다.';
        break;
      case Type.Completed:
        cardType = Lecture.GroupType.List;
        list = myTrainingService!.myTrainings;
        noSuchContentPanel = '학습완료에 해당하는 학습 과정이 없습니다.';
        break;
      case Type.Enrolled:
        noSuchContentPanel = '수강 대기중인 학습 과정이 없습니다.';
        list = myTrainingService!.myTrainings;
        break;
      case Type.InProgress:
        noSuchContentPanel = '수강중인 학습 과정이 없습니다.';
        list = myTrainingService!.myTrainings;
        break;
      case Type.Retry:
        list = myTrainingService!.myTrainings;
        noSuchContentPanel = '취소/미이수에 해당하는 학습 과정이 없습니다.';
        break;
    }

    return (
      <Segment className="full">
        <LineHeaderContainer count={page && page.totalCount || 0} channels={channels} onFilter={this.onFilter} />
        {
          list && list.length && (
            <Lecture.Group type={cardType}>
              {list.map((value: MyTrainingModel | LectureModel | InMyLectureModel, index: number) => {
                let rating: number | undefined;
                if ((value instanceof InMyLectureModel || value instanceof LectureModel) && value.cubeType !== CubeType.Community) {
                  rating = ratingMap.get(value.reviewId) || 0;
                }
                const inMyLecture = inMyLectureMap.get(value.serviceId) || undefined;
                return (
                  <Lecture
                    key={`training-${index}`}
                    model={value}
                    rating={rating}
                    // thumbnailImage="http://placehold.it/60x60"
                    action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                    onAction={() => this.onActionLecture(inMyLecture || value)}
                    onViewDetail={this.onViewDetail}
                  />
                );
              })}
            </Lecture.Group>
          ) || (
            <NoSuchContentPanel message={(
              <>
                <div className="text">{noSuchContentPanel}</div>
                <a
                  className="ui icon right button btn-blue2"
                  onClick={() => this.props.history.push('/lecture/recommend')}
                >
                  {member.name}님에게 추천하는 학습 과정 보기<i className="icon morelink" />
                </a>
              </>
              )}
            />
          )
        }

        { this.isContentMore() && (
          <SeeMoreButton
            onClick={this.findPagingList}
          />
        )}
      </Segment>
    );
  }


  render() {
    //
    const { skProfileService, myLearningSummaryService } = this.props;
    const { type } = this.state;
    const { skProfile } = skProfileService as SkProfileService;
    const { myLearningSummary } = myLearningSummaryService as MyLearningSummaryService;

    const { member } = skProfile as SkProfileModel;

    return (
      <ContentLayout
        className="mylearning"
        breadcrumb={[
          { text: `Learning` },
          { text: `${type}` },
        ]}
      >
        <ContentHeader>
          <ContentHeader.Cell inner>
            <ContentHeader.ProfileItem
              image={member && member.base64Photo || `${process.env.PUBLIC_URL}/images/all/img-profile-56-px.png`}
              name={member.name}
              teams={[member.company || '', member.department || '']}
              imageEditable={false}
              myPageActive
            />
          </ContentHeader.Cell>
          <ContentHeader.Cell inner>
            <ContentHeaderTotalTimeItem
              minute={myLearningSummary.totalLearningTime}
            />
            {
              (myLearningSummary.suniLearningTime > 0 || myLearningSummary.myCompanyLearningTime > 0) && (
                <ContentHeader.ChartItem
                  universityTime={myLearningSummary.suniLearningTime}
                  myCompanyTime={myLearningSummary.myCompanyLearningTime}
                />
              ) || (
                <ContentHeader.WaitingItem
                  onClick={() => this.props.history.push(lectureRoutePaths.recommend())}
                />
              )
            }
          </ContentHeader.Cell>
        </ContentHeader>
        <ContentMenu
          menus={[
            {
              name: '학습중인 과정',
              type: Type.InProgress,
            },
            {
              name: '관심목록',
              type: Type.InMyList,
            },
            {
              name: '수강확정 과정',
              type: Type.Enrolled,
            },
            {
              name: '권장과정',
              type: Type.Required,
            },
            {
              name: '학습완료',
              type: Type.Completed,
            },
            {
              name: '취소/미이수',
              type: Type.Retry,
            },
          ]}
          type={this.state.type}
          onSelectMenu={this.onSelectMenu}
        >
          { this.renderList() }
        </ContentMenu>
      </ContentLayout>
    );
  }
}

export default withRouter(MyTrainingPage);

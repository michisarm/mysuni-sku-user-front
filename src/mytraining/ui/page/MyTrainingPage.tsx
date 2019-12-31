
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { ReviewService } from '@nara.drama/feedback';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

import { ContentHeader, ContentLayout, ContentMenu, mobxHelper, NoSuchContentPanel, PageService } from 'shared';
import { SkProfileModel, SkProfileService } from 'profile';
import { Lecture } from 'lecture';
import { SeeMoreButton, LectureServiceType } from 'lecture/shared';
import routePaths from 'lecture/routePaths';
import { ContentHeaderTotalTimeItem } from '../../shared';
import MyLearningSummaryService from '../../present/logic/MyLearningSummaryService';
import MyTrainingService from '../../present/logic/MyTrainingService';
import InMyLectureService from '../../present/logic/InMyLectureService';
import LineHeaderView from '../view/LineHeaderView';

import MyTrainingModel from '../../model/MyTrainingModel';
import InMyLectureModel from '../../model/InMyLectureModel';


interface Props extends RouteComponentProps {
  pageService?: PageService,
  reviewService?: ReviewService,
  skProfileService?: SkProfileService
  myTrainingService?: MyTrainingService
  inMyLectureService?: InMyLectureService
  myLearningSummaryService?: MyLearningSummaryService
}

interface State {
  type: string
}

enum Type {
  InProgress= 'In Progress',
  InMyList= 'In My List',
  Enrolled= 'Enrolled',
  Required= 'Required',
  Completed= 'Completed',
  Retry= 'Retry',
}

@inject(mobxHelper.injectFrom(
  'shared.pageService',
  'shared.reviewService',
  'skProfileService',
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
  };

  componentDidMount(): void {
    this.init();
  }

  init() {
    const { skProfileService, myLearningSummaryService, pageService } = this.props;

    skProfileService!.findSkProfile();
    myLearningSummaryService!.findMyLearningSummary();
    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    this.findPagingList();
  }

  onSelectMenu(type: string) {
    //
    const { pageService, inMyLectureService, myTrainingService } = this.props;

    if (type === Type.InMyList) {
      inMyLectureService!.clear();
    }
    else {
       myTrainingService!.clear();
    }
    pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
    this.setState({ type }, this.findPagingList);
  }

  async findPagingList() {
    const { inMyLectureService, myTrainingService, pageService, reviewService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { type } = this.state;
    let offsetList: any = null;
    let feedbackIds: string[] = [];

    if (type === Type.InMyList) {
      offsetList = await inMyLectureService!.findAllInMyLectures(page!.limit, page!.nextOffset);
      feedbackIds = (offsetList.results || []).map((lecture: InMyLectureModel) => lecture.reviewId);
      await reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }
    else if (type === Type.Required) {
      offsetList = await myTrainingService!.findAllMyTrainingsWithRequired(page!.limit, page!.nextOffset);
    }
    else {
      offsetList = await myTrainingService!.findAllMyTrainingsWithState(type, page!.limit, page!.nextOffset);
    }

    pageService!.setTotalCountAndPageNo(this.PAGE_KEY, offsetList.totalCount, page!.pageNo + 1);
  }

  onActionLecture() {

  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(routePaths.courseOverview(model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(routePaths.lectureCardOverview(model.category.college.id, model.cubeId, model.serviceId));
    }
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    if (!page || !page.pageNo || !page.totalPages) return false;
    return page!.pageNo < page!.totalPages;
  }

  renderList() {
    const { inMyLectureService, myTrainingService, reviewService, pageService } = this.props;
    const { ratingMap } =  reviewService as ReviewService;
    const { type } = this.state;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    let cardType = Lecture.GroupType.Box;
    let list: (MyTrainingModel | InMyLectureModel)[] = [];

    switch (type) {
      case Type.InMyList:
        list = inMyLectureService!.inMyLectures;
        break;
      case Type.Completed:
        cardType = Lecture.GroupType.List;
        list = myTrainingService!.myTrainings;
        break;
      default:
        list = myTrainingService!.myTrainings;
        break;
    }

    return (
      <Segment className="full">
        <LineHeaderView count={page && page.totalCount || 0} />
        {
          list && list.length && (
            <Lecture.Group type={cardType}>
              {list.map((value: MyTrainingModel | InMyLectureModel, index: number) => {
                let rating: number | undefined = 0;
                if (value instanceof InMyLectureModel) {
                  rating = ratingMap.get(value.reviewId);
                }
                return (
                  <Lecture
                    key={`training-${index}`}
                    model={value}
                    rating={rating || undefined}
                    // thumbnailImage="http://placehold.it/60x60"
                    action={Lecture.ActionType.Add}
                    onAction={this.onActionLecture}
                    onViewDetail={this.onViewDetail}
                  />
                );
              })}
            </Lecture.Group>
          ) || (
            <NoSuchContentPanel message="해당하는 학습과정이 없습니다." />
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
              image={member && member.base64Photo || `${process.env.PUBLIC_URL}/images/all/profile-56-px.png`}
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
              myLearningSummary.suniLearningTime > 0 && myLearningSummary.myCompanyLearningTime > 0 && (
                <ContentHeader.ChartItem
                  universityTime={myLearningSummary.suniLearningTime}
                  myCompanyTime={myLearningSummary.myCompanyLearningTime}
                />
              ) || (
                <ContentHeader.WaitingItem
                  onClick={() => this.props.history.push('/recommend')}
                />
              )
            }
          </ContentHeader.Cell>
        </ContentHeader>
        <ContentMenu
          menus={[
            {
              name: 'In Progress',
              type: 'In Progress',
            },
            {
              name: 'In my list',
              type: 'In My List',
            },
            {
              name: 'Enrolled',
              type: 'Enrolled',
            },
            {
              name: 'Required',
              type: 'Required',
            },
            {
              name: 'Completed',
              type: 'Completed',
            },
            {
              name: 'Retry',
              type: 'Retry',
            },
          ]}
          type={this.state.type}
          onSelectMenu={this.onSelectMenu}
        />
        { this.renderList() }
      </ContentLayout>
    );
  }
}

export default withRouter(MyTrainingPage);

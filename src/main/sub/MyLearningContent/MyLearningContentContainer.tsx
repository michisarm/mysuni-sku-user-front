
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { patronInfo } from '@nara.platform/dock';

import { Button, Icon } from 'semantic-ui-react';
import { ReviewService } from '@nara.drama/feedback';
import { CubeType, NoSuchContentPanel } from 'shared';
import { Lecture, LectureService } from 'lecture';
import { LectureServiceType } from 'lecture/shared';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutes from 'myTraining/routePaths';
import { MyTrainingService, InMyLectureService, InMyLectureCdoModel, InMyLectureModel } from 'myTraining';
import MyTrainingModel from '../../../myTraining/model/MyTrainingModel';
import MyLearningTabContainer from './MyLearningTabContainer';
import { Wrapper } from './MyLearningContentElementsView';
import LectureModel from '../../../lecture/shared/model/LectureModel';
import NotieService from '../../../layout/UserApp/present/logic/NotieService';


interface Props extends RouteComponentProps {
  reviewService?: ReviewService,
  myTrainingService?: MyTrainingService,
  lectureService?: LectureService,
  inMyLectureService?: InMyLectureService,
  notieService?: NotieService,
}

interface State {
  type: string
}

enum ContentType {
  InMyList= 'InMyList',
  Required= 'Required',
  InProgress= 'InProgress',
  Enrolled= 'Enrolled',
}

@inject(mobxHelper.injectFrom(
  'shared.reviewService',
  'myTraining.myTrainingService',
  'lecture.lectureService',
  'myTraining.inMyLectureService',
  'layout.notieService',
))
@observer
@reactAutobind
class MyLearningContentContainer extends Component<Props, State> {
  //
  tabs = [
    { name: ContentType.Required, text: '권장과정' },
    { name: ContentType.InMyList, text: '관심목록' },
    { name: ContentType.InProgress, text: '학습중', count: this.props.notieService!.progressedCount },
    { name: ContentType.Enrolled, text: '학습예정', count: this.props.notieService!.waitingCount },
  ];

  PAGE_SIZE = 8;

  state= {
    type: ContentType.Required,
  };

  componentDidMount(): void {
    //
    this.findMyContent();

    this.props.notieService!.countMenuNoties('Learning_Progress');
    this.props.notieService!.countMenuNoties('Learning_Waiting');
  }

  async findMyContent() {
    //
    const { inMyLectureService, lectureService, myTrainingService, reviewService } = this.props;
    const { type } = this.state;

    inMyLectureService!.findAllInMyLectures();

    switch (type) {
      case ContentType.InMyList: {
        inMyLectureService!.clear();
        const offsetList = await inMyLectureService!.findInMyLectures(this.PAGE_SIZE, 0);
        const feedbackIds = (offsetList.results || []).map((lecture: InMyLectureModel) => lecture.reviewId);

        reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
        break;
      }
      case ContentType.Required:
        lectureService!.clearLectures();
        lectureService!.findPagingRequiredLectures(this.PAGE_SIZE, 0);
        break;
      case ContentType.InProgress:
        myTrainingService!.clear();
        myTrainingService!.findAllMyTrainingsWithState(type, this.PAGE_SIZE, 0);
        break;
      case ContentType.Enrolled:
        myTrainingService!.clear();
        myTrainingService!.findAllMyTrainingsWithState(type, this.PAGE_SIZE, 0);
        break;
    }
  }

  onSelectTab({ name }: any) {
    //
    const { type } = this.state;

    if (type !== name) {
      const { lectureService, inMyLectureService, myTrainingService } = this.props;

      if (name === ContentType.InMyList) {
        inMyLectureService!.clear();
      }
      if (name === ContentType.Required) {
        lectureService!.clearLectures();
      } else {
        myTrainingService!.clear();
      }

      this.setState(
        { type: name },
        this.findMyContent,
      );
    }
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const cineroom = patronInfo.getCineroomByPatronId(model.servicePatronKeyString) || patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      // history.push(lectureRoutePaths.courseOverviewPrev(model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
      history.push(lectureRoutePaths.courseOverview(cineroom.id, model.category.college.id, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      // history.push(lectureRoutePaths.lectureCardOverviewPrev(model.category.college.id, model.cubeId, model.serviceId));
      history.push(lectureRoutePaths.lectureCardOverview(cineroom.id, model.category.college.id, model.cubeId, model.serviceId));
    }
  }

  onActionLecture(training: MyTrainingModel | LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;

    if (training instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(training.id)
        .then(this.findMyContent);
    }
    else {
      let servicePatronKeyString = training.patronKey.keyString;
      if (training instanceof MyTrainingModel) servicePatronKeyString = training.servicePatronKeyString;
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
        baseUrl: training.baseUrl,
        servicePatronKeyString,
      })).then(this.findMyContent);
    }
  }

  onViewAll() {
    const { history } = this.props;
    const { type } = this.state;

    history.push(myTrainingRoutes.learningTab(type));
  }

  renderList() {
    //
    const { inMyLectureService, lectureService, myTrainingService, reviewService } = this.props;
    const { type } = this.state;
    const { inMyLectureMap, inMyLectures } =  inMyLectureService!;
    const { ratingMap } =  reviewService!;
    let list: (MyTrainingModel | LectureModel | InMyLectureModel)[] = [];

    if (type === ContentType.InMyList) {
      list = inMyLectures;
    }
    else if (type === ContentType.Required) {
      list = lectureService!.lectures;
    }
    else {
      list = myTrainingService!.myTrainings;
    }

    return (
      <Wrapper>
        <>
          <div className="right">
            <Button icon className="right btn-blue" onClick={this.onViewAll}>
              View all
              <Icon className="morelink" />
            </Button>
          </div>
          {
            list && list.length && (
              <Lecture.Group type={Lecture.GroupType.Line}>
                {list.map((value: MyTrainingModel | LectureModel | InMyLectureModel, index: number) => {
                  let rating: number | undefined;
                  if (value instanceof InMyLectureModel && value.cubeType !== CubeType.Community) {
                    rating = ratingMap.get(value.reviewId) || 0;
                  }
                  else if (value instanceof LectureModel && value.cubeType !== CubeType.Community) {
                    rating = value.rating;
                  }
                  const inMyLecture = inMyLectureMap.get(value.serviceId);
                  return (
                    <Lecture
                      key={`training-${index}`}
                      model={value}
                      rating={rating}
                      thumbnailImage={value.baseUrl || undefined}
                      action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                      onAction={() => this.onActionLecture(inMyLecture || value)}
                      onViewDetail={this.onViewDetail}
                    />
                  );
                })}
              </Lecture.Group>
            ) || (
              <NoSuchContentPanel message="해당하는 학습과정이 없습니다." />
            )
          }
        </>
      </Wrapper>
    );
  }

  render() {
    //
    const { tabs } = this;

    return (
      <MyLearningTabContainer
        tabs={tabs}
        onClickTab={this.onSelectTab}
      >
        {this.renderList()}
      </MyLearningTabContainer>
    );
  }
}

export default withRouter(MyLearningContentContainer);

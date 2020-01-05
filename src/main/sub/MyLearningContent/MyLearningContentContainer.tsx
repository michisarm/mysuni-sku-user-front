
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ReviewService } from '@nara.drama/feedback';
import { NoSuchContentPanel } from 'shared';
import { Lecture } from 'lecture';
import { LectureServiceType } from 'lecture/shared';
import lectureRoutePaths from 'lecture/routePaths';
import { MyTrainingService, InMyLectureService, InMyLectureCdoModel, InMyLectureModel,  } from 'mypage';
import MyTrainingModel from '../../../mypage/model/MyTrainingModel';
import MyLearningTabContainer from './MyLearningTabContainer';
import { Wrapper } from './MyLearningContentElementsView';


interface Props extends RouteComponentProps {
  reviewService?: ReviewService,
  myTrainingService?: MyTrainingService
  inMyLectureService?: InMyLectureService
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
  'myTraining.inMyLectureService',
))
@observer
@reactAutobind
class MyLearningContentContainer extends Component<Props, State> {
  //
  tabs = [
    { name: ContentType.Required, text: 'Required' },
    { name: ContentType.InMyList, text: 'In My List' },
    { name: ContentType.InProgress, text: 'In Progress' },
    { name: ContentType.Enrolled, text: 'Enrolled' },
  ];

  PAGE_SIZE = 8;

  state= {
    type: ContentType.Required,
  };

  componentDidMount(): void {
    //
    this.findMyContent();
  }

  async findMyContent() {
    //
    const { inMyLectureService, myTrainingService, reviewService } = this.props;
    const { type } = this.state;

    inMyLectureService!.findAllInMyLectures();

    switch (type) {
      case ContentType.InMyList: {
        const offsetList = await inMyLectureService!.findInMyLectures(this.PAGE_SIZE, 0);
        const feedbackIds = (offsetList.results || []).map((lecture: InMyLectureModel) => lecture.reviewId);

        reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
        break;
      }
      case ContentType.Required:
        myTrainingService!.findAllMyTrainingsWithRequired(this.PAGE_SIZE, 0);
        break;
      case ContentType.InProgress:
        myTrainingService!.findAllMyTrainingsWithState(type, this.PAGE_SIZE, 0);
        break;
      case ContentType.Enrolled:
        myTrainingService!.findAllMyTrainingsWithState(type, this.PAGE_SIZE, 0);
        break;
    }
  }

  onSelectTab({ name }: any) {
    //
    this.setState(
      { type: name },
      this.findMyContent,
    );
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

  onActionLecture(training: MyTrainingModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;

    if (training instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(training.id)
        .then(this.findMyContent);
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
      })).then(this.findMyContent);
    }
  }

  renderList() {
    //
    const { inMyLectureService, myTrainingService, reviewService } = this.props;
    const { type } = this.state;
    const { inMyLectureMap, inMyLectures } =  inMyLectureService!;
    const { ratingMap } =  reviewService!;
    let list: (MyTrainingModel | InMyLectureModel)[] = [];

    if (type === ContentType.InMyList) {
      list = inMyLectures;
    }
    else {
      list = myTrainingService!.myTrainings;
    }

    return (
      <Wrapper>
        {
          list && list.length && (
            <Lecture.Group type={Lecture.GroupType.Line}>
              {list.map((value: MyTrainingModel | InMyLectureModel, index: number) => {
                let rating: number | undefined = 0;
                if (value instanceof InMyLectureModel) {
                  rating = ratingMap.get(value.reviewId);
                }
                const inMyLecture = inMyLectureMap.get(value.serviceId);
                return (
                  <Lecture
                    key={`training-${index}`}
                    model={value}
                    rating={rating || undefined}
                    // thumbnailImage="http://placehold.it/60x60"
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

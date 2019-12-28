
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Segment } from 'semantic-ui-react';
import { RouteComponentProps, withRouter } from 'react-router';
import classNames from 'classnames';
import { ReviewService } from '@nara.drama/feedback';
import { inject, observer } from 'mobx-react';
import { mobxHelper, NoSuchContentPanel } from 'shared';
import { InMyLectureModel, InMyLectureService, MyTrainingService } from 'mytraining';
import { Lecture } from 'lecture';
import { LectureServiceType } from 'lecture/shared';
import MyTrainingModel from '../../../mytraining/model/MyTrainingModel';

interface Props extends RouteComponentProps {
  reviewService?: ReviewService,
  myTrainingService?: MyTrainingService
  inMyLectureService?: InMyLectureService
}

interface State {
  type: string
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
  state= {
    type: 'Required',
  };

  componentDidMount(): void {
    this.init();
  }

  init() {
    this.findPagingList();
  }

  onSelectMenu(type: string) {
    //
    this.setState({ type }, this.findPagingList);
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(`/lecture/college/${model.category.college.id}/course-plan/${model.coursePlanId}/${model.serviceType}/${model.serviceId}`);
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(`/lecture/college/${model.category.college.id}/cube/${model.cubeId}/lecture-card/${model.serviceId}`);
    }
  }

  async findPagingList() {
    const { inMyLectureService, myTrainingService, reviewService } = this.props;
    const { type } = this.state;
    let offsetList: any = null;
    let feedbackIds: string[] = [];

    switch (type) {
      case 'InMyList':
        offsetList = await inMyLectureService!.findAllInMyLectures(5, 0);
        feedbackIds = (offsetList.results || []).map((lecture: InMyLectureModel) => lecture.reviewId);
        await reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
        break;
      case 'Required':
        offsetList = await myTrainingService!.findAllMyTrainings(5, 0);
        break;
      default:
        offsetList = await myTrainingService!.findAllMyTrainings(5, 0);
        break;
    }
  }

  renderList() {
    const { inMyLectureService, myTrainingService, reviewService } = this.props;
    const { ratingMap } =  reviewService as ReviewService;
    const { type } = this.state;
    let list: (MyTrainingModel | InMyLectureModel)[] = [];

    switch (type) {
      case 'InMyList':
        list = inMyLectureService!.inMyLectures;
        break;
      default:
        list = myTrainingService!.myTrainings;
        break;
    }

    return (
      <Segment className="full">
        <div className="ui active tab">
          {
            list && list.length && (
              <Lecture.Group type={Lecture.GroupType.Line}>
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
                      onAction={() => {}}
                      onViewDetail={this.onViewDetail}
                    />
                  );
                })}
              </Lecture.Group>
            ) || (
              <NoSuchContentPanel message="해당하는 학습과정이 없습니다." />
            )
          }
        </div>
      </Segment>
    );
  }

  render() {
    //
    const { type } = this.state;
    return (
      <div className="my-learning-area-tab">
        <Segment className="full">
          <div className="ui tab-menu">
            <div className="cont-inner">
              <div className="ui sku menu">
                <a
                  className={classNames('item', { active: type === 'Required' })}
                  onClick={() => this.onSelectMenu('Required')}
                >
                  Required
                  {/*<span className="count">+5</span>*/}
                </a>
                <a
                  className={classNames('item', { active: type === 'InMyList' })}
                  onClick={() => this.onSelectMenu('InMyList')}
                >
                  In My List
                </a>
                <a
                  className={classNames('item', { active: type === 'InProgress' })}
                  onClick={() => this.onSelectMenu('InProgress')}
                >
                  In Progress
                </a>
                <a
                  className={classNames('item', { active: type === 'Enrolled' })}
                  onClick={() => this.onSelectMenu('Enrolled')}
                >
                  Enrolled
                  {/*<span className="count">+3</span>*/}
                </a>
              </div>
            </div>
          </div>
        </Segment>

        <hr className="dash" />
        {this.renderList()}
      </div>
    );
  }
}

export default withRouter(MyLearningContentContainer);

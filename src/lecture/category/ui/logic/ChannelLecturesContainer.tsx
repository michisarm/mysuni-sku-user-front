
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ReviewService } from '@nara.drama/feedback';
import { mobxHelper, Lecture } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureService, LectureCardService, LectureModel, LectureServiceType } from 'lecture';
import { CardSorting, SeeMoreButton } from '../../../shared';
import ChannelLecturesContentWrapperView from '../view/ChannelLecturesContentWrapperView';



interface Props extends RouteComponentProps<{ channelId: string }> {
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
  reviewService?: ReviewService,
}

interface State {
  sorting: string,
}

@inject(mobxHelper.injectFrom('lecture.lectureService', 'lecture.lectureCardService', 'shared.reviewService'))
@reactAutobind
@observer
class ChannelLecturesContainer extends Component<Props, State> {
  //
  lectureLimit = 20;

  state = {
    sorting: 'latest',
  };


  componentDidMount() {
    //
    const { match, lectureService, reviewService } = this.props;

    lectureService!.findPagingChannelLectures(match.params.channelId, this.lectureLimit, 0)
      .then(() => {
        const feedbackIds = (lectureService!.lectures || []).map((lecture: LectureModel) => lecture.reviewFeedbackId);
        if (feedbackIds && feedbackIds.length) reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
      });
  }

  onChangeSorting(e: any, data: any) {
    //
    this.setState({
      sorting: data.value,
    });
  }

  onActionLecture() {

  }

  onGoToLecture(e: any, data: any) {
    //
    const { lecture } = data;
    const { history } = this.props;

    console.log('serviceType', lecture.serviceType);
    if (lecture.serviceType === LectureServiceType.Card) {
      history.push(`../lecture-card/${lecture.serviceId}`);
    }
  }

  onClickSeeMore() {
    console.log('click see more');
  }

  render() {
    //
    const { lectureService, reviewService } = this.props;
    const { sorting } = this.state;
    const { lectures } = lectureService!;
    const { ratingMap } = reviewService!;

    console.log('rating', ratingMap);
    return (
      <ChannelLecturesContentWrapperView
        lectureCount={lectures.length}
      >
        <>
          <CardSorting
            value={sorting}
            onChange={this.onChangeSorting}
          />

          <div className="section">

            <Lecture.Group type={Lecture.GroupType.Box}>
              {lectures.map((lecture: LectureModel) => {
                const rating = ratingMap.get(lecture.reviewFeedbackId) || 0;
                return (
                  <Lecture
                    key={lecture.id}
                    lecture={lecture}
                    rating={rating}
                    // thumbnailImage="http://placehold.it/60x60"
                    action={Lecture.ActionType.Add}
                    onAction={this.onActionLecture}
                    onViewDetail={this.onGoToLecture}
                  />
                );
              })}
            </Lecture.Group>

            <SeeMoreButton
              onClick={this.onClickSeeMore}
            />
          </div>
        </>
      </ChannelLecturesContentWrapperView>
    );
  }
}

export default withRouter(ChannelLecturesContainer);

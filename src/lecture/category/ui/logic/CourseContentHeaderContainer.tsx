
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { ReviewService } from '@nara.drama/feedback';
import { CoursePlanModel } from 'course/model';
import LectureContentHeader from '../../../shared/LectureContentHeader';


interface Props {
  reviewService?: ReviewService
  coursePlan: CoursePlanModel
  reviewId: string
  typeViewObject: any
}

@inject(mobxHelper.injectFrom(
  'shared.reviewService',
))
@reactAutobind
@observer
class CourseContentHeaderContainer extends Component<Props> {
  //
  componentDidMount() {
    //
    this.findReviewSummary();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { reviewId: prevReviewId } = prevProps;
    const { reviewId } = this.props;

    if (prevReviewId !== reviewId) {
      this.findReviewSummary();
    }
  }

  findReviewSummary() {
    //
    const { reviewService, reviewId } = this.props;

    if (reviewId) {
      reviewService!.findReviewSummary(reviewId);
    }
  }

  render() {
    //
    const { reviewService, coursePlan, typeViewObject } = this.props;
    const { reviewSummary } = reviewService!;

    if (!coursePlan.category) {
      return null;
    }

    return (
      <LectureContentHeader>
        <LectureContentHeader.ThumbnailCell
          image={coursePlan.iconBox.baseUrl || `${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
        />
        <LectureContentHeader.TitleCell
          category={coursePlan.category}
          type="Course"
          typeName="Course"
          title={coursePlan.name}
          creationTime={coursePlan.time}
          learningPeriod={typeViewObject.learningPeriod}
        />
        <LectureContentHeader.RightCell>
          <LectureContentHeader.StampItem value={coursePlan.stamp.stampReady && coursePlan.stamp.stampCount || 0} />
          {
            <LectureContentHeader.StarRatingItem
              value={reviewSummary.average}
              max={reviewSummary.maxStarCount}
            />
          }
        </LectureContentHeader.RightCell>
      </LectureContentHeader>
    );
  }
}

export default CourseContentHeaderContainer;

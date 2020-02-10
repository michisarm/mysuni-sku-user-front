
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType, PersonalCubeModel } from 'personalcube/personalcube/model';
import { LectureCardModel } from 'lecture/index';
import LectureContentHeader from '../../../shared/LectureContentHeader';


interface Props {
  reviewService?: ReviewService
  personalCube: PersonalCubeModel
  lectureCard: LectureCardModel
  typeViewObject: any
}

@inject(mobxHelper.injectFrom(
  'shared.reviewService',
))
@reactAutobind
@observer
class LectureCardContentHeaderContainer extends Component<Props> {
  //
  componentDidMount() {
    //
    this.findReviewSummary();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    //
    const { reviewId: prevReviewId } = prevProps.lectureCard;
    const { reviewId } = this.props.lectureCard;

    if (prevReviewId !== reviewId) {
      this.findReviewSummary();
    }
  }

  findReviewSummary() {
    //
    const { reviewService, lectureCard } = this.props;

    if (lectureCard.reviewId) {
      reviewService!.findReviewSummary(lectureCard.reviewId);
    }
  }

  render() {
    //
    const { reviewService, personalCube, typeViewObject } = this.props;
    const { reviewSummary } = reviewService!;

    if (!personalCube.category) {
      return null;
    }
    const cubeType = CubeType[personalCube.contents.type];

    return (
      <LectureContentHeader>
        <LectureContentHeader.ThumbnailCell
          image={personalCube.iconBox.baseUrl || `${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
        />
        <LectureContentHeader.TitleCell
          category={personalCube.category}
          type={cubeType}
          title={personalCube.name}
          creationTime={personalCube.time}
          learningPeriod={typeViewObject.learningPeriod}
        />
        <LectureContentHeader.RightCell>
          {
            cubeType !== CubeType.Community && (
              <LectureContentHeader.StarRatingItem
                value={reviewSummary.average}
                max={reviewSummary.maxStarCount}
              />
            ) || null
          }
        </LectureContentHeader.RightCell>
      </LectureContentHeader>
    );
  }
}

export default LectureCardContentHeaderContainer;

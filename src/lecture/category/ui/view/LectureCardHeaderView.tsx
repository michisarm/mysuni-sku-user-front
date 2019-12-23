
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LectureContentHeader } from 'shared';


interface Props {
  viewObject: any
  typeViewObject: any
  rating: number
  maxRating: number
}

@reactAutobind
@observer
class LectureCardHeaderView extends Component<Props> {
  //
  render() {
    //
    const { viewObject, typeViewObject, rating, maxRating } = this.props;

    if (!viewObject.category) {
      return null;
    }

    return (
      <LectureContentHeader>
        <LectureContentHeader.ThumbnailCell
          image={`${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
        />
        <LectureContentHeader.TitleCell
          category={viewObject.category}
          type={viewObject.cubeType}
          title={viewObject.name}
          creationTime={viewObject.time}
          learningPeriod={typeViewObject.learningPeriod}
        />
        <LectureContentHeader.RightCell>
          <LectureContentHeader.StampItem value={viewObject.stamp} />
          <LectureContentHeader.StarRatingItem
            value={rating}
            max={maxRating}
          />
        </LectureContentHeader.RightCell>
      </LectureContentHeader>
    );
  }
}

export default LectureCardHeaderView;

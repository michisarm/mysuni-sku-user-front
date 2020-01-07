
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { CubeType } from 'personalcube/personalcube';
import LectureContentHeader from '../../../shared/LectureContentHeader';

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
          typeName={viewObject.cubeTypeName}
          title={viewObject.name}
          creationTime={viewObject.time}
          learningPeriod={typeViewObject.learningPeriod}
        />
        <LectureContentHeader.RightCell>
          { viewObject.cubeType === 'Course' && (
            <LectureContentHeader.StampItem value={viewObject.stamp} />
          )}
          {
            viewObject.cubeType !== CubeType.Community && (
              <LectureContentHeader.StarRatingItem
                value={rating}
                max={maxRating}
              />
            ) || null
          }
        </LectureContentHeader.RightCell>
      </LectureContentHeader>
    );
  }
}

export default LectureCardHeaderView;


import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LectureContentHeader } from 'shared';
import { PersonalCubeModel } from 'personalcube/personalcube';


interface Props {
  personalCube: PersonalCubeModel
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
    const { personalCube, typeViewObject, rating, maxRating } = this.props;

    if (!personalCube.category) {
      return null;
    }

    return (
      <LectureContentHeader>
        <LectureContentHeader.ThumbnailCell
          image={`${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
        />
        <LectureContentHeader.TitleCell
          category={personalCube.category}
          type={personalCube.contents.type}
          title={personalCube.name}
          creationTime={personalCube.time}
          learningPeriod={typeViewObject.learningPeriod}
        />
        <LectureContentHeader.RightCell>
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

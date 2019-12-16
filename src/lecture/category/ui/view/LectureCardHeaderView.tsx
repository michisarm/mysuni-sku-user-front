
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LectureContentHeader } from 'shared';
import { PersonalCubeModel } from 'personalcube/personalcube';
import { LectureCardModel } from 'lecture';


interface Props {
  personalCube: PersonalCubeModel,
  lectureCard: LectureCardModel,
}

@reactAutobind
@observer
class LectureCardHeaderView extends Component<Props> {
  //
  render() {
    //
    const { personalCube, lectureCard } = this.props;
    console.log('View.lectureCard', lectureCard);

    if (!personalCube.category) {
      return null;
    }
    console.log('View.personalCube', personalCube);

    return (
      <LectureContentHeader>
        <LectureContentHeader.ThumbnailCell
          image={`${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
        />
        <LectureContentHeader.TitleCell
          label={{ color: 'blue', text: personalCube.category && personalCube.category.channel.name || '' }}
          type={personalCube.contents.type}
          title={personalCube.name}
          creationTime={personalCube.time}
        />
        <LectureContentHeader.RightCell>
          <LectureContentHeader.StarRatingItem
            value={3}
            max={5}
          />
        </LectureContentHeader.RightCell>
      </LectureContentHeader>
    );
  }
}

export default LectureCardHeaderView;

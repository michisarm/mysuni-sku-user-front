
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { LectureContentHeader } from 'shared';
import { PersonalCubeModel } from 'personalcube/personalcube';


interface Props {
  personalCube: PersonalCubeModel,
}

@reactAutobind
@observer
class LectureCardHeaderView extends Component<Props> {
  //
  render() {
    //
    const { personalCube } = this.props;

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
        />
        <LectureContentHeader.RightCell>
          {/*<LectureContentHeader.StarRatingItem*/}
          {/*  value={3}*/}
          {/*  max={5}*/}
          {/*/>*/}
        </LectureContentHeader.RightCell>
      </LectureContentHeader>
    );
  }
}

export default LectureCardHeaderView;

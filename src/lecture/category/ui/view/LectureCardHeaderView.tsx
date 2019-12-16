
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button } from 'semantic-ui-react';
import { LectureContentHeader } from 'shared';
import { LectureCardModel } from 'lecture';
import { ThumbnailView, TitleView } from './CategoryHeaderElementsView';


interface Props {
  lectureCard: LectureCardModel,
}

@reactAutobind
@observer
class LectureCardHeaderView extends Component<Props> {
  //
  render() {
    //
    const { lectureCard } = this.props;
    console.log('lectureCard', lectureCard);

    return (
      <LectureContentHeader>
        <LectureContentHeader.ThumbnailCell
          image={`${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
        />
        <LectureContentHeader.TitleCell
          label={{ color: 'blue', text: 'Leadership' }}
          title="Open Source를 활용한 Big Data 기반 플랫폼을 이용한 데이터 분석"
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

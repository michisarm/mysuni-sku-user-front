
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon } from 'semantic-ui-react';
import { ChannelModel } from 'college';
import ChannelHeaderView from './ChannelHeaderView';
import LectureCardModel from '../../../shared/model/LectureCardModel';



interface Props {
  channel: ChannelModel,
  lectureCards: LectureCardModel[]
  onViewAll: () => void,
}

@reactAutobind
class ChannelLecturesView extends Component<Props> {
  //
  render() {
    //
    const { channel, lectureCards, onViewAll } = this.props;

    return (
      <>
        <ChannelHeaderView
          channel={channel}
          onViewAll={onViewAll}
        />
        {
          lectureCards && lectureCards.length
          && lectureCards.map(lectureCard => (
            <div className="scrolling" />
          )) || (
            <div className="no-cont-wrap type2">
              <Icon className="no-contents80" /><span className="blind">콘텐츠 없음</span>
              <div className="text02">선택하신 채널에 해당하는 추천 학습과정이 없습니다.</div>
            </div>
          )
        }

      </>
    );
  }
}

export default ChannelLecturesView;

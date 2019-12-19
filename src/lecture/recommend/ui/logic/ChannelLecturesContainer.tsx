
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { Lecture, mobxHelper, NoSuchContentPanel } from 'shared';
import { LectureService } from 'lecture';
import { ChannelModel } from 'college';
import ChannelHeaderView from '../view/ChannelHeaderView';
import LectureModel from '../../../shared/model/LectureModel';

interface Props {
  lectureService?: LectureService,
  channel: ChannelModel
  routeTo: (url: string) => void
}

interface State {
}

@inject(mobxHelper.injectFrom('lecture.lectureService'))
@reactAutobind
@observer
class ChannelsLecturesContainer extends Component<Props, State> {
  //
  componentDidMount() {
    //
    const { lectureService, channel } = this.props;

    lectureService!.findChannelLectures(channel.id, 0, 5,);
  }

  onViewAll() {
    const { channel, routeTo } = this.props;
    routeTo(`/channel/${channel.id}/recommend`);
  }

  render() {
    //
    const { channel, lectureService } = this.props;
    const { lectures } =  lectureService as LectureService;

    return (
      <>
        <ChannelHeaderView
          channel={channel}
          onViewAll={this.onViewAll}
        />
        {
          lectures && lectures.length
          && (
            <div className="scrolling">
              <ul className="belt">
                {
                  lectures.map((lecture: LectureModel) => (
                    <li>
                      <Lecture.Group type={Lecture.GroupType.Box}>
                        <Lecture
                          key={lecture.id}
                          lecture={lecture}
                          // thumbnailImage="http://placehold.it/60x60"
                          action={Lecture.ActionType.Add}
                          onAction={() => {}}
                          onViewDetail={() => {}}
                        />
                      </Lecture.Group>
                    </li>
                  ))
                }
              </ul>
            </div>
          ) || (
            <NoSuchContentPanel message="선택하신 채널에 해당하는 추천 학습과정이 없습니다." />
          )
        }
      </>
    );
  }
}

export default ChannelsLecturesContainer;

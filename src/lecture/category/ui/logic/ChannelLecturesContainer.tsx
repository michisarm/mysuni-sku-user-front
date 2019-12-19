
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { mobxHelper, Lecture } from 'shared';
import { CollegeService } from 'college';
import { PersonalCubeService } from 'personalcube/personalcube';
import { LectureService, LectureCardService, LectureModel, LectureServiceType } from 'lecture';
import { CardSorting, SeeMoreButton } from '../../../shared';
import ChannelLecturesContentWrapperView from '../view/ChannelLecturesContentWrapperView';



interface Props extends RouteComponentProps<{ channelId: string }> {
  collegeService?: CollegeService,
  personalCubeService?: PersonalCubeService,
  lectureService?: LectureService,
  lectureCardService?: LectureCardService,
}

interface State {
  sorting: string,
}

@inject(mobxHelper.injectFrom('lecture.lectureService', 'lecture.lectureCardService'))
@reactAutobind
@observer
class ChannelLecturesContainer extends Component<Props, State> {
  //
  lectureLimit = 20;

  state = {
    sorting: 'latest',
  };


  componentDidMount() {
    //
    const { match, lectureService } = this.props;

    lectureService!.findChannelLectures(match.params.channelId, this.lectureLimit, 0);
  }

  onChangeSorting(e: any, data: any) {
    //
    this.setState({
      sorting: data.value,
    });
  }

  onActionLecture() {

  }

  onGoToLecture(e: any, data: any) {
    //
    const { lecture } = data;
    const { history } = this.props;

    console.log('serviceType', lecture.serviceType);
    if (lecture.serviceType === LectureServiceType.Card) {
      history.push(`../lecture-card/${lecture.serviceId}`);
    }
  }

  onClickSeeMore() {
    console.log('click see more');
  }

  render() {
    //
    const { lectureService } = this.props;
    const { sorting } = this.state;
    const { lectures } = lectureService!;

    return (
      <ChannelLecturesContentWrapperView
        lectureCount={lectures.length}
      >
        <>
          <CardSorting
            value={sorting}
            onChange={this.onChangeSorting}
          />

          <div className="section">

            <Lecture.Group type={Lecture.GroupType.Box}>
              {lectures.map((lecture: LectureModel) => (
                <Lecture
                  key={lecture.id}
                  lecture={lecture}
                  // thumbnailImage="http://placehold.it/60x60"
                  action={Lecture.ActionType.Add}
                  onAction={this.onActionLecture}
                  onViewDetail={this.onGoToLecture}
                />
              ))}
            </Lecture.Group>

            <SeeMoreButton
              onClick={this.onClickSeeMore}
            />
          </div>
        </>
      </ChannelLecturesContentWrapperView>
    );
  }
}

export default withRouter(ChannelLecturesContainer);

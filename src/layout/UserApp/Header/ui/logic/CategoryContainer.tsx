
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { mobxHelper } from 'shared';
import { FavoriteChannelChangeModal } from 'shared-component';
import { CollegeService, CollegeModel, ChannelModel } from 'college';
import { SkProfileService, StudySummary } from 'profile';
import lectureRoutePaths from 'lecture/routePaths';
import LectureCountService from '../../../present/logic/LectureCountService';
import CategoryView from '../view/CategoryView';



interface Props extends RouteComponentProps {
  collegeService?: CollegeService,
  skProfileService?: SkProfileService,
  lectureCountService?: LectureCountService,
}

interface State {
  categoryOpen: boolean,
  activeCollege?: CollegeModel,
}

@inject(mobxHelper.injectFrom('shared.collegeService', 'layout.lectureCountService', 'skProfileService'))
@reactAutobind
@observer
class CategoryContainer extends Component<Props, State> {
  //
  modal: any = React.createRef();

  state = {
    categoryOpen: false,
    activeCollege: undefined,
  };

  async componentDidMount() {
    //
    const { collegeService } = this.props;

    this.findStudySummary();
    const colleges = await collegeService!.findAllColleges();

    if (colleges.length > 0) {
      this.onActiveCollege({}, colleges[0]);
    }
  }

  findStudySummary() {
    const { skProfileService } = this.props;

    skProfileService!.findStudySummary();
  }

  onClickCategory() {
    //
    this.setState((state) => ({
      categoryOpen: !state.categoryOpen,
    }));
  }

  onActiveCollege(e: any, college: CollegeModel) {
    //
    const { collegeService, lectureCountService } = this.props;

    lectureCountService!.clear();
    lectureCountService!.findLectureCountByCollegeId(college.collegeId, college.channels);

    this.setState({
      activeCollege: college,
    });
    collegeService!.setChannels(college.channels);
  }

  onClickChannel(e: any, channel?: ChannelModel) {
    //
    const { activeCollege } = this.state;
    const { history } = this.props;
    const active: CollegeModel = activeCollege as any;

    if (!channel) {
      history.push(lectureRoutePaths.collegeLectures(active.collegeId));
    }
    else if (active.collegeId && channel.id) {
      history.push(lectureRoutePaths.channelLectures(active.collegeId, channel.id));
    }
    this.setState({
      categoryOpen: false,
    });
  }

  onModalOpen() {
    this.modal.onOpenModal();
    this.onClickCategory();
  }

  render() {
    //
    const { collegeService, skProfileService, lectureCountService } = this.props;
    const { categoryOpen, activeCollege } = this.state;

    const { studySummary } = skProfileService as SkProfileService;
    const { favoriteChannels } = studySummary as StudySummary;

    const channels = favoriteChannels && favoriteChannels.idNames && favoriteChannels.idNames
      && favoriteChannels.idNames.map(channel => new ChannelModel({ ...channel, channelId: channel.id })) || [];

    return (
      <>
        <CategoryView
          open={categoryOpen}
          colleges={collegeService!.colleges}
          activeCollege={activeCollege}
          channels={collegeService!.channels}
          collegeCount={lectureCountService!.collegeLectureCount}
          channelCounts={lectureCountService!.channels}
          onClick={this.onClickCategory}
          onActiveCollege={this.onActiveCollege}
          onClickChannel={this.onClickChannel}
          onModalOpen={this.onModalOpen}
        />
        <FavoriteChannelChangeModal
          ref={modal => this.modal = modal}
          favorites={channels}
          onConfirmCallback={this.findStudySummary}
        />
      </>
    );
  }
}

export default withRouter(CategoryContainer);

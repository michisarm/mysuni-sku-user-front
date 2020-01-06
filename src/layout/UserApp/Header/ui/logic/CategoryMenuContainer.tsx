
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Icon, Popup } from 'semantic-ui-react';
import { FavoriteChannelChangeModal } from 'shared-component';
import { CollegeService, CollegeModel, ChannelModel } from 'college';
import { SkProfileService } from 'profile';
import lectureRoutePaths from 'lecture/routePaths';
import LectureCountService from '../../../present/logic/LectureCountService';
import CategoryMenuPanelView from '../view/CategoryMenuPanelView';


interface Props extends RouteComponentProps {
  collegeService?: CollegeService,
  skProfileService?: SkProfileService,
  lectureCountService?: LectureCountService,
}

interface State {
  categoryOpen: boolean,
  activeCollege?: CollegeModel,
}

@inject(mobxHelper.injectFrom('shared.collegeService', 'layout.lectureCountService', 'profile.skProfileService'))
@reactAutobind
@observer
class CategoryMenuContainer extends Component<Props, State> {
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

  onOpen() {
    //
    this.setState({ categoryOpen: true });
  }

  onClose() {
    //
    this.setState({ categoryOpen: false });
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

  onOpenFavorite() {
    this.modal.onOpenModal();
    this.onClose();
  }

  renderMenuActions() {
    //
    return (
      <>
        <Button
          icon
          className="img-icon change-channel-of-interest"
          onClick={this.onOpenFavorite}
        >
          <span className="underline">관심 Channel 변경 <Icon className="setting17" /></span>
        </Button>
        <Button className="close" onClick={this.onClose}>
          <i className="new16x17 icon"><span className="blind">close</span></i>
        </Button>
      </>
    );
  }

  render() {
    //
    const { collegeService, skProfileService, lectureCountService } = this.props;
    const { categoryOpen, activeCollege } = this.state;

    const { studySummaryFavoriteChannels } = skProfileService!;
    const channels = studySummaryFavoriteChannels.map(channel => new ChannelModel({ ...channel, channelId: channel.id })) || [];

    return (
      <>
        <div className="g-menu-detail">
          <Popup
            trigger={<Button className="detail-open">Category</Button>}
            on="click"
            className="g-menu-detail"
            basic
            open={categoryOpen}
            onOpen={this.onOpen}
            onClose={this.onClose}
          >
            <CategoryMenuPanelView
              colleges={collegeService!.colleges}
              activeCollege={activeCollege}
              channels={collegeService!.channels}
              collegeCount={lectureCountService!.collegeLectureCount}
              channelCounts={lectureCountService!.channels}
              actions={this.renderMenuActions()}
              onActiveCollege={this.onActiveCollege}
              onRouteChannel={this.onClickChannel}
            />
          </Popup>
        </div>

        <FavoriteChannelChangeModal
          ref={modal => this.modal = modal}
          favorites={channels}
          onConfirmCallback={this.findStudySummary}
        />
      </>
    );
  }
}

export default withRouter(CategoryMenuContainer);

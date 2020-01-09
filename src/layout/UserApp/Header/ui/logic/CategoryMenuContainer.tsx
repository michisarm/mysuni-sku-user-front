
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Icon, Popup } from 'semantic-ui-react';
import { FavoriteChannelChangeModal } from 'shared-component';
import { IdNameCount } from 'shared';
import { SkProfileService } from 'profile';
import { ChannelModel } from 'college';
import { CollegeLectureCountService, CollegeLectureCountRdo }  from 'lecture';
import lectureRoutePaths from 'lecture/routePaths';
import CategoryMenuPanelView from '../view/CategoryMenuPanelView';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService,
  collegeLectureCountService?: CollegeLectureCountService,
}

interface State {
  categoryOpen: boolean,
  activeCollege?: CollegeLectureCountRdo,
}

@inject(mobxHelper.injectFrom('profile.skProfileService', 'lecture.collegeLectureCountService'))
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
    const { collegeLectureCountService } = this.props;

    this.findStudySummary();
    const collegeLectureCounts = await collegeLectureCountService!.findCollegeLectureCounts();
    console.log('count', collegeLectureCounts);

    if (collegeLectureCounts.length > 0) {
      this.onActiveCollege({}, collegeLectureCounts[0]);
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

  onActiveCollege(e: any, college: CollegeLectureCountRdo) {
    //
    const { collegeLectureCountService } = this.props;

    this.setState({
      activeCollege: college,
    });
    collegeLectureCountService!.setChannelCounts(college.channelCounts);
  }

  onClickChannel(e: any, channel?: IdNameCount) {
    //
    const { activeCollege } = this.state;
    const { history } = this.props;
    const active: CollegeLectureCountRdo = activeCollege as any;

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
    const { skProfileService, collegeLectureCountService } = this.props;
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
              colleges={collegeLectureCountService!.collegeLectureCounts}
              activeCollege={activeCollege}
              channels={collegeLectureCountService!.channelCounts}
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

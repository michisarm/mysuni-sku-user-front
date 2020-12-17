import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Icon, Popup } from 'semantic-ui-react';
import { IdNameCount } from 'shared/model';
import { ActionLogService } from 'shared/stores';
import { FavoriteChannelChangeModal } from 'shared';
import { ChannelModel } from 'college/model';
import { SkProfileService } from 'profile/stores';
import { CollegeLectureCountRdo } from 'lecture/model';
import { CollegeLectureCountService } from 'lecture/stores';
import lectureRoutePaths from 'lecture/routePaths';
import mainRoutePaths from 'main/routePaths';
import LectureCountService from 'lecture/category/present/logic/LectureCountService';
import CategoryMenuPanelView from '../view/CategoryMenuPanelView';
import { CollegeService } from 'college/stores';

interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService;
  skProfileService?: SkProfileService;
  collegeLectureCountService?: CollegeLectureCountService;
  lectureCountService?: LectureCountService;
  collegeService?: CollegeService;
}

interface State {
  categoryOpen: boolean;
  activeCollege?: CollegeLectureCountRdo;
}

@inject(
  mobxHelper.injectFrom(
    'shared.actionLogService',
    'profile.skProfileService',
    'lecture.collegeLectureCountService',
    'lecture.lectureCountService',
    'college.collegeService'
  )
)
@reactAutobind
@observer
class CategoryMenuContainer extends Component<Props, State> {
  //
  modal: any = React.createRef();

  state = {
    categoryOpen: false,
    activeCollege: undefined,
  };

  async findCollegeLectureCount() {
    //
    const { collegeLectureCountService } = this.props;

    // collegeLectureCountService?.collegeLectureCounts.length > 0
    // const collegeLectureCounts = await collegeLectureCountService!.findCollegeLectureCounts();
    // if (collegeLectureCounts.length > 0) {
    //   this.onActiveCollege({}, collegeLectureCounts[0]);
    // }

    const category = sessionStorage.getItem('category');
    if (
      category !== null &&
      collegeLectureCountService!.collegeLectureCounts.length > 0
    ) {
      const collegeLectureCounts = JSON.parse(category);
      if (collegeLectureCounts.length > 0) {
        this.onActiveCollege({}, collegeLectureCounts[0]);
      }
    } else {
      const collegeLectureCounts = await collegeLectureCountService!.findCollegeLectureCounts();
      if (collegeLectureCounts.length > 0) {
        this.onActiveCollege({}, collegeLectureCounts[0]);
      }
    }
  }

  findStudySummary() {
    const { skProfileService } = this.props;

    skProfileService!.findStudySummary();
  }

  onOpen() {
    //
    this.findCollegeLectureCount();
    this.findStudySummary();
    this.setState({ categoryOpen: true });
  }

  onClose() {
    //
    this.setState({ categoryOpen: false });
  }

  onActiveCollege(e: any, college: CollegeLectureCountRdo) {
    console.log('onActiveCollege')
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
    const { history, lectureCountService } = this.props;
    const active: CollegeLectureCountRdo = activeCollege as any;

    if (!channel) {
      lectureCountService!.setCategoryType('CollegeLectures');
      history.push(lectureRoutePaths.collegeLectures(active.collegeId));
    } else if (active.collegeId && channel.id) {
      lectureCountService!.setCategoryType('ChannelsLectures');
      history.push(
        lectureRoutePaths.channelLectures(active.collegeId, channel.id)
      );
    }
    this.setState({
      categoryOpen: false,
    });
  }

  onOpenFavorite() {
    this.onClickActionLog('관심 Channel 변경');
    this.modal.onOpenModal();
    this.onClose();
  }

  onConfirmFavorite() {
    //
    const { location, history } = this.props;
    const { pathname } = location;

    this.findStudySummary();

    if (pathname.startsWith(`${mainRoutePaths.main()}pages`)) {
      history.replace(mainRoutePaths.main());
    } else if (pathname.startsWith(`${lectureRoutePaths.recommend()}/pages`)) {
      history.replace(lectureRoutePaths.recommend());
    }
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
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
          <span className="underline">
            관심 Channel 변경 <Icon className="setting17" />
          </span>
        </Button>
        <Button className="close" onClick={this.onClose}>
          <i className="new16x17 icon">
            <span className="blind">close</span>
          </i>
        </Button>
      </>
    );
  }

  render() {
    //
    const { skProfileService, collegeLectureCountService, collegeService } = this.props;
    const { categoryOpen, activeCollege } = this.state;

    const { studySummaryFavoriteChannels } = skProfileService!;
    const channels =
      studySummaryFavoriteChannels.map(
        channel => new ChannelModel({ ...channel, channelId: channel.id })
      ) || [];

    return (
      <>
        <div className="g-menu-detail">
          <Popup
            trigger={
              <Button
                className="detail-open"
                onClick={() => this.onClickActionLog('Category')}
              >
                Category
              </Button>
            }
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
              favorites={channels}
              studySummaryFavoriteChannels={studySummaryFavoriteChannels}
              actions={this.renderMenuActions()}
              onActiveCollege={this.onActiveCollege}
              onRouteChannel={this.onClickChannel}
              banner={collegeService!.getBanner()}
            />
          </Popup>
        </div>

        <FavoriteChannelChangeModal
          ref={modal => (this.modal = modal)}
          favorites={channels}
          onConfirmCallback={this.onConfirmFavorite}
        />
      </>
    );
  }
}

export default withRouter(CategoryMenuContainer);

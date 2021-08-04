import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Icon, Popup } from 'semantic-ui-react';
import { IdName } from 'shared/model';
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

import ReactGA from 'react-ga';
import { isExternalInstructor } from '../../../../../shared/helper/findUserRole';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import { CollegeBanner } from '../../../../../college/model/CollegeBanner';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../../../lecture/model/LangSupport';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  collegeLectureCountService?: CollegeLectureCountService;
  lectureCountService?: LectureCountService;
  collegeService?: CollegeService;
}

interface State {
  categoryOpen: boolean;
  activeCollege?: CollegeLectureCountRdo;
  banner?: CollegeBanner;
}

@inject(
  mobxHelper.injectFrom(
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
    banner: undefined,
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
      const collegeLectureCounts =
        await collegeLectureCountService!.findCollegeLectureCounts();
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
    //
    const { collegeLectureCountService, collegeService } = this.props;
    let bannerData: CollegeBanner | undefined;
    collegeService!.getBanner().then((result) => {
      if (result) {
        result.map((item) => {
          if (item.collegeId === college.id) {
            bannerData = item;
          }
        });
      }
      this.setState({
        activeCollege: college,
        banner: bannerData,
      });
    });
    collegeLectureCountService!.setChannelCounts(
      college.channels.map((c) => ({
        id: c.id,
        name: parsePolyglotString(c.name, getDefaultLang(c.langSupports)),
      }))
    );
  }

  onClickChannel(e: any, channel?: IdName) {
    //
    const { activeCollege } = this.state;
    const { history, lectureCountService } = this.props;
    const active: CollegeLectureCountRdo = activeCollege as any;
    if (!channel) {
      lectureCountService!.setCategoryType('CollegeLectures');
      history.push(lectureRoutePaths.collegeLectures(active.id));
    } else if (active.id && channel.id) {
      lectureCountService!.setCategoryType('ChannelsLectures');
      history.push(lectureRoutePaths.channelLectures(active.id, channel.id));
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
    // react-ga event
    ReactGA.event({
      category: 'Category-Button',
      action: 'Click',
      label: `GNB_Category-Button`,
    });
  }

  handleCategoryOpen(flag: boolean) {
    this.setState({
      categoryOpen: flag,
    });
  }

  renderMenuActions() {
    //
    return (
      <>
        <Button
          icon
          className="img-icon change-channel-of-interest"
          onClick={this.onOpenFavorite}
        />
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
    const { skProfileService, collegeLectureCountService, collegeService } =
      this.props;
    const { categoryOpen, activeCollege, banner } = this.state;

    const { studySummaryFavoriteChannels } = skProfileService!;
    const channels =
      studySummaryFavoriteChannels.map(
        (channel) => new ChannelModel({ ...channel, channelId: channel.id })
      ) || [];
    const isExternal = isExternalInstructor();

    return (
      <>
        <div className="g-menu-detail">
          {!isExternal && (
            <Popup
              trigger={
                <Button
                  className="detail-open"
                  onClick={() => this.onClickActionLog('Category')}
                >
                  <PolyglotText id="home-gnb-ct" defaultString="Category" />
                </Button>
              }
              on="click"
              className="g-menu-detail"
              basic
              open={categoryOpen}
              onOpen={this.onOpen}
              onClose={this.onClose}
            >
              {activeCollege && (
                <>
                  <CategoryMenuPanelView
                    colleges={collegeLectureCountService!.collegeLectureCounts}
                    activeCollege={activeCollege}
                    channels={collegeLectureCountService!.channelCounts}
                    favorites={channels}
                    studySummaryFavoriteChannels={studySummaryFavoriteChannels}
                    actions={this.renderMenuActions()}
                    onActiveCollege={this.onActiveCollege}
                    onRouteChannel={this.onClickChannel}
                    handleCategoryOpen={this.handleCategoryOpen}
                    banner={banner}
                  />
                </>
              )}
            </Popup>
          )}
        </div>

        <FavoriteChannelChangeModal
          ref={(modal) => (this.modal = modal)}
          favorites={channels}
          onConfirmCallback={this.onConfirmFavorite}
        />
      </>
    );
  }
}

export default withRouter(CategoryMenuContainer);

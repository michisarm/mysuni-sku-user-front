import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Popup } from 'semantic-ui-react';
import { IdName } from 'shared/model';
import { FavoriteChannelChangeModal } from 'shared';
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
import { getChannelName } from '../../../../../shared/service/useCollege/useRequestCollege';

interface Props extends RouteComponentProps {}

interface State {
  categoryOpen: boolean;
  activeCollege?: CollegeLectureCountRdo;
  banner?: CollegeBanner;
}

@reactAutobind
@observer
class CategoryMenuContainer extends Component<Props, State> {
  modal: any = React.createRef();

  state = {
    categoryOpen: false,
    activeCollege: undefined,
    banner: undefined,
  };

  onOpen() {
    SkProfileService.instance.findStudySummary();
    const { categoryColleges } = CollegeLectureCountService.instance;
    this.onActiveCollege({}, categoryColleges[0]);
    this.setState({ categoryOpen: true });
  }

  onClose() {
    this.setState({ categoryOpen: false });
  }

  onActiveCollege(e: any, college: CollegeLectureCountRdo) {
    let bannerData: CollegeBanner | undefined;
    const { banner } = CollegeService.instance;

    banner.map((item) => {
      if (college.id && item.collegeId === college.id) {
        bannerData = { ...item };
      }
    });
    this.setState({
      activeCollege: college,
      banner: bannerData,
    });
    const categoryColleges =
      CollegeLectureCountService.instance.categoryColleges;
    CollegeLectureCountService.instance.setChannelCounts(
      college.channelIds.map((id) => ({
        id,
        name: getChannelName(id),
        count:
          categoryColleges
            .find((d) => d.id === college.id)
            ?.channels.find((d) => d.id === id)?.count || 0,
      }))
    );
  }

  onClickChannel(e: any, channel?: IdName) {
    const { activeCollege } = this.state;
    const { history } = this.props;
    const active: CollegeLectureCountRdo = activeCollege as any;
    if (!channel) {
      LectureCountService.instance.setCategoryType('CollegeLectures');
      history.push(lectureRoutePaths.collegeLectures(active.id));
    } else if (active.id && channel.id) {
      LectureCountService.instance.setCategoryType('ChannelsLectures');
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
    const { location, history } = this.props;
    const { pathname } = location;
    SkProfileService.instance.findStudySummary();
    if (pathname.startsWith(`${mainRoutePaths.main()}pages`)) {
      history.replace(mainRoutePaths.main());
    } else if (pathname.startsWith(`${lectureRoutePaths.recommend()}/pages`)) {
      history.replace(lectureRoutePaths.recommend());
    }
  }

  onClickActionLog(text: string) {
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
    const { categoryOpen, activeCollege, banner } = this.state;
    const { categoryColleges, channelCounts } =
      CollegeLectureCountService.instance;
    const { additionalUserInfo } = SkProfileService.instance;
    const channels = additionalUserInfo.favoriteChannelIds;
    const isExternal = isExternalInstructor();

    return (
      <>
        <div className="g-menu-category">
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
                    colleges={categoryColleges}
                    activeCollege={activeCollege}
                    channels={channelCounts}
                    favorites={channels}
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

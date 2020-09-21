import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { FavoriteChannelChangeModal } from 'shared';
import { NotieService } from 'notie/stores';
import { ChannelModel } from 'college/model';
import { SkProfileService } from 'profile/stores';
import mainRoutePaths from 'main/routePaths';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutePaths from 'myTraining/routePaths';
import boardRoutePaths from 'board/routePaths';

//import SiteMapModalContainer from './SiteMapModalContainer';
import SiteMapModalContainer from './SiteMapModalContainerV2';
import QuickNavWrapperView from '../view/QuickNavWrapperView';
import {
  MenuWrapperView,
  TopMenuItemView,
  BottomMenuItemView,
} from '../view/QuickNavElementsView';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  notieService?: NotieService;
}

interface State {
  active: boolean;
}

@inject(mobxHelper.injectFrom('notie.notieService', 'profile.skProfileService'))
@reactAutobind
@observer
class QuickNavContainer extends Component<Props, State> {
  //
  hasAdminRole = patronInfo.hasPavilionRole(
    'SuperManager',
    'CollegeManager',
    'CompanyManager'
  );

  state = {
    active: false,
  };

  componentDidMount() {
    //
    window.addEventListener('click', this.deactive);
    this.props.notieService!.hasQuickLearningFeeds();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.deactive();
    }
  }

  deactive() {
    this.setState({ active: false });
  }

  routeNav(path: string) {
    //
    this.props.history.push(path);
    this.onClickToggle();
  }

  onClickTop() {
    window.scrollTo(0, 0);
  }

  onClickToggle() {
    //
    this.props.notieService!.hasQuickLearningFeeds();
    this.setState(prevState => {
      //
      const nextActive = !prevState.active;

      if (nextActive) {
        this.props.skProfileService!.findStudySummary();
      }
      return { active: nextActive };
    });
  }

  onClose() {
    //
    this.props.skProfileService!.findStudySummary();
    this.setState({ active: false });
  }

  onClickLearning() {
    //
    this.routeNav(myTrainingRoutePaths.learning());
  }

  onClickCommunity() {
    //
    this.routeNav(myTrainingRoutePaths.community());
  }

  onClickSupport() {
    //
    this.routeNav(boardRoutePaths.supportNotice());
  }

  onClickIntroduction() {
    //
    this.routeNav('/introduction');
  }

  onClickApproval() {
    // 승인관리 바로 가기
    this.routeNav('/approval/ApprovalList');
  }

  onClickApl() {
    // 개인학습 등록 바로 가기
    this.routeNav('/learning/add-personal-learning-create');
  }

  onClickAdminSite() {
    // localAdmin by gon
    if (window.location.hostname === 'localhost') {
      window.open('http://localhost:8090');
    } else {
      const adminSiteUrl = process.env.REACT_APP_ADMIN_SITE;
      if (adminSiteUrl) {
        window.open(adminSiteUrl);
      }
    }
  }

  onConfirmFavorite() {
    //
    const { location, history } = this.props;
    const { pathname } = location;

    if (pathname.startsWith(`${mainRoutePaths.main()}pages`)) {
      history.replace(mainRoutePaths.main());
    } else if (pathname.startsWith(`${lectureRoutePaths.recommend()}/pages`)) {
      history.replace(lectureRoutePaths.recommend());
    }
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { active } = this.state;
    const { studySummaryFavoriteChannels } = skProfileService!;

    const favoriteChannels = studySummaryFavoriteChannels.map(
      channel =>
        new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );

    return (
      <QuickNavWrapperView
        active={active}
        onTop={this.onClickTop}
        onToggle={this.onClickToggle}
      >
        <MenuWrapperView
          topButtons={
            <>
              <TopMenuItemView
                iconName="learning32"
                notieActive={this.props.notieService!.notieActive}
                text="Learning"
                onClick={this.onClickLearning}
              />
              {/*<TopMenuItemView iconName="community32" feedType={this.state.feedType} text="Community" onClick={this.onClickCommunity} />*/}
              <TopMenuItemView
                iconName="support32"
                notieActive={this.props.notieService!.notieActive}
                text="Support"
                onClick={this.onClickSupport}
              />
            </>
          }
          bottomButtons={
            <>
              <BottomMenuItemView
                iconName="building"
                text="mySUNI Introduction"
                onClick={this.onClickIntroduction}
              />
              <FavoriteChannelChangeModal
                trigger={
                  <BottomMenuItemView
                    iconName="admin"
                    text="관심채널"
                    onClick={this.onClose}
                  />
                }
                favorites={favoriteChannels}
                onConfirmCallback={this.onConfirmFavorite}
              />
              <SiteMapModalContainer
                trigger={
                  <BottomMenuItemView
                    iconName="sitemap"
                    text="Site Map"
                    onClick={this.onClose}
                  />
                }
              />

              {/*0513 승인관리 메뉴 추가*/}
              <BottomMenuItemView
                iconName="confirm"
                text="승인관리"
                onClick={this.onClickApproval}
              />

              {/*0907 개인학습 등록 메뉴 추가*/}
              <BottomMenuItemView
                iconName="apl"
                text="개인학습 등록"
                onClick={this.onClickApl}
              />

              {this.hasAdminRole && (
                <BottomMenuItemView
                  iconName="admin24"
                  text="Admin Site"
                  onClick={this.onClickAdminSite}
                />
              )}
            </>
          }
        />
      </QuickNavWrapperView>
    );
  }
}

export default withRouter(QuickNavContainer);

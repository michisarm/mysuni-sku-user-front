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
import MenuControlAuthService from '../../../../../approval/company/present/logic/MenuControlAuthService';
import SkProfileModel from '../../../../../profile/model/SkProfileModel';
import {MenuControlAuth} from '../../../../../shared/model/MenuControlAuth';

import ReactGA from 'react-ga';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  notieService?: NotieService;
  menuControlAuthService?: MenuControlAuthService;
}

interface State {
  active: boolean;
}

@inject(mobxHelper.injectFrom(
  'notie.notieService',
  'profile.skProfileService',
  'approval.menuControlAuthService'))
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
    this.menuControlAuth();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.deactive();
    }
  }

  menuControlAuth() {
    //
    const { skProfileService, menuControlAuthService } = this.props;
    skProfileService!.findSkProfile()
      .then((profile: SkProfileModel) => menuControlAuthService!.findMenuControlAuth(profile.member.companyCode))
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

  onClose(name: string) {
    //
    this.props.skProfileService!.findStudySummary();
    this.setState({ active: false });

    // react-ga event
    ReactGA.event({
      category: 'QuickNav',
      action: 'Click',
      label: `QuickNav-${name}`,
    })
  }

  onClickLearning(name: string) {
    //
    this.routeNav(myTrainingRoutePaths.learning());

    // react-ga event
    ReactGA.event({
      category: 'QuickNav',
      action: 'Click',
      label: `QuickNav-${name}`,
    });
  }

  onClickCommunity() {
    //
    this.routeNav(myTrainingRoutePaths.community());
  }

  onClickSupport(name: string) {
    //
    this.routeNav(boardRoutePaths.supportNotice());

    // react-ga event
    ReactGA.event({
      category: 'QuickNav',
      action: 'Click',
      label: `QuickNav-${name}`,
    });
  }

  onClickIntroduction(name: string) {
    //
    this.routeNav('/introduction');

    // react-ga event
    ReactGA.event({
      category: 'QuickNav',
      action: 'Click',
      label: `QuickNav-${name}`,
    })
  }

  onClickApproval(name: string) {
    // 승인관리 바로 가기
    this.routeNav('/approval');

    // react-ga event
    ReactGA.event({
      category: 'QuickNav',
      action: 'Click',
      label: `QuickNav-${name}`,
    })
  }

  onClickApl(name: string) {
    // 개인학습 등록 바로 가기
    //this.routeNav('/learning/add-personal-learning-create');
    this.routeNav('/my-training/apl/create');

    // react-ga event
    ReactGA.event({
      category: 'QuickNav',
      action: 'Click',
      label: `QuickNav-${name}`,
    })
  }

  onClickAdminSite(name: string) {
    // localAdmin by gon
    if (window.location.hostname === 'localhost') {
      window.open('http://localhost:8090');
    } else {
      const adminSiteUrl = process.env.REACT_APP_ADMIN_SITE;
      if (adminSiteUrl) {
        window.open(adminSiteUrl);
      }
    }

    // react-ga event
    ReactGA.event({
      category: 'QuickNav',
      action: 'Click',
      label: `QuickNav-${name}`,
    })
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
    const { skProfileService, menuControlAuthService } = this.props;
    const { active } = this.state;
    const { studySummaryFavoriteChannels } = skProfileService!;
    const { menuControlAuth } = menuControlAuthService!;

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
                onClick={() => this.onClickLearning('Learning')}
              />
              {/*<TopMenuItemView iconName="community32" feedType={this.state.feedType} text="Community" onClick={this.onClickCommunity} />*/}
              <TopMenuItemView
                iconName="support32"
                notieActive={this.props.notieService!.notieActive}
                text="Support"
                onClick={() => this.onClickSupport('Support')}
              />
            </>
          }
          bottomButtons={
            <>
              <BottomMenuItemView
                iconName="building"
                text="mySUNI Introduction"
                onClick={() => this.onClickIntroduction('mySUNI Introduction')}
              />
              <FavoriteChannelChangeModal
                trigger={
                  <BottomMenuItemView
                    iconName="admin"
                    text="관심채널"
                    onClick={() => this.onClose('관심채널')}
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
                    onClick={() => this.onClose('Site Map')}
                  />
                }
              />

              {/*0513 승인관리 메뉴 추가*/}
              <BottomMenuItemView
                iconName="confirm"
                text="승인관리"
                onClick={() => this.onClickApproval('승인관리')}
              />

              {/*0907 개인학습 등록 메뉴 추가*/}
              {(menuControlAuth.companyCode === '' || ( menuControlAuth.authCode === MenuControlAuth.User
                && menuControlAuth.useYn === MenuControlAuth.Yes))
              &&(
                <>
                  <BottomMenuItemView
                    iconName="apl"
                    text="개인학습 등록"
                    onClick={() => this.onClickApl('개인학습 등록')}
                  />
                </>
                )
              }
              {/*
              <BottomMenuItemView
                iconName="apl"
                text="개인학습 등록"
                onClick={this.onClickApl}
              />
              */}
              {this.hasAdminRole && (
                <BottomMenuItemView
                  iconName="admin24"
                  text="Admin Site"
                  onClick={() => this.onClickAdminSite('Admin Site')}
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

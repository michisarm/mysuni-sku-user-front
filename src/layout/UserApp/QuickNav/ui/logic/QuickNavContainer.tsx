import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';
import { FavoriteChannelChangeModal } from 'shared';
import { NotieService } from 'notie/stores';
import { SkProfileService } from 'profile/stores';
import mainRoutePaths from 'main/routePaths';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutePaths from 'myTraining/routePaths';
import boardRoutePaths from 'board/routePaths';
import { getPolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

//import SiteMapModalContainer from './SiteMapModalContainer';
import SiteMapModalContainer from './SiteMapModalContainerV2';
import QuickNavWrapperView from '../view/QuickNavWrapperView';
import {
  MenuWrapperView,
  TopMenuItemView,
  BottomMenuItemView,
} from '../view/QuickNavElementsView';
import MenuControlAuthService from '../../../../../approval/company/present/logic/MenuControlAuthService';

import ReactGA from 'react-ga';
import { PageElement } from '../../../../../lecture/shared/model/PageElement';
import { setMenuAuthModel } from 'layout/UserApp/store/MenuAuthStore';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  notieService?: NotieService;
  menuControlAuthService?: MenuControlAuthService;
}

interface State {
  active: boolean;
  menuAuth: PageElement[];
}

@inject(
  mobxHelper.injectFrom(
    'notie.notieService',
    'profile.skProfileService',
    'approval.menuControlAuthService'
  )
)
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
    menuAuth: [],
  };

  componentDidMount() {
    //
    window.addEventListener('click', this.deactive);
    this.props.notieService!.hasQuickLearningFeeds();
    this.menuControlAuth();
    this.avaible(); //api????????? ????????? 3.30
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.deactive();
    }
  }

  async menuControlAuth() {
    //
    const { skProfileService, menuControlAuthService } = this.props;
    // skProfileService!
    //   .findSkProfile()
    //   .then((profile: SkProfileModel) =>
    //     menuControlAuthService!.findMenuControlAuth(parsePolyglotString(profile.companyName))
    //   );

    await skProfileService!.findSkProfile();
    const { skProfile } = skProfileService!;
    await menuControlAuthService!.findMenuControlAuth();
  }

  async avaible() {
    // const response = await findAvailablePageElements();
    // if (response) {
    //   this.setState({
    //     menuAuth: response,
    //   });
    //   setMenuAuthModel(response);
    // }
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
    this.setState((prevState) => {
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
    });
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
    });
  }

  onClickApproval(name: string) {
    // ???????????? ?????? ??????
    this.routeNav('/approval');

    // react-ga event
    ReactGA.event({
      category: 'QuickNav',
      action: 'Click',
      label: `QuickNav-${name}`,
    });
  }

  onClickApl(name: string) {
    // ???????????? ?????? ?????? ??????
    //this.routeNav('/learning/add-personal-learning-create');
    this.routeNav('/my-training/apl/create');

    // react-ga event
    ReactGA.event({
      category: 'QuickNav',
      action: 'Click',
      label: `QuickNav-${name}`,
    });
  }

  onClickAdminSite(name: string) {
    // localAdmin by gon
    if (window.location.hostname === 'mysuni.sk.com') {
      window.open('https://star.mysuni.sk.com/star-login');
    } else if (window.location.hostname === 'ma.mysuni.sk.com') {
      window.open('https://ma-star.mysuni.sk.com/star-login');
    } else if (window.location.hostname === 'stg.mysuni.sk.com') {
      window.open('https://stg-star.mysuni.sk.com/star-login');
    } else if (window.location.hostname === 'localhost') {
      window.open('http://localhost:8090');
    } else if (window.location.hostname === 'university.sk.com') {
      window.open('http://university.sk.com/login');
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
    });
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
    const { additionalUserInfo } = skProfileService!;
    const { menuControlAuth } = menuControlAuthService!;
    const { menuAuth } = this.state;

    const favoriteChannels = additionalUserInfo.favoriteChannelIds;

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
                text={getPolyglotText('Learning', 'home-?????????-lrn')}
                onClick={() => this.onClickLearning('Learning')}
              />
              {/*<TopMenuItemView iconName="community32" feedType={this.state.feedType} text="Community" onClick={this.onClickCommunity} />*/}
              {menuAuth.some(
                (menuAuth: PageElement) =>
                  menuAuth.position === 'FloatingMenu' &&
                  menuAuth.type === 'Support'
              ) && (
                <TopMenuItemView
                  iconName="support32"
                  notieActive={this.props.notieService!.notieActive}
                  text={getPolyglotText('Support', 'home-?????????-sp')}
                  onClick={() => this.onClickSupport('Support')}
                />
              )}
            </>
          }
          bottomButtons={
            <>
              {menuAuth.some(
                (menuAuth: PageElement) =>
                  menuAuth.position === 'FloatingMenu' &&
                  menuAuth.type === 'Introduction'
              ) && (
                <BottomMenuItemView
                  iconName="building"
                  text={getPolyglotText(
                    'mySUNI Introduction',
                    'home-?????????-msid'
                  )}
                  onClick={() =>
                    this.onClickIntroduction('mySUNI Introduction')
                  }
                />
              )}
              {menuAuth.some(
                (menuAuth: PageElement) =>
                  menuAuth.position === 'FloatingMenu' &&
                  menuAuth.type === 'FavoriteChannels'
              ) && (
                <FavoriteChannelChangeModal
                  trigger={
                    <BottomMenuItemView
                      iconName="admin"
                      text={getPolyglotText('????????????', 'home-?????????-????????????')}
                      onClick={() => this.onClose('????????????')}
                    />
                  }
                  favorites={favoriteChannels}
                  onConfirmCallback={this.onConfirmFavorite}
                />
              )}
              {menuAuth.some(
                (menuAuth: PageElement) =>
                  menuAuth.position === 'FloatingMenu' &&
                  menuAuth.type === 'SiteMap'
              ) && (
                <SiteMapModalContainer
                  trigger={
                    <BottomMenuItemView
                      iconName="sitemap"
                      text={getPolyglotText('Site Map', 'home-?????????-????????????')}
                      onClick={() => this.onClose('Site Map')}
                    />
                  }
                />
              )}
              {/*0513 ???????????? ?????? ??????*/}
              {menuAuth.some(
                (menuAuth: PageElement) =>
                  menuAuth.position === 'FloatingMenu' &&
                  menuAuth.type === 'Approval'
              ) && (
                <BottomMenuItemView
                  iconName="confirm"
                  text={getPolyglotText('????????????', 'home-?????????-????????????')}
                  onClick={() => this.onClickApproval('????????????')}
                />
              )}
              {/*0907 ???????????? ?????? ?????? ??????*/}
              {menuControlAuth.useApl && (
                <>
                  <BottomMenuItemView
                    iconName="apl"
                    text={getPolyglotText(
                      '???????????? ??????',
                      'home-?????????-????????????'
                    )}
                    onClick={() => this.onClickApl('???????????? ??????')}
                  />
                </>
              )}
              {/*
              <BottomMenuItemView
                iconName="apl"
                text="???????????? ??????"
                onClick={this.onClickApl}
              />
              */}
              {this.hasAdminRole && (
                <BottomMenuItemView
                  iconName="admin24"
                  text={getPolyglotText('Admin Site', 'home-?????????-adst')}
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

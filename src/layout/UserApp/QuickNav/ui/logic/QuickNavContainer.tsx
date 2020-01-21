
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { tenantInfo } from '@nara.platform/dock';

import mainRoutePaths from 'main/routePaths';
import lectureRoutePaths from 'lecture/routePaths';
import myTrainingRoutePaths from 'myTraining/routePaths';
import { FavoriteChannelChangeModal } from 'sharedComponent';
import { SkProfileService } from 'profile';
import SiteMapModalContainer from '../../../QuickNav/ui/logic/SiteMapModalContainer';
import QuickNavWrapperView from '../view/QuickNavWrapperView';
import {
  MenuWrapperView, TopMenuItemView, BottomMenuItemView,
} from '../view/QuickNavElementsView';
import { ChannelModel } from '../../../../../college';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

interface State {
  active: boolean,
  feedType: string
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@reactAutobind
@observer
class QuickNavContainer extends Component<Props, State> {
  //
  hasAdminRole = tenantInfo.hasRole('CompanyManager', 'CollegeManager', 'SuperManager');

  state = {
    active: false,
    feedType: '',
  };


  componentDidMount() {
    //
    window.addEventListener('click', this.deactive);
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
    this.setState((prevState) => {
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
    this.setState( { feedType: '' } );
    this.routeNav(myTrainingRoutePaths.learning());
  }

  onClickCommunity() {
    //
    this.setState( { feedType: '' } );
    this.routeNav(myTrainingRoutePaths.community());
  }

  onClickSupport() {
    //
    this.setState( { feedType: '' } );
    this.routeNav('/board/support/Notice');
  }

  onClickIntroduction() {
    //
    this.routeNav('/introduction');
  }

  onClickAdminSite() {
    //
    const adminSiteUrl = process.env.REACT_APP_ADMIN_SITE;

    if (adminSiteUrl) {
      window.open(adminSiteUrl);
    }
  }

  onConfirmFavorite() {
    //
    const { location, history } = this.props;
    const { pathname } = location;

    if (pathname.startsWith(`${mainRoutePaths.main()}pages`)) {
      history.replace(mainRoutePaths.main());
    }
    else if (pathname.startsWith(`${lectureRoutePaths.recommend()}/pages`)) {
      history.replace(lectureRoutePaths.recommend());
    }
  }

  render() {
    //
    const { skProfileService } = this.props;
    const { active } = this.state;
    const { studySummaryFavoriteChannels } = skProfileService!;

    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
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
              <TopMenuItemView iconName="learning32" feedType={this.state.feedType} text="Learning" onClick={this.onClickLearning} />
              {/*<TopMenuItemView iconName="community32" feedType={this.state.feedType} text="Community" onClick={this.onClickCommunity} />*/}
              <TopMenuItemView iconName="support32" feedType={this.state.feedType} text="Support" onClick={this.onClickSupport} />
            </>
          }
          bottomButtons={
            <>
              <BottomMenuItemView iconName="building" text="mySUNI Introduction" onClick={this.onClickIntroduction} />
              <FavoriteChannelChangeModal
                trigger={(
                  <BottomMenuItemView iconName="admin" text="관심 Channel" onClick={this.onClose} />
                )}
                favorites={favoriteChannels}
                onConfirmCallback={this.onConfirmFavorite}
              />
              <SiteMapModalContainer
                trigger={<BottomMenuItemView iconName="sitemap" text="Site Map" onClick={this.onClose} />}
              />

              {
                this.hasAdminRole && (
                  <BottomMenuItemView iconName="admin" text="mySUNI Admin Site" onClick={this.onClickAdminSite} />
                )
              }
            </>
          }
        />
      </QuickNavWrapperView>
    );
  }
}

export default withRouter(QuickNavContainer);

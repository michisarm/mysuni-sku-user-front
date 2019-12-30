
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';

//import { tenantInfo } from '@nara.platform/dock';
import QuickNavWrapperView from '../view/QuickNavWrapperView';
import {
  MenuWrapperView, TopMenuItemView, BottomMenuItemView,
} from '../view/QuickNavElementsView';


interface Props extends RouteComponentProps {
}

interface State {
  active: boolean,
}


@reactAutobind
class QuickNavContainer extends Component<Props, State> {
  //
  //userRoles = tenantInfo.getTenantRoles();

  state = {
    active: false,
  };


  componentDidMount() {
    window.addEventListener('click', this.deactive);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    //
    if (prevProps.location.key !== this.props.location.key) {
      this.deactive();
    }
    // if (prevState.active !== this.state.active && this.state.active) {
    //   window.addEventListener('click', this.deactive);
    // }
  }

  deactive() {
    this.setState({ active: false });
  }

  onClickToggle() {
    //
    this.setState((prevState) => ({
      active: !prevState.active,
    }));
  }

  onClickLearning() {

  }

  onClickCommunity() {

  }

  onClickSupport() {
    //
    this.props.history.push('/board/support/Notice');
    this.onClickToggle();
  }

  onClickIntroduction() {
    //
  }

  onClickSiteMap() {

  }

  onClickSearch() {

  }

  onClickAdminSite() {
    //
    const adminSiteUrl = process.env.REACT_APP_ADMIN_SITE;

    if (adminSiteUrl) {
      window.location.href = adminSiteUrl;
    }
  }

  onClickInstructor() {
    this.props.history.push('/expert/instructor');
    this.onClickToggle();
  }


  render() {
    //
    const { active } = this.state;

    return (
      <QuickNavWrapperView
        active={active}
        onClick={this.onClickToggle}
      >
        <MenuWrapperView
          topButtons={
            <>
              <TopMenuItemView iconName="learning32" text="Learning" onClick={this.onClickLearning} />
              <TopMenuItemView iconName="community32" text="Community" onClick={this.onClickCommunity} />
              <TopMenuItemView iconName="support32" text="Support" onClick={this.onClickSupport} />
            </>
          }
          bottomButtons={
            <>
              <BottomMenuItemView iconName="building" text="mySUNI Introduction" onClick={this.onClickIntroduction} />
              <BottomMenuItemView iconName="sitemap" text="Site Map" onClick={this.onClickSiteMap} />
              <BottomMenuItemView iconName="search" text="Search" onClick={this.onClickSearch} />
              <BottomMenuItemView iconName="" text="Instructor" onClick={this.onClickInstructor} />
              {/*{ this.userRoles.includes('Admin') && (
                <BottomMenuItemView iconName="admin" text="mySUNI Admin Site" onClick={this.onClickAdminSite} />
              )}*/}
            </>
          }
        />
      </QuickNavWrapperView>
    );
  }
}

export default withRouter(QuickNavContainer);

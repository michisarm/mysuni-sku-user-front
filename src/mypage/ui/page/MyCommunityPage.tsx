
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { ContentHeader, ContentLayout, mobxHelper, ContentMenu } from 'shared';
import { SkProfileModel, SkProfileService } from 'profile';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

interface State {
  type: string
}

console.log('community', mobxHelper);
@inject(mobxHelper.injectFrom('skProfileService'))
@observer
@reactAutobind
class MyCommunityPage extends Component<Props, State> {
  //
  state = {
    type: 'MyCommunity',
  };

  componentDidMount(): void {
    this.init();
  }

  init() {
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile();
    skProfileService!.findStudySummary();
  }


  getMenus() {
    //
    const menus: typeof ContentMenu.Menu[] = [];
    menus.push(
      { name: 'My Community', type: 'MyCommunity' },
      { name: 'My Created Community', type: 'MyCreatedCommunity' },
      { name: 'My Feed', type: 'MyFeed' },
    );

    return menus;
  }

  render() {

    const { skProfileService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;

    const { member } = skProfile as SkProfileModel;

    return (
      <ContentLayout
        className = "community"
        breadcrumb={[
          { text: 'Community', path: '/community' },
        ]}
      >
        <ContentHeader className="content-division">
          <ContentHeader.Cell inner>
            <ContentHeader.ProfileItem
              image={member && member.base64Photo || `${process.env.PUBLIC_URL}/images/all/profile-56-px.png`}
              name={member.name}
              teams={[member.company || '', member.department || '']}
              imageEditable={false}
              myPageActive
            />
          </ContentHeader.Cell>
          <ContentHeader.Cell inner>
            <ContentHeader.CommunityItem
              joinedCount={0}
              myCount={0}
            />
          </ContentHeader.Cell>
        </ContentHeader>
        <ContentMenu
          menus={this.getMenus()}
          type={this.state.type}
          onSelectMenu={(type) => this.setState({ type })}
        />
        {/*<MenuItemContainer />*/}
      </ContentLayout>
    );
  }
}

export default MyCommunityPage;

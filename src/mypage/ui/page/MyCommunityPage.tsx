
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentHeader, ContentLayout, mobxHelper, ContentMenu, Type } from 'shared';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { EmployeeModel, SkProfileModel, SkProfileService } from 'profile';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

interface State {
  type: Type
}

@inject(mobxHelper.injectFrom('skProfileService'))
@observer
@reactAutobind
class MyCommunityPage extends Component<Props, State> {
  //
  state = {
    type: Type.MyCommunity,
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
      { name: 'My Community', type: Type.MyCommunity },
      { name: 'My Created Community', type: Type.MyCreatedCommunity },
      { name: 'My Feed', type: Type.MyFeed },
    );

    return menus;
  }

  render() {

    const { skProfileService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;

    const { member } = skProfile as SkProfileModel;
    const { companyNames: company, departmentNames: realTeam  } = member as EmployeeModel;

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
              name={member.names.string}
              teams={[company && company.string || '', realTeam && realTeam.string || '']}
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

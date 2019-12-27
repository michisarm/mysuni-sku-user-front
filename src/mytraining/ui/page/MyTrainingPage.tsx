
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentHeader, ContentLayout, ContentMenu, mobxHelper } from 'shared';
import { SkProfileModel, SkProfileService } from 'profile';



interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService
}

interface State {
  type: string
}

@inject(mobxHelper.injectFrom('skProfileService'))
@observer
@reactAutobind
class MyTrainingPage extends Component<Props, State> {
  //
  state= {
    type: 'InProgress',
  };

  componentDidMount(): void {
    this.init();
  }

  init() {
    const { skProfileService } = this.props;

    skProfileService!.findSkProfile();
    this.onSelectMenu(this.state.type);
  }

  onSelectMenu(type: string) {
    switch (type) {
      case 'InMyList':
        break;
      case 'Required':
        break;
      case 'Retry':
        break;
      default:
    }

    this.setState({ type });
  }


  render() {
    //
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService as SkProfileService;

    const { member } = skProfile as SkProfileModel;

    return (
      <ContentLayout
        breadcrumb={[
          { text: `Learning` },
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
            <ContentHeader.TotalTimeItem
              minute={0}
            />
            <ContentHeader.ChartItem
              universityTime={0}
              myCompanyTime={0}
            />
          </ContentHeader.Cell>
        </ContentHeader>
        <ContentMenu
          menus={[
            {
              name: 'In Progress',
              type: 'InProgress',
            },
            {
              name: 'In my list',
              type: 'InMyList',
            },
            {
              name: 'Enrolled',
              type: 'Enrolled',
            },
            {
              name: 'Required',
              type: 'Required',
            },
            {
              name: 'Completed',
              type: 'Completed',
            },
            {
              name: 'Retry',
              type: 'Retry',
            },
          ]}
          type={this.state.type}
          onSelectMenu={this.onSelectMenu}
        />
        {/*<ChannelLecturesContainer />*/}
      </ContentLayout>
    );
  }
}

export default withRouter(MyTrainingPage);

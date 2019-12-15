
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import { inject, observer } from 'mobx-react';
import TitleContainer from './TitleContainer';
import MenuItemContainer from './MenuItemContainer';
import { SkProfileService } from '../../../profile';

interface Props{
  skProfileService : SkProfileService
}

@inject('skProfileService')
@observer
@reactAutobind
class MyPageContainer extends Component<Props> {

  componentDidMount(): void {
    const { skProfileService } = this.props;
    if (skProfileService) {
      skProfileService.findSkProfile('hong@sk.com');  //login한 사용자
      skProfileService.findStudySummary('hong@sk.com');
    }

  }

  render() {
    const { skProfile } = this.props.skProfileService;
    return (
      <ContentLayout
        breadcrumb={[
          { text: 'depth1', path: '/depth1-path' },
          { text: 'depth2', path: '' },
        ]}
      >
        <TitleContainer skProfile={skProfile} />
        <MenuItemContainer />
      </ContentLayout>
    );
  }
}

export default MyPageContainer;

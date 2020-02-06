
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import PersonalInfoAgreementContainer from '../logic/PersonalInfoAgreementContainer';


@observer
@reactAutobind
class PersonalInfoAgreementPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="bg-white"
      >
        <PersonalInfoAgreementContainer />
      </ContentLayout>
    );
  }
}

export default PersonalInfoAgreementPage;

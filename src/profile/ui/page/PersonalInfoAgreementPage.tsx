import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import ContentHeaderContainer from '../logic/ContentHeaderContainer';
import PersonalInfoAgreementContainer from '../logic/PersonalInfoAgreementContainer';

@observer
@reactAutobind
class PersonalInfoAgreementPage extends Component {
  //
  state = {
    activeStep: 'step1',
  };

  onClickNextStep(step: string) {
    this.setState({ activeStep: step });
  }

  render() {
    //
    const { activeStep } = this.state;

    return (
      <ContentLayout className="bg-white">
        <section>
          <div className="interest-content lo-08-02 ">
            <ContentHeaderContainer step={2} />

            <PersonalInfoAgreementContainer />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default PersonalInfoAgreementPage;

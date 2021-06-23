import React, { Component } from 'react';
import { ContentLayout } from 'shared';
import PersonalInfoAgreementContainer from '../logic/PersonalInfoAgreementContainer';
import ContentHeaderContainer from '../logic/ContentHeaderContainer';

class PersonalInfoAgreementPage extends Component {
  render() {
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

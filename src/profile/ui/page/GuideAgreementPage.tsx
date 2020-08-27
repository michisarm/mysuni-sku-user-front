import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import ContentHeaderContainer from '../logic/ContentHeaderContainer';
import GuideAgreementContainer from '../logic/GuideAgreementContainer';

@observer
@reactAutobind
class GuideAgreementPage extends Component {
  //
  render() {
    //
    return (
      <ContentLayout className="bg-white">
        <section>
          <div className="interest-content">
            <ContentHeaderContainer step={1} />

            <GuideAgreementContainer />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default GuideAgreementPage;

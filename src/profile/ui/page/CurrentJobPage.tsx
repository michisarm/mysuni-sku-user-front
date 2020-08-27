
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import CurrentJobContainer from '../logic/CurrentJobContainer';
import PersonalInfoStep from '../view/PersonalInfoStep';


@observer
@reactAutobind
class CurrentJobPage extends React.Component {
  //
  componentDidMount(): void {
    //
    document.body.classList.add('white');
  }

  componentWillUnmount(): void {
    //
    document.body.classList.remove('white');
  }

  render() {
    //
    return (
      <ContentLayout
        disabled
      >
        <section>
          <div className="interest-content lo-08-03">
            <PersonalInfoStep activeStep="step3"/>

            <CurrentJobContainer />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default CurrentJobPage;

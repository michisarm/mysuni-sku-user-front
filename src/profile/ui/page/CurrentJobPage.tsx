import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import ContentHeaderContainer from '../logic/ContentHeaderContainer';
import CurrentJobContainer from '../logic/CurrentJobContainer';

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
      <ContentLayout disabled>
        <section>
          <div className="interest-content lo-08-03 step2">
            <ContentHeaderContainer step={3} />

            <CurrentJobContainer />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default CurrentJobPage;

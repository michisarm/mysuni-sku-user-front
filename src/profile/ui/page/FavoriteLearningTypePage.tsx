import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import ContentHeaderContainer from '../logic/ContentHeaderContainer';
import FavoriteLearningTypeContainer from '../logic/FavoriteLearningTypeContainer';

@observer
@reactAutobind
class FavoriteLearningTypePage extends Component {
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
          <div className="interest-content step3">
            <ContentHeaderContainer step={6} />
            <FavoriteLearningTypeContainer />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default FavoriteLearningTypePage;

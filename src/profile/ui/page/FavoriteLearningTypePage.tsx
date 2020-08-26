
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import FavoriteContentHeaderContainer from '../logic/FavoriteContentHeaderContainer';
import FavoriteLearningTypeContainer from '../logic/FavoriteLearningTypeContainer';
import PersonalInfoStep from '../view/PersonalInfoStep';


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
      <ContentLayout
        disabled
      >
        <section>
          <div className="interest-content lo-08-05 step3">

            {/*<FavoriteContentHeaderContainer step={3} />*/}
            <PersonalInfoStep activeStep="step6"/>
            <FavoriteLearningTypeContainer />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default FavoriteLearningTypePage;

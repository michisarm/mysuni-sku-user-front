
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import FavoriteContentHeaderContainer from '../logic/FavoriteContentHeaderContainer';
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
      <ContentLayout
        className="bg-white"
      >
        <div className="interest-content step3">
          <FavoriteContentHeaderContainer step={3} />
          <FavoriteLearningTypeContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default FavoriteLearningTypePage;

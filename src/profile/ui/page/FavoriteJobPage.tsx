
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import FavoriteContentHeaderContainer from '../logic/FavoriteContentHeaderContainer';
import FavoriteJobContainer from '../logic/FavoriteJobContainer';


@observer
@reactAutobind
class FavoriteJobPage extends React.Component {
  //
  render() {
    //
    return (
      <ContentLayout
        className="bg-white"
      >
        <div className="interest-content step2">
          <FavoriteContentHeaderContainer step={2} />

          <FavoriteJobContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default FavoriteJobPage;

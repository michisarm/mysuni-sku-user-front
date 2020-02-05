
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
          <div className="interest-content step2">
            <FavoriteContentHeaderContainer step={2} />

            <FavoriteJobContainer />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default FavoriteJobPage;

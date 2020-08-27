
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import FavoriteCollegeContainer from '../logic/FavoriteCollegeContainer';
import FavoriteContentHeaderContainer from '../logic/FavoriteContentHeaderContainer';
import PersonalInfoStep from '../view/PersonalInfoStep';


@observer
@reactAutobind
class FavoriteCollegePage extends React.Component {
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
        <section className="bg-white">
          <div className="interest-content lo-08-06 step1">

            {/*<FavoriteContentHeaderContainer step={1} />*/}
            <PersonalInfoStep activeStep="step5" />

            <FavoriteCollegeContainer />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default FavoriteCollegePage;

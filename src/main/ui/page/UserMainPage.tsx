
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import MainCarouselContainer from '../logic/MainCarouselContainer';
import SearchBarContainer from '../logic/SearchBarContainer';
import MyLearningAreaContainer from '../logic/MyLearningAreaContainer';


@reactAutobind
@observer
class UserMainPage extends Component {
  //
  render() {
    //
    return (
      <div className="main-wrap">
        <MainCarouselContainer />
        <SearchBarContainer />
        <MyLearningAreaContainer />
      </div>
    );
  }
}

export default UserMainPage;

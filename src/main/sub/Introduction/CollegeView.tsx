
import React, { Component } from 'react';
import CollegeInnerTabView from './CollegeInnerTabView';


class CollegeView extends Component {
  //
  render() {
    //
    return (
      <div className="ui attached tab active" data-tab="second">
        <CollegeInnerTabView />
      </div>
    );
  }
}

export default CollegeView;

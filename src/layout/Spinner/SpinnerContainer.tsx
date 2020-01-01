
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


@reactAutobind
class SpinnerContainer extends Component {
  //
  render() {
    return (
      <div className="loading-wrap" style={{display: 'block'}}>
        <div className="loading-box">
          LOADING
        </div>
      </div>
    );
  }
}

export default SpinnerContainer;

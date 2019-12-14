import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

class StampInfoView extends Component {
  render() {
    return (
      <div className="cell">
        <div className="stamp-wrap">
          <div className="acheive-stamp">
            <div className="value">3</div>
            <div className="label">획득 Stamp</div>
          </div>
          <div className="year">
            <div className="ui inline dropdown tight">
              <div className="text">2019</div>
              <Icon name="dropdown" />
              <div className="menu">
                <div className="item">2019</div>
                <div className="item">2018</div>
                <div className="item">2017</div>
                <div className="item">2016</div>
                <div className="item">2015</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StampInfoView;

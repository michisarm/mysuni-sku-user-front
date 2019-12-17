import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';

class StampInfoView extends Component {
  render() {
    return (
      <div className="cell">
        <div className="stamp-wrap">
          <Label className="stamp">
            <div><span className="text1">획득 Stamp</span></div>
            <div>
              <Icon className="stamp35" /><span className="text2">x</span>
              <span className="text3">12</span>
            </div>
          </Label>

          <div className="year">
            <div className="ui inline dropdown tight">
              <div className="text">2019</div>
              <Icon className="dropdown" />
              <div className="menu">
                <div className="item">2019</div>  {/* system 날짜로 연도 표현하고 이전 5년으로 리스트 변경*/}
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

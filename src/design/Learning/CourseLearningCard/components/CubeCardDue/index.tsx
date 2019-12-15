import React, { Component, createRef } from 'react';
import {
  Form,
  Radio,
  Image, Icon, Button, Label,
} from 'semantic-ui-react';
import CubeEnrollment from '../CubeRequired';

interface Props {

}

interface States {

}

class CubeCardDue extends React.Component<Props, States> {

  handleChange(e:any, { value }:any) {
    // this.setState({value});
  }

  render() {
    return (
      <div className="card-box first">
        {/* 썸네일 */}
        <div className="thumbnail">
          {/* 썸네일 이미지 위치 */}
        </div>
        <div className="title-area">
          <Label color="purple">DT</Label>
          <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
          <div className="deatil">
            <div className="item">
              <Label className="onlytext bold">
                <Icon className="video2" /><span>Video</span>
              </Label>
              <span className="channel">AI Biz Essential</span>
            </div>
            <div className="item">
              <Label className="onlytext">
                <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                <span className="ml17">Study start date, end date : 2019. 12. 31 ~ 2020. 02. 20</span>
              </Label>
            </div>
          </div>
        </div>
        <div className="btn-area">
          <Button className="fix line">View Details</Button>
          <Button className="fix line">Start Learning</Button>
        </div>
      </div>
    );
  }
}

export default CubeCardDue;

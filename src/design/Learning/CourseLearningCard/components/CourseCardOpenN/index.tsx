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
  value? : any
}

class CourseCardOpenN extends React.Component<Props, States> {

  handleChange(e:any, { value }:any) {
    // this.setState({ value });
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
              <span className="channel">Leading Myself</span>
            </div>
            <div className="item">
              <Label className="onlytext">
                <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
              </Label>
            </div>
          </div>
        </div>
        <div className="btn-area">
          <Button className="fix line">Go to this activity</Button>
        </div>
      </div>
    );
  }
}

export default CourseCardOpenN;

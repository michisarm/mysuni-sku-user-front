import React, { Component, createRef } from 'react';
import {
  Icon, Button, Label,
} from 'semantic-ui-react';

interface Props {

}

interface States {
  value? : any
}

class DefaultCourseCardIncluded extends React.Component<Props, States> {
  handleChange(e:any, { value }:any) {
    // this.setState({ value });
  }

  render() {
    return (
      <div className="card-box included">
        {/* 썸네일 */}
        <div className="thumbnail">
          {/* 썸네일 이미지 위치 */}
        </div>
        {/* //썸네일 */}
        <div className="title-area">
          <Label color="blue">Leadership</Label>
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
                <span className="ml17">Study start date, end date : 2019. 12. 31 ~ 2020. 02. 20</span>
              </Label>
            </div>
          </div>
        </div>
        <div className="btn-area">
          <Button className="fix line">View Details</Button>
        </div>
      </div>
    );
  }
}


export default DefaultCourseCardIncluded;

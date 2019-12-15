import React, { Component, createRef } from 'react';
import {
  Icon, Button, Label,
} from 'semantic-ui-react';

interface Props {

}

interface States {
  value? : any
}

class DefaultClosedCourseCard extends React.Component<Props, States> {

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
          <Label color="blue">Leadership</Label>
          <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
          <div className="deatil">
            <div className="item">
              <Label className="onlytext bold">
                <Icon className="course" /><span>Course</span>
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
        {/* 카드열림버튼 */}
        <Button icon className="img-icon fn-more-toggle card-open">
          <Icon className="arrow-down" />
        </Button>
        {/* 카드닫힘버튼 */}
        <Button icon className="img-icon fn-more-toggle card-close">
          <Icon className="arrow-up" />
        </Button>
      </div>

    );
  }
}

export default DefaultClosedCourseCard;

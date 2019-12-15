import React, { Component, createRef } from 'react';
import {
  Image, Label, Icon, Rating,
} from 'semantic-ui-react';

interface Props {

}

interface States {
  // activeItem:string
}

class TitleArea extends React.Component<Props, States> {
    contextRef:any = createRef();
    constructor(props:Props) {
      super(props);
      this.state = {
        // activeItem: 'Comment',
      };
    }

    handleItemClick(e:any, { name }:any) {
      // this.setState({ activeItem: name });
    }

    render() {
      return (
        <div className="main-info-area">
          <div className="main-info-wrap">
            {/*썸네일*/}
            <div className="thumbnail">
              {/*썸네일 이미지 위치*/}
            </div>
            <div className="title-area">
              <Label color="blue">Leadership</Label>
              <div className="header">Open Source를 활용한 Big Data 기반 플랫폼을 이용한 데이터 분석</div>
              <div className="deatil">
                <div className="item">
                  <Label className="bold onlytext">
                    <Icon className="course" /><span>Course</span>
                  </Label>
                  <span className="channel">Leading Myself</span>
                </div>
                <div className="item">
                  <Label className="onlytext">
                    <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                    <span className="ml17">Study start date, end date : 2019. 12. 31 ~ 2020. 02. 20 </span>
                  </Label>
                </div>
              </div>
            </div>
            <div className="right-area">
              {/*<div className="ui statistic stamp">*/}
              {/*    <div className="value">3</div>*/}
              {/*    <Label>획득 가능 Stamp</Label>*/}
              {/*</div>*/}
              <Rating defaultRating={4} maxRating={5} disabled className="rating-num" />
            </div>
          </div>
        </div>
      );
    }
}

export default TitleArea;

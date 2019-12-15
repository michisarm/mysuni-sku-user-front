import React, { Component, createRef } from 'react';
import {
  Segment,
  Sticky, Icon, Button, Menu, Label, Card, Rating,
} from 'semantic-ui-react';

interface Props {

}

interface States {
  isHovered : boolean
}

class CardValueRequired01 extends React.Component<Props, States> {
  constructor(props : Props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  handleHover() {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
    }));
  }

  render() {
    const activeClass = this.state.isHovered ? 'on' : '';
    return (
      <Card className={`card-h ${activeClass}`}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        <div className="card-ribbon-wrap">
          <Label className="ribbon2">Required</Label>
        </div>
        <div className="card-inner">
          {/* 썸네일 */}
          <div className="thumbnail" />
          {/* //썸네일 */}
          <div className="title-area">
            <Label color="red">혁신디자인</Label>
            <div className="header">Affiliate Marketing Masterclass: Newbie to Advanced
                            Bootcamp
            </div>
          </div>
          <div className="icon-area">
            <Label className="onlytext bold">
              <Icon className="video2" /><span>Video</span>
            </Label>
            <Label className="onlytext bold">
              <Icon className="time2" /><span>1h 30m</span>
            </Label>
            <Label className="onlytext">
              <Icon className="complete" /><span>이수 3,300명</span>
            </Label>
          </div>
          <div className="foot-area">
            <Label className="onlytext bold">
              <Icon className="state" /><span>Required</span>
            </Label>
            <div className="study-date">2019.10.10 필수 학습 등록</div>
          </div>
        </div>

        <div className="hover-content">
          <div className="title-area">
            <Label color="red">혁신디자인</Label>
            <div className="header">Machine learning Complete Guide for Calculus - Deep
            </div>
          </div>
          <p className="text-area">
                        This is a template for a simple marketing or informational website. It includes
                        a large callout called a jumbo Tron and three
          </p>
          <div className="btn-area">
            <Button icon className="icon-line"><Icon className="my" /></Button>
            <Button className="fix bg">View Details</Button>
          </div>
        </div>
      </Card>
    );
  }
}


export default CardValueRequired01;

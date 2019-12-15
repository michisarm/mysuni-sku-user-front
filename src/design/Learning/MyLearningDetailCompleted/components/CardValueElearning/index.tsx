import React, { Component, createRef } from 'react';
import {
  Segment,
  Sticky, Icon, Button, Menu, Label, Card,
} from 'semantic-ui-react';


interface Props {

}

class CardValueElearning extends React.Component<Props> {

  render() {
    return (
      <Card>
        <div className="card-inner">
          {/* 썸네일 */}
          <div className="thumbnail" />
          {/* //썸네일 */}
          <div className="title-area">
            <Label color="blue">Leadership</Label>
            <div className="header">Machine learning Complete Guide for Calculus - Deep 말줄임 말줄임 말줄임 말줄임 ning
                            Complning Compl
            </div>
            <div className="icon-area">
              <Label className="onlytext">
                <Icon className="date" /><span>Completed date : 2019. 01. 31</span>
              </Label>
            </div>
          </div>
          <div className="btn-area">
            <Button icon className="icon-big-line">
              <Icon className="play2" /><span>View Details</span>
            </Button>
          </div>
          <div className="time-area">
            <div className="location">
              <Label className="onlytext bold">
                <Icon className="e-learning" /><span>e-learning</span>
              </Label>
            </div>
            <div className="time">
              <strong>50</strong><span>h</span><strong className="ml9">27</strong><span>m</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}


export default CardValueElearning;

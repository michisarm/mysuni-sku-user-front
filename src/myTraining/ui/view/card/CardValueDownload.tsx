import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Card, Icon, Label } from 'semantic-ui-react';

@reactAutobind
class CardValueDownload extends Component {
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
                <Icon className="date" /><span>Completed date : 19. 01. 31</span>
              </Label>
            </div>
          </div>
          <div className="btn-area">
            <Button icon className="icon-big-line">
              <Icon className="download2" /><span>Download</span>
            </Button>
          </div>
          <div className="time-area">
            <div className="time">
              <strong>50</strong><span>h</span><strong className="ml9">27</strong><span>m</span>
            </div>
            <div className="location">
              <span className="location-name">Learning Card</span>
              <Label className="onlytext bold">
                <Icon className="video2" /><span>e-learning</span>
              </Label>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default CardValueDownload;

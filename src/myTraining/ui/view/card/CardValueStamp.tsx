import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Card, Icon, Label } from 'semantic-ui-react';

@reactAutobind
class CardValueStamp extends Component {
  render() {
    return (
      <Card>
        <div className="card-inner">
          <div className="card-ribbon-wrap">
            <Label className="ribbon2">Stamp</Label>
          </div>
          {/* 썸네일 */}
          <div className="thumbnail" />
          {/* //썸네일 */}
          <div className="title-area">
            <Label color="teal">mgmt</Label>
            <div className="header">Machine learning Complete Guide for Calculus - Deep 말줄임 말줄임 말줄임 말줄임 ning
              Complning Compl
            </div>
            <div className="icon-area">
              <Label className="onlytext">
                <Icon className="date" /><span>Completed date : 19. 01. 31</span>
              </Label>
            </div>
          </div>
          <div className="time-area">
            <div className="stamp">Stamp<strong>x2</strong></div>
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

export default CardValueStamp;

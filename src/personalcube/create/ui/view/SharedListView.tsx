import React from 'react';
import { Button, Card, Icon, Label, Rating } from 'semantic-ui-react';

class SharedListView extends React.Component {
  render() {
    return (
      <Card.Group className="box-cards">

        <Card>
          <div className="card-inner">
            {/* 썸네일 */}
            <div className="thumbnail" />
            {/* //썸네일 */}
            <div className="title-area">
              <Label color="purple">AI</Label>
              <div className="header">
                Machine learning Complete Guide for Calculus - Deep
              </div>
            </div>
            <div className="icon-area">
              <div className="li">
                <Label className="onlytext bold">
                  <Icon className="course" /><span>Course</span>
                </Label>
              </div>
              <div className="li">
                <Label className="onlytext bold">
                  <Icon className="time2" /><span>1h 30m</span>
                </Label>
                <Label className="onlytext bold card-stamp">
                  <Icon className="stamp" /><span>Stamp x4</span>
                </Label>
              </div>
              <div className="li">
                <Label className="onlytext">
                  <Icon className="complete" /><span>이수 3,300명</span>
                </Label>
              </div>
            </div>
            <div className="foot-area">
              <div className="fixed-rating">
                <Rating
                  defaultRating={3}
                  maxRating={5}
                  size="small"
                  disabled
                  className="rating-num"
                />
              </div>
            </div>
          </div>
          <div className="hover-content">
            <div className="title-area">
              <Label color="purple">AI</Label>
              <div className="header">
                Machine learning Complete Guide for Calculus - Deep
              </div>
            </div>
            <p className="text-area">
              This is a template for a simple marketing or informational website. It
              includes a large callout called a jumbo Tron and three
            </p>
            <div className="btn-area">
              <Button icon className="icon-line">
                <Icon className="add-list icon" />
                <span className="blind">Go to my learning</span>
              </Button>
              <Button className="fix bg">상세보기</Button>
            </div>
          </div>
        </Card>
      </Card.Group>

    );
  }
}

export default SharedListView;

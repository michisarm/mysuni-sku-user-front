
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import {
  Icon, Button, Label, Card,
} from 'semantic-ui-react';


interface Props {

}

interface States {
  isHovered : boolean
}

@reactAutobind
class CardValueRequired extends React.Component<Props, States> {

  state = {
    isHovered: false,
  };

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
            <Label color="blue">Leadership</Label>
            <div className="header">Affiliate Marketing Masterclass: Newbie to Advanced
                            Bootcamp
            </div>
          </div>
          <div className="icon-area">
            <div className="li">
              <Label className="onlytext bold">
                <Icon className="experiential" /><span>Experiential</span>
              </Label>
            </div>
            <div className="li">
              <Label className="onlytext bold">
                <Icon className="time2" /><span>1h 30m</span>
              </Label>
            </div>
            <div className="li">
              <Label className="onlytext">
                <Icon className="complete" /><span>이수 3,300명</span>
              </Label>
            </div>
          </div>
          <div className="foot-area">
            <Label className="onlytext bold">
              <Icon className="state" /><span>In progress</span>
            </Label>
            <div className="study-date">2019.10.10 학습 시작</div>
          </div>
        </div>

        <div className="hover-content">
          <div className="title-area">
            <Label color="blue">Leadership</Label>
            <div className="header">Machine learning Complete Guide for Calculus - Deep
            </div>
          </div>
          <p className="text-area">
                        This is a template for a simple marketing or informational website. It includes
                        a large callout called a jumbo Tron and three
          </p>
          <div className="btn-area">
            <Button icon className="icon-line"><Icon className="add-list" /></Button>
            <Button className="fix bg">View Details</Button>
          </div>
        </div>
      </Card>
    );
  }
}


export default CardValueRequired;

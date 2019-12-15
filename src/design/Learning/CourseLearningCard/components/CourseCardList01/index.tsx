import React, { Component, createRef } from 'react';
import {
  Segment, Accordion,
  Sticky, Icon, Button, Menu, Label, Card,
} from 'semantic-ui-react';
import DefaultClosedCourseCard from '../DefaultClosedCourseCard';

interface Props {

}

interface States {
  activeIndex : number
}

class CourseCardList01 extends React.Component<Props, States> {
  constructor(props:Props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleClick(e:any, titleProps:any) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <Accordion className="card-box first">

        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >

          {/* 썸네일 */}
          <div className="thumbnail">
            {/* 썸네일 이미지 위치 */}
          </div>
          <div className="title-area">
            <Label color="blue">Leadership</Label>
            <div className="header">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향</div>
            <div className="deatil">
              <div className="item">
                <Label className="onlytext">
                  <Icon className="video2" /><span>Video</span>
                </Label>
                <span className="channel">Leading Myself</span>
              </div>
              <div className="item">
                <Label className="onlytext">
                  <Icon className="date" /><span>Creation date : 2019. 12. 31</span>
                  <span className="ml17">Study start date, end date : 2019. 12. 31 20:30  ~  2020. 02. 20 09:00</span>
                </Label>
              </div>
            </div>
          </div>
          <div className="btn-area">
            <Button className="fix line">Go to this activity</Button>
          </div>
          {/* 카드열림버튼 */}
          <Button icon className="img-icon fn-more-toggle card-open">
            <Icon className="arrow-down" />
          </Button>
          {/* 카드닫힘버튼 */}
          <Button icon className="img-icon fn-more-toggle card-close">
            <Icon className="arrow-up" />
          </Button>



          <div className="commu-list-item">
            {/* 썸네일 */}
            <div className="thumbnail">
              <div>
                <Icon className="thumb60-1" />
              </div>
            </div>
            {/* //썸네일 */}
            <div className="title-area">
              <Label color="blue">Leadership</Label>
              <div className="header ellipsis">HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략
                                방향HR - Agile HR Fundamentals 회사의 비전달성을 위한 HR전략 방향
              </div>
              <div className="deatil">
                <span>새로운 글: 5</span>
                <span>멤버 : 1,427</span>
              </div>
            </div>
            <div className="btn-area">
              <Button className="fix line">View Details</Button>
            </div>
            <div className="icon-area">
              <Icon className="dropdown" />
            </div>
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <DefaultClosedCourseCard />



          <div className="new-item">
            <a className="title-area">
              <span className="ellipsis">강의 사이트 디자인 해보았습니다. 어떤 가요?  평가 부탁드립니다. 잘 만들었는지강의 사이트 디자인 해보았습니다. 어떤 가요?  평가 부탁드립니다. 잘 만들었는지강의 사이트 디자인 해보았습니다. 어떤 가요?  평가 부탁드립니다. 잘 만들었는지강의 사이트 디자인 해보았습니다. 어떤 가요?  평가 부탁드립니다. 잘 만들었는지</span>
              <span className="rep-num">[<strong>3</strong>]</span>
            </a>
            <div className="date">2020.01.15</div>
          </div>
          <div className="new-item">
            <a className="title-area">
              <span className="ellipsis">강의 사이트 디자인 해보았습니다. 어떤 가요?  평가 부탁드립니다. 잘 만들었는지강의 사이트 디자인 해보았습니다. 어떤 가요?  평가 부탁드립니다. 잘 만들었는지강의 사이트 디자인 해보았습니다. 어떤 가요?  평가 부탁드립니다. 잘 만들었는지</span>
            </a>
            <div className="date">2020.01.15</div>
          </div>
          <div className="new-item">
            <a className="title-area">
              <span className="ellipsis">강의 사이트 디자인 해보았습니다. 어떤 가요?  평가 부탁드립니다. 잘 만들었는지</span>
            </a>
            <div className="date">2020.01.15</div>
          </div>
        </Accordion.Content>
      </Accordion>

    );
  }
}


export default CourseCardList01;

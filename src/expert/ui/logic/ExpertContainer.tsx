import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps } from 'react-router-dom';
import { Icon, Image, Label, Menu, Segment, Sticky } from 'semantic-ui-react';
import { InstructorService } from '../../index';

interface Props extends RouteComponentProps {
  instructorService :InstructorService
}

@inject('instructorService')
@observer
@reactAutobind
class ExpertContainer extends React.Component<Props> {
  state = { activeItem: 'Introduce' };

  componentDidMount() {
    const { instructorService } = this.props;
    if (instructorService) instructorService.findInstructor();
  }

  handleItemClick = (e: any, { name } : any) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { instructor } = this.props.instructorService || {} as InstructorService;
    const result = instructor.result;
    return (
      <section className="content mylearning">
        <div className="main-info-area">
          <div className="progress-info-wrap">
            <div className="cell">
              <div className="cell-inner">
                <div className="profile">
                  <div className="pic">
                    <Image src="/images/all/profile-56-px.png" alt="프로필사진 임시이미지" />
                  </div>
                </div>
                <div className="text-info">
                  <div className="name">
                    {result.memberSummary.name}
                  </div>
                  <div className="part">
                    <span>{result.memberSummary.department}</span><span>{result.internal ? '사내강사' : '사외강사'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="cell">
              <div className="cell-inner">
                <div className="expert-info">
                  <Label className="onlytext">
                    <Icon className="college16" /><span>전문분야</span>
                  </Label>
                  <span className="value1">
                    <span>{result.channel.college.name}/ {result.channel.channel.name}</span>
                    <a href="#">{result.memberSummary.email}</a>
                  </span>
                </div>
                <div className="expert-info">
                  <Label className="onlytext">
                    <Icon className="class16" /><span>참여한 강의</span>
                  </Label>
                  <span className="value2">
                    <strong>{result.lectureCount}</strong><span>개</span>
                  </span>
                </div>
                <div className="expert-info">
                  <Label className="onlytext">
                    <Icon className="total-time" /><span>총 강의시간</span>
                  </Label>
                  <span className="value3">
                    <strong>{result.lectureHour}</strong><span>h</span>
                    <strong className="min">00</strong><span>m</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Sticky className="tab-menu offset0">
            <div className="cont-inner">
              <Menu className="sku">
                <Menu.Item
                  name="Introduce"
                  active={activeItem === 'Introduce'}
                  onClick={this.handleItemClick}
                  //as={Link} to=""
                >
                  Introduce
                </Menu.Item>
                <Menu.Item
                  name="Lecture"
                  active={activeItem === 'Lecture'}
                  onClick={this.handleItemClick}
                  //as={Link} to=""
                >
                  Lecture<span className="count">+24</span>
                </Menu.Item>
              </Menu>
            </div>
          </Sticky>
          <Segment className="full">
            <div className="expert-cont">
              <div className="text-info">
                <div className="text02">{result.career}</div>
                <div className="dash" />
                <div className="text01">강사소개</div>
                <div className="text02">{result.memberSummary.introduction}</div>
              </div>
            </div>
          </Segment>
        </div>
      </section>
    );
  }

}

export default ExpertContainer;

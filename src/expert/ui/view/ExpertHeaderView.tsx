import * as React from 'react';
import { Icon, Image, Label } from 'semantic-ui-react';
import { InstructorModel } from '../../model/InstructorModel';

interface Props {
  result: InstructorModel
}

class ExpertHeaderView extends React.Component<Props> {
  render() {
    const { result } = this.props;
    return (
      <div className="main-info-area">
        <div className="progress-info-wrap">
          <div className="cell">
            <div className="cell-inner">
              <div className="profile">
                <div className="pic">
                  <Image src={`${process.env.PUBLIC_URL}/images/all/profile-56-px.png`} alt="기본 프로필사진" />
                </div>
              </div>
              <div className="text-info">
                <div className="name">
                  {result.memberSummary.name}
                </div>
                <div className="part">
                  <span>{result.memberSummary.department}</span>
                  <span>{result.internal ? '사내강사' : '사외강사'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cell">
            <div className="cell-inner">

              {(result.channel.college.name || result.channel.channel.name || result.memberSummary.email) && (
                <div className="expert-info">
                  <Label className="onlytext">
                    <Icon className="college16" /><span>전문분야</span>
                  </Label>

                  <span className="value1">
                    <span>{result.channel.college.name}/ {result.channel.channel.name}</span>
                    <a href="#">{result.memberSummary.email}</a>
                  </span>
                </div>
              )}

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
    );
  }
}

export default ExpertHeaderView;

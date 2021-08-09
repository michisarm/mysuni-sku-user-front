import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { InstructorModel } from '../../model/InstructorModel';
import Image from '../../../shared/components/Image';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { InstructorWithIdentity } from 'expert/model/InstructorWithIdentity';

interface Props {
  instructorWithIdentity: InstructorWithIdentity | null;
}

@observer
@reactAutobind
class InstructorContentHeaderView extends React.Component<Props> {
  //
  render() {
    //
    const { instructorWithIdentity } = this.props;

    // 김민준 - 강사관리 소속회사 확인
    return (
      <div className="main-info-area">
        <div className="progress-info-wrap">
          <div className="cell">
            <div className="cell-inner">
              <div className="profile">
                <div className="pic">
                  <Image
                    src={
                      instructorWithIdentity?.instructor.photoFilePath ||
                      profileImg
                    }
                    alt="기본 프로필사진"
                  />
                </div>
              </div>
              <div className="text-info">
                <div className="name">
                  {parsePolyglotString(instructorWithIdentity?.instructor.name)}
                </div>
                <div className="part">
                  <span>
                    {instructorWithIdentity?.instructor.internal
                      ? parsePolyglotString(
                          instructorWithIdentity?.userIdentity.departmentName
                        )
                      : parsePolyglotString(
                          instructorWithIdentity?.instructor.organization
                        )}
                  </span>
                  <span>
                    {instructorWithIdentity?.instructor.internal
                      ? '사내강사'
                      : '사외강사'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="cell">
            <div className="cell-inner">
              {(instructor.category.college.name || memberSummary.email) && (
                <div className="expert-info">
                  <Label className="onlytext">
                    <Icon className="college16" /><span>전문분야</span>
                  </Label>

                  <span className="value1">
                    <span>{instructor.category.college.name}</span>
                    <span>{instructor.category.channel.name}</span>
                    {/* <a href="#">{memberSummary.email}</a> * /}
                  </span>
                </div>
              )}

              <div className="expert-info">
                <Label className="onlytext">
                  <Icon className="class16" /><span>참여한 강의</span>
                </Label>
                <span className="value2">
                  <strong>{instructor.lectureCount}</strong><span>개</span>
                </span>
              </div>
              <div className="expert-info">
                <Label className="onlytext">
                  <Icon className="total-time" /><span>총 강의시간</span>
                </Label>
                <span className="value3">
                  <strong>{instructor.lectureHour}</strong><span>h</span>
                  <strong className="min">00</strong><span>m</span>
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default InstructorContentHeaderView;

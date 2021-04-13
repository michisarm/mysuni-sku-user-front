import React from 'react';
import { timeToHourMinutePaddingFormat } from '../../../shared/helper/dateTimeHelper';
import { MenuControlAuthModel } from '../../../approval/company/model/MenuControlAuthModel';


interface MyCompanyCollegeTimeViewProps {
  myCompanyLearningTime: number;
  aplTime: number;
  menuControlAuth: MenuControlAuthModel;
}

export default function MyCompanyCollegeTimeView({
  myCompanyLearningTime,
  aplTime,
  menuControlAuth,
}: MyCompanyCollegeTimeViewProps) {

  return (
    <ul className="bullet-list2">
      <li>
        <span className="name" style={{ width: 230 }}>
          관계사 학습시간
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myCompanyLearningTime)}
        </span>
      </li>
      {menuControlAuth.hasMenuAuth() && (
        <li>
          <span className="name">개인 학습시간</span>
          <span className="time">
            {timeToHourMinutePaddingFormat(aplTime)}
          </span>
        </li>
      )}
    </ul>
  );
}
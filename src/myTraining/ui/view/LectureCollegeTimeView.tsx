import React from 'react';
import { timeToHourMinutePaddingFormat } from '../../../shared/helper/dateTimeHelper';
import { LectureTimeSummary, getCollegeTime } from '../../../personalcube/personalcube/model/LectureTimeSummary';


interface LectureCollegeTimeViewProps {
  lectureTimeSummary?: LectureTimeSummary;
}

export default function LectureCollegeTimeView({
  lectureTimeSummary,
}: LectureCollegeTimeViewProps) {
  const collegeTime = getCollegeTime(lectureTimeSummary);

  return (
    <ul className="bullet-list2">
      <li>
        <span className="name b1" style={{ width: 230 }}>
          AI
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.aiCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b2">DT</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.dtCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b3">행복</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.happyCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b4">SV</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.svCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b5">혁신디자인</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.designCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b6">Global</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.globalCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b7">Leadership</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.leadershipCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b8">Management</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.managementCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b9">미래반도체</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.semiconductorCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b13">Environment</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.energySolutionCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b14">BM Design & Storytelling</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.bmDesignerCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b10">SK아카데미</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.skAcademyCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b11">SK경영</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.skManagementCollegeTime
          )}
        </span>
      </li>
      <li>
        <span className="name b12">Life Style</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(
            collegeTime.lifeStyleCollegeTime
          )}
        </span>
      </li>
    </ul>
  );
}

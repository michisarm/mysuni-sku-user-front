import React from 'react';
import { timeToHourMinutePaddingFormat } from '../../../shared/helper/dateTimeHelper';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';

interface MySuniCollegeTimeViewProps {
  myLearningSummary: MyLearningSummaryModel
}

export default function MySuniCollegeTimeView({
  myLearningSummary,
}: MySuniCollegeTimeViewProps) {

  return (
    <ul className="bullet-list2">
      <li>
        <span className="name b1" style={{ width: 230 }}>
          AI
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.aiCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b2">DT</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.dtCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b3">행복</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.happyCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b4">SV</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.svCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b5">혁신디자인</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.designCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b6">Global</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.globalCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b7">Leadership</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.leadershipCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b8">Management</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.managementCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b9">미래반도체</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.semiconductorCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b13">Environment</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.energySolutionCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b14">BM Design & Storytelling</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.bmDesignerCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b10">SK아카데미</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.skAcademyCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b11">SK경영</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.skManagementCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b12">Life Style</span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.lifeStyleCollegeTime)}
        </span>
      </li>
    </ul>
  );
}

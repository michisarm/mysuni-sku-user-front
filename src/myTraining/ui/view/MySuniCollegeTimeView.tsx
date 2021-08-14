import React from 'react';
import { timeToHourMinutePaddingFormat } from '../../../shared/helper/dateTimeHelper';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

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
          <PolyglotText defaultString="AI" id="home-학이시-ai" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.aiCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b2">
          <PolyglotText defaultString="DT" id="home-학이시-dt" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.dtCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b3">
          <PolyglotText defaultString="행복" id="home-학이시-행복" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.happyCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b4">
          <PolyglotText defaultString="SV" id="home-학이시-sv" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.svCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b5">
          <PolyglotText defaultString="혁신디자인" id="home-학이시-혁디" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.designCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b6">
          <PolyglotText defaultString="Global" id="home-학이시-gb" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.globalCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b7">
          <PolyglotText defaultString="Leadership" id="home-학이시-리더" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.leadershipCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b8">
          <PolyglotText defaultString="Management" id="home-학이시-mgmt" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.managementCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b9">
          <PolyglotText defaultString="미래반도체" id="home-학이시-반도체" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.semiconductorCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b13">
          <PolyglotText defaultString="Environment" id="home-학이시-에솔" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.energySolutionCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b14">
          <PolyglotText defaultString="BM Design & Storytelling" id="home-학이시-bm" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.bmDesignerCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b10">
          <PolyglotText defaultString="SK아카데미" id="home-학이시-sa" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.skAcademyCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b11">
          <PolyglotText defaultString="SK경영" id="home-학이시-sk경영" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.skManagementCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b12">
          <PolyglotText defaultString="Life Style" id="home-학이시-ls" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(myLearningSummary.lifeStyleCollegeTime)}
        </span>
      </li>
    </ul>
  );
}

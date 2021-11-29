import React from 'react';
import { timeToHourMinutePaddingFormat } from '../../../shared/helper/dateTimeHelper';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import {
  getCollegeTime,
  InstructorLearningTimeSummary,
} from 'personalcube/personalcube/model/InstructorLearningTimeSummary';

interface InstructorLearningTimeViewProps {
  instructorLearningTimeSummary?: InstructorLearningTimeSummary;
}

export default function InstructorLearningTimeView({
  instructorLearningTimeSummary,
}: InstructorLearningTimeViewProps) {
  const collegeTime = getCollegeTime(instructorLearningTimeSummary);

  return (
    <ul className="bullet-list2">
      <li>
        <span className="name b1" style={{ width: 230 }}>
          <PolyglotText defaultString="AI" id="home-학이시-ai강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.aiCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b2">
          <PolyglotText defaultString="DT" id="home-학이시-dt강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.dtCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b3">
          <PolyglotText defaultString="행복" id="home-학이시-행복강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.happyCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b4">
          <PolyglotText defaultString="SV" id="home-학이시-sv강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.svCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b5">
          <PolyglotText defaultString="혁신디자인" id="home-학이시-혁디강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.designCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b6">
          <PolyglotText defaultString="Global" id="home-학이시-gb강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.globalCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b7">
          <PolyglotText defaultString="Leadership" id="home-학이시-리더강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.leadershipCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b8">
          <PolyglotText defaultString="Management" id="home-학이시-mgmt강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.managementCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b9">
          <PolyglotText
            defaultString="미래반도체"
            id="home-학이시-반도체강시"
          />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.semiconductorCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b10">
          <PolyglotText defaultString="Environment" id="home-학이시-에솔강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.energySolutionCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b11">
          <PolyglotText
            defaultString="BM Design & Storytelling"
            id="home-학이시-bm강시"
          />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.bmDesignerCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b12">
          <PolyglotText defaultString="SK아카데미" id="home-학이시-sa강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.skAcademyCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b13">
          <PolyglotText defaultString="SK경영" id="home-학이시-sk경영강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.skManagementCollegeTime)}
        </span>
      </li>
      <li>
        <span className="name b14">
          <PolyglotText defaultString="Life Style" id="home-학이시-ls강시" />
        </span>
        <span className="time">
          {timeToHourMinutePaddingFormat(collegeTime.lifeStyleCollegeTime)}
        </span>
      </li>
    </ul>
  );
}

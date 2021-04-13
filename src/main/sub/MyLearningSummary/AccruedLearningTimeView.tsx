import React from 'react';
import { timeToHourMinute } from '../../../shared/helper/dateTimeHelper';


interface AccruedLearningTimeViewProps {
  accruedLearningTime: number;
}

export default function AccruedLearningTimeView({
  accruedLearningTime,
}: AccruedLearningTimeViewProps) {
  const { hour, minute } = timeToHourMinute(accruedLearningTime);

  const renderLearningTime = () => {
    if(hour < 1 && minute < 1) {
      return (
        <>
            <span className="big2">00</span>
            <span className="small2">h</span> <span className="big">00</span>
            <span className="small2">m</span>
        </>
      );
    } else if(hour < 1) {
      return (
        <>
          <span className="big2">{minute}</span>
          <span className="small2">m</span>
        </>
      )
    } else if(minute < 1) {
      return (
        <>
          <span className="big2">{hour}</span>
          <span className="small2">h</span>
        </>
      )
    } else {
      return (
        <>
          <span className="big2">{hour}</span>
          <span className="small2">h</span>{' '}
          <span className="big2">{minute}</span>
          <span className="small2">m</span>
        </>
      )
    }
  }

  return renderLearningTime();
}
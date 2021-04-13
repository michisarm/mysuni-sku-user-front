import React from 'react';
import { timeToHourMinute } from '../../../shared/helper/dateTimeHelper';


interface LearningTimeViewProps {
  learningTime: number;
}

export default function LearningTimeView({
  learningTime
}: LearningTimeViewProps) {
  const { hour, minute } = timeToHourMinute(learningTime);

  const renderLearningTime = () => {
    if(hour < 1 && minute < 1) {
      return (
        <>
          00
          <em>h</em> <em>00</em>
          <em>m</em>
        </>
      );
    } else if(hour < 1) {
      return (
        <>
          {minute}
          <em>m</em>
        </>
      )
    } else if(minute < 1) {
      return (
        <>
          {hour}
          <em>h</em>
        </>
      )
    } else {
      return (
        <>
          {hour}
          <em>h</em>{' '}
          {minute}
          <em>m</em>
        </>
      )
    }
  }

  return renderLearningTime();
}
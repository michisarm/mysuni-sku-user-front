import React from 'react';
import { timeToHourMinute } from '../../../shared/helper/dateTimeHelper';

interface LearningTimeViewProps {
  learningTime: number;
}

export default function LearningTimeView({
  learningTime,
}: LearningTimeViewProps) {
  const { hour, minute } = timeToHourMinute(learningTime);
  const renderLearningTime = () => {
    if (hour < 1 && minute < 1) {
      return (
        <>
          <strong>00</strong>
          <em>h</em> <strong className="personal_pop_sub">00</strong>
          <em>m</em>
        </>
      );
    } else if (hour < 1) {
      return (
        <>
          <strong>{minute}</strong>
          <em>m</em>
        </>
      );
    } else if (minute < 1) {
      return (
        <>
          {hour}
          <em>h</em>
        </>
      );
    } else {
      return (
        <>
          <strong>{hour}</strong>
          <em>h</em>&nbsp;<strong className="personal_pop_sub">{minute}</strong>
          <em>m</em>
        </>
      );
    }
  };

  return renderLearningTime();
}

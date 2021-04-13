import React from 'react';
import { convertProgressValue } from './convertProgressValue';


interface BadgeLearningSummaryViewProps {
  challengingCount: number;
  issuedCount: number;
}

export default function BadgeLearningSummaryView({
  challengingCount,
  issuedCount,
}: BadgeLearningSummaryViewProps) {
  const badgeValue = Math.round((issuedCount / (challengingCount + issuedCount)) * 100);
  
  return (
    <div className="main-gauge">
      <span className="gauge-badge">Badge</span>
      <div className={`gauge-content gauge-bg${badgeValue ? convertProgressValue(badgeValue) : 5}`}>
        <div className="gauge-content-box">
          <p className="top-num">{issuedCount}</p>
          <span className="bot-num">도전중 {challengingCount}</span>
        </div>
      </div>
    </div> 
  );
}
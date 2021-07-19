import React from 'react';
import { convertProgressValue } from './convertProgressValue';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';


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
      <span className="gauge-badge">
        <PolyglotText defaultString="Badge" id="home-Summary-Badge" />
      </span>
      <div className={`gauge-content gauge-bg${badgeValue ? convertProgressValue(badgeValue) : 5}`}>
        <div className="gauge-content-box">
          <p className="top-num">{issuedCount}</p>
          <span className="bot-num">
            <PolyglotText defaultString="도전중" id="home-Summary-Badge도전중" /> {challengingCount}
          </span>
        </div>
      </div>
    </div>
  );
}

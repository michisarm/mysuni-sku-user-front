import React from 'react';
import { convertProgressValue } from './convertProgressValue';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { Popup } from 'semantic-ui-react';

interface BadgeLearningSummaryViewProps {
  challengingCount: number;
  issuedCount: number;
}

export default function BadgeLearningSummaryView({
  challengingCount,
  issuedCount,
}: BadgeLearningSummaryViewProps) {
  const badgeValue = Math.round(
    (issuedCount / (challengingCount + issuedCount)) * 100
  );

  return (
    <div className="main-gauge">
      <PolyglotText defaultString="Badge" id="home-Summary-Badge" />

      <div
        className={`gauge-content gauge-bg${
          badgeValue ? convertProgressValue(badgeValue) : 5
        }`}
      >
        <div className="gauge-content-box">
          <p>{issuedCount}</p>
        </div>
      </div>

      {/*<Popup*/}
      {/*  trigger={*/}
      {/*    <div*/}
      {/*      className={`gauge-content gauge-bg${*/}
      {/*        badgeValue ? convertProgressValue(badgeValue) : 5*/}
      {/*      }`}*/}
      {/*    >*/}
      {/*      <div className="gauge-content-box">*/}
      {/*        <p>{issuedCount}</p>*/}
      {/*        <span>{challengingCount}</span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*  style={style}*/}
      {/*  position="bottom center"*/}
      {/*  wide*/}
      {/*>*/}
      {/*  <span className="personal_pop_tit">*/}
      {/*    <PolyglotText defaultString="도전중" id="home-Summary-Badge도전중" />*/}
      {/*    {' Badge '}*/}
      {/*  </span>*/}
      {/*  <span>*/}
      {/*    <strong>{challengingCount}</strong>*/}
      {/*    <PolyglotText defaultString="개" id="" />*/}
      {/*  </span>*/}
      {/*</Popup>*/}
    </div>
  );
}

const style = {
  borderRadius: '0.375rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  border: '1px solid #aaaaaa',
  color: '#4c4c4c',
};

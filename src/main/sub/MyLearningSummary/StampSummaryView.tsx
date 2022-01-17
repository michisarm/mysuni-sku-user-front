import React from 'react';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import { convertProgressValue } from './convertProgressValue';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

interface StampSummaryViewProps {
  totalStampCount: number;
  stampCount: number;
}

export default function StampSummaryView({
  totalStampCount,
  stampCount,
}: StampSummaryViewProps) {
  const complateStampValue = Math.round((stampCount / totalStampCount) * 100);

  return (
    <div className="main-gauge">
      <span className="gauge-tit">Stamp</span>
      {/*dangerouslySetInnerHTML={{*/}
      {/*  __html: getPolyglotText(*/}
      {/*    `{year}년 완료학습`,*/}
      {/*    'home-Summary-완료학습학습완료',*/}
      {/*    {*/}
      {/*      year: CURRENT_YEAR.toString(),*/}
      {/*    }*/}
      {/*  ),*/}
      {/*}}*/}

      <Popup
        trigger={
          <div
            className={`gauge-content gauge-stamp${
              complateStampValue ? convertProgressValue(complateStampValue) : 5
            }`}
          >
            <div className="gauge-content-box">
              <p>{stampCount}</p>
              <span>{totalStampCount}</span>
            </div>
          </div>
        }
        style={style}
        position="bottom center"
        wide
      >
        <span className="personal_pop_tit">Stamp </span>
        <span>
          <strong>{totalStampCount}</strong>
        </span>
      </Popup>
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

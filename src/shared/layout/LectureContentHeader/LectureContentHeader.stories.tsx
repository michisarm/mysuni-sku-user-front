
import React from 'react';

import { LectureContentHeader } from 'shared';
import { CubeType } from 'personalcube/personalcube';
import { DatePeriod } from '@nara.platform/accent';


export default {
  title: 'components|layout/LectureContentHeader',
  component: LectureContentHeader,
};


export const Basic = () =>
  //
  (
    <LectureContentHeader>
      <LectureContentHeader.ThumbnailCell
        image={`${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
      />
      <LectureContentHeader.TitleCell
        label={{ color: 'blue', text: 'Leadership' }}
        title="Open Source를 활용한 Big Data 기반 플랫폼을 이용한 데이터 분석"
        type={CubeType.ClassRoomLecture}
        creationTime={12123123}
        learningPeriod={{ startDate: '2019.01.01', endDate: '2020.01.01' } as DatePeriod}
      />
      <LectureContentHeader.RightCell>
        <LectureContentHeader.StarRatingItem
          value={3}
          max={5}
        />
      </LectureContentHeader.RightCell>
    </LectureContentHeader>
  );
export const Stamp = () =>
  //
  (
    <LectureContentHeader>
      <LectureContentHeader.ThumbnailCell
        image={`${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
      />
      <LectureContentHeader.RightCell>
        <LectureContentHeader.StampItem
          value={10}
        />
        <LectureContentHeader.StarRatingItem
          value={3}
          max={5}
        />
      </LectureContentHeader.RightCell>
    </LectureContentHeader>
  );


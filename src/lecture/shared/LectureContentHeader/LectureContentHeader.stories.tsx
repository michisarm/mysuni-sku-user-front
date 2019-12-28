
import React from 'react';

import { CubeType } from 'personalcube/personalcube';
import { DatePeriod } from '@nara.platform/accent';
import { CategoryModel, IdName } from 'shared';
import LectureContentHeader from '../LectureContentHeader';


export default {
  title: 'components|layout/LectureContentHeader',
  component: LectureContentHeader,
};


export const Basic = () => {
  //
  const mockCategory = new CategoryModel();
  const category = new CategoryModel({
    ...mockCategory,
    college: new IdName({ id: 'Leadership', name: 'Leadership' }),
  });

  return (
    <LectureContentHeader>
      <LectureContentHeader.ThumbnailCell
        image={`${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
      />
      <LectureContentHeader.TitleCell
        category={category}
        title="Open Source를 활용한 Big Data 기반 플랫폼을 이용한 데이터 분석"
        type={CubeType.ClassRoomLecture}
        typeName=""
        creationTime={1576664937754}
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
};

export const CategoryAndLabel = () => {
  //
  const mockCategory = new CategoryModel();
  const category = new CategoryModel({
    ...mockCategory,
    college: new IdName({ id: 'Leadership', name: 'Leadership' }),
    channel: new IdName({ id: 'Leadership Specialist', name: 'Leadership Specialist' }),
  });

  const label = { color: 'purple', text: 'AI' } as any;

  return (
    <>
      <LectureContentHeader>
        <LectureContentHeader.TitleCell
          category={category}
          title="Open Source를 활용한 Big Data 기반 플랫폼을 이용한 데이터 분석"
          typeName=""
          type={CubeType.ClassRoomLecture}
          creationTime={1576664937754}
        />
      </LectureContentHeader>
      <br />
      <LectureContentHeader>
        <LectureContentHeader.TitleCell
          label={label}
          title="Open Source를 활용한 Big Data 기반 플랫폼을 이용한 데이터 분석"
          typeName=""
          type={CubeType.ClassRoomLecture}
          creationTime={1576664937754}
        />
      </LectureContentHeader>
    </>
  );
};


export const Stamp = () => (
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


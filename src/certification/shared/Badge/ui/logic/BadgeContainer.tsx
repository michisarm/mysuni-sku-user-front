
import React, {FunctionComponent} from 'react';

import {BadgeContentWrapper, CollegeIcon, MainCategory, Title} from '../view/BadgeView';


interface BadgeProps {
  badgeLevel: string,
  iconUrl: string,
  mainCategory: string,
  name: string,
  badgeStyle: string,  // List, Detail
  badgeSize: string,  // Large, Small
}

const BadgeContainer: FunctionComponent<BadgeProps> = (Props) => {
  //
  const { badgeLevel, iconUrl, mainCategory, name, badgeStyle, badgeSize } = Props;


  return (
    // 스타일 지정: badge level + badge type
    <BadgeContentWrapper
      badgeLevel={badgeLevel.toLowerCase()}
      badgeStyle={badgeStyle}
      badgeSize={badgeSize}
    >
      {/*사용자 정의 아이콘 or College Icon*/}
      <CollegeIcon iconUrl={iconUrl} />

      {/*카테고리명*/}
      <MainCategory mainCategory={mainCategory} />

      {/*뱃지명*/}
      <Title name={name} />

    </BadgeContentWrapper>
  );
};

export default BadgeContainer;

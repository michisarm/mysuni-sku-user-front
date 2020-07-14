
import React, {FunctionComponent} from 'react';
import {Image} from 'semantic-ui-react';

import {BadgeContentWrapper } from '../view/BadgeView';

const blankImage = '/images/all/icon-chanel-64-px.svg';


interface BadgeProps {
  badgeLevel: string,
  iconUrl: string,
  mainCategory: string,
  name: string,
}

const BadgeContainer: FunctionComponent<BadgeProps> = (Props) => {
  //
  const { badgeLevel, iconUrl, mainCategory, name } = Props;


  return (
    // 스타일 지정: badge level + badge type
    <BadgeContentWrapper
      badgeLevel={badgeLevel.toLowerCase()}
      badgeSize="s280"
    >
      <span className="college">
        <Image src={iconUrl || blankImage} alt="College 아이콘 또는 사용자 지정 아이콘"/>
      </span>
      <span className="part">{mainCategory}</span>
      <span className="title">{name}</span>
    </BadgeContentWrapper>
  );
};

export default BadgeContainer;

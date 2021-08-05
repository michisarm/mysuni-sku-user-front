/* eslint-disable */
import React from 'react';
import { BadgeLevel } from '../../model/BadgeLevel';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import { BadgeContentWrapper } from './BadgeContentWrapper';
import Image from '../../../shared/components/Image';
import BadgeStarSvg from './BadgeStarSvg';
import { useRequestBadgeWIthCategory } from '../../service/useRequestBadgeWIthCategory';
import { parsePolyglotString, PolyglotString } from 'shared/viewmodel/PolyglotString';

interface BadgeViewProps {
  id: string;
  name: PolyglotString;
  level: BadgeLevel;
  iconUrl: string;
  categoryId: string;
  badgeStyle: BadgeStyle;
  badgeSize: BadgeSize;
  badgeColor?: string;
  backgroundImagePath?: string;
  topImagePath?: string;
}

export default function BadgeView({
  id,
  name,
  level,
  iconUrl,
  categoryId,
  badgeStyle,
  badgeSize,
  badgeColor,
  backgroundImagePath,
  topImagePath,
}: BadgeViewProps) {
  if (
    badgeColor === undefined ||
    backgroundImagePath === undefined ||
    topImagePath === undefined
  ) {
    const badgeCategory = useRequestBadgeWIthCategory(id);
    
    badgeColor = badgeCategory?.themeColor || '#ea012c';
    backgroundImagePath = badgeCategory?.backgroundImagePath;
    topImagePath = badgeCategory?.topImagePath;
  }

  const starStyle = getStarStyle(level);
  const emHtml = getEmHtml(level, badgeColor);

  return (
    <BadgeContentWrapper
      id={id}
      categoryId={categoryId}
      badgeStyle={badgeStyle}
      backgroundImagePath={backgroundImagePath || ''}
    >
      <span className="issuing">
        <Image src={topImagePath || ''} alt="로고" />
      </span>
      <span className="college">
        <Image src={iconUrl} alt="아이콘" />
      </span>
      <span className="title" style={{ margin: 0 }}>
        <span className="cell" >
          <span style={{ display: 'block' }}>{parsePolyglotString(name)}</span>
        </span>
      </span>
      <p className={`star-score ${starStyle}`}>{emHtml}</p>
    </BadgeContentWrapper>
  );
}

const getStarStyle = (level: BadgeLevel) => {
  switch (level) {
    case 'Level1':
      return 'star1';
    case 'Level2':
      return 'star2';
    case 'Level3':
      return 'star3';
  }

  return '';
};

const getEmHtml = (level: BadgeLevel, badgeColor: string) => {
  switch (level) {
    case 'Level1':
      return (
        <>
          <em>
            <BadgeStarSvg color={badgeColor} />
          </em>
        </>
      );
    case 'Level2':
      return (
        <>
          <em>
            <BadgeStarSvg color={badgeColor} />
          </em>
          <em>
            <BadgeStarSvg color={badgeColor} />
          </em>
        </>
      );
    case 'Level3':
      return (
        <>
          <em>
            <BadgeStarSvg color={badgeColor} />
          </em>
          <em>
            <BadgeStarSvg color={badgeColor} />
          </em>
          <em>
            <BadgeStarSvg color={badgeColor} />
          </em>
        </>
      );
  }

  return <></>;
};

/* eslint-disable */
import React from 'react';
import { BadgeLevel } from '../../model/BadgeLevel';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import { BadgeContentWrapper } from './BadgeContentWrapper';
import Image from '../../../shared/components/Image';
import BadgeStarSvg from './BadgeStarSvg';
import { useRequestBadgeWIthCategory } from '../../service/useRequestBadgeWIthCategory';

enum certiAdminCategoryIcon {
  //mySUNI = '/static/media/logo-badge.svg',
  mySUNI = '/static/media/logo-badgeN.png',
}

enum CategoryImageURL {
  BDGCAT_AIDT = '/static/media/icon-ai.png',
  BDGCAT_JOB = '/static/media/icon-happy.png',
  BDGCAT_BIZ = '/static/media/icon-biz.png',
  BDGCAT_HAPPY = '/static/media/icon-happy.png',
  BDGCAT_BM = '/static/media/icon-bmdesign.png',
}

interface BadgeViewProps {
  id: string;
  name: string;
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
    badgeColor = useRequestBadgeWIthCategory(id)?.themeColor || '#ea012c';
    backgroundImagePath = useRequestBadgeWIthCategory(id)?.backgroundImagePath;
    topImagePath = useRequestBadgeWIthCategory(id)?.topImagePath;
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
      <span className="title">
        <span className="cell">
          <span>{name}</span>
        </span>
      </span>
      <p className={`star-score ${starStyle}`}>{emHtml}</p>
    </BadgeContentWrapper>
  );
}

const getCertificationIconUrl = (): string => {
  // 직접 등록한 아이콘 우선 노출
  return certiAdminCategoryIcon.mySUNI;
};

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

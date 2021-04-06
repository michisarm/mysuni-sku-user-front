/* eslint-disable */
import React from 'react';
import { useHistory } from 'react-router';
import { getPublicUrl } from 'shared/helper/envHelper';
import { useScrollMove } from 'myTraining/useScrollMove';
import { BadgeLevel } from '../../model/BadgeLevel';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import { BadgeContentWrapper } from './BadgeContentWrapper';
import badgeRoutePaths from '../../routePaths';
import Image from '../../../shared/components/Image';

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
}

export default function BadgeView({
  id,
  name,
  level,
  iconUrl,
  categoryId,
  badgeStyle,
  badgeSize,
}: BadgeViewProps) {
  const history = useHistory();
  const { scrollSave } = useScrollMove();

  const onViewDetail = () => {
    scrollSave();
    history.push(badgeRoutePaths.badgeDetailPage(id));
  };

  // 인증주체(mySUNI, Subsidiary, Etc...) 아이콘
  // const getIconUrl = (
  //   certiAdminCategory: string,
  //   certiAdminSubcategory: string,
  //   iconUrl?: string
  // ) => {
  //   const language = 'kr';

  //   if (certiAdminCategory !== 'mySUNI') {
  //     // iconUrl 이 있는 경우 우선 노출
  //     if (iconUrl) {
  //       return domainPath + iconUrl;
  //     } else {
  //       const admin = certiAdminCategory === 'Third' ? 'pp' : 'sub';
  //       return `${getPublicUrl()}/static/media/badge/${admin}_${certiAdminSubcategory}_${language}.png`;
  //     }
  //   } else {
  //     return `${getPublicUrl()}${certiAdminCategoryIcon.mySUNI}`;
  //   }
  // };

  const certificationIconUrl = getCertificationIconUrl();
  const collegeIconUrl = getCollegeIconUrl(iconUrl, categoryId);
  const starStyle = getStarStyle(level);
  const emHtml = getEmHtml(level);

  return (
    <BadgeContentWrapper
      categoryId={categoryId}
      badgeStyle={badgeStyle}
      onViewDetail={onViewDetail}
    >
      <span className="issuing">
        <Image src={certificationIconUrl} alt=""/>
      </span>
      <span className="college">
        <img src={collegeIconUrl} alt="" />
      </span>
      <p className={`star-score ${starStyle}`}>{emHtml}</p>
      <span className="title">
        <span className="cell">
          <span>{name}</span>
        </span>
      </span>
    </BadgeContentWrapper>
  );
}

const getCertificationIconUrl = (): string => {
  // 직접 등록한 아이콘 우선 노출
  return certiAdminCategoryIcon.mySUNI;
};

const getCollegeIconUrl = (iconUrl: string, categoryId: string): string => {
  return iconUrl || CategoryImageURL[categoryId as keyof typeof CategoryImageURL];
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

const getEmHtml = (level: BadgeLevel) => {
  switch (level) {
    case 'Level1':
      return (
        <>
          <em />
        </>
      );
    case 'Level2':
      return (
        <>
          <em />
          <em />
        </>
      );
    case 'Level3':
      return (
        <>
          <em />
          <em />
          <em />
        </>
      );
  }

  return <></>;
};

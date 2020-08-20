import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { mobxHelper } from '@nara.platform/accent';
import { getPublicUrl } from 'shared/helper/envHelper';
import certificationRoutePaths from '../../../../routePaths';
import {
  BadgeContentWrapper,
  CertificationOrg,
  College,
  Title,
} from '../view/BadgeView';
import BadgeModel from '../../../../ui/model/BadgeModel';
import BadgeDetailModel from '../../../../ui/model/BadgeDetailModel';
import MyBadgeModel from '../../../../ui/model/MyBadgeModel';

enum certiAdminCategoryIcon {
  mySUNI = '/static/media/logo-badge.svg',
}

enum CategoryImageURL {
  BDGCAT_AIDT = '/static/media/icon-ai.png',
  BDGCAT_JOB = '/static/media/icon-common.png',
  BDGCAT_BIZ = '/static/media/icon-biz.png',
  BDGCAT_HAPPY = '/static/media/icon-happy.png',
  BDGCAT_BM = '/static/media/icon-bmdesign.png',
}

interface Props extends RouteComponentProps {
  badge: BadgeModel | MyBadgeModel | BadgeDetailModel;
  badgeStyle: string; // List, Detail
  badgeSize: string; // Large, Small
}

const BadgeContainer: FunctionComponent<Props> = Props => {
  //
  const { badge, badgeStyle, badgeSize, history } = Props;
  const {
    badgeId,
    difficultyLevel,
    iconUrl,
    mainCategoryName,
    name,
    certiAdminCategory,
    certiAdminSubcategory,
  } = badge;

  const domainPath =
    process.env.REACT_APP_ENVIRONMENT === undefined ||
    process.env.REACT_APP_ENVIRONMENT === 'server'
      ? window.location.protocol + '//' + window.location.host
      : process.env.REACT_APP_PUBLIC_URL;

  const onViewDetail = () => {
    history.push(certificationRoutePaths.badgeDetailPage(badgeId));
    window.scrollTo(0, 0);
  };

  // 인증주체(mySUNI, Subsidiary, Etc...) 아이콘
  const getCertiAdminIcon = (
    certiAdminCategory: string,
    certiAdminSubcategory: string,
    iconUrl: string
  ) => {
    const language = 'kr';

    if (certiAdminCategory !== 'mySUNI') {
      // iconUrl 이 있는 경우 우선 노출
      if (iconUrl) {
        return domainPath + iconUrl;
      } else {
        const admin = certiAdminCategory === 'Third' ? 'pp' : 'sub';
        return `${getPublicUrl()}/static/media/badge/${admin}_${certiAdminSubcategory}_${language}.png`;
      }
    } else {
      return `${getPublicUrl()}${certiAdminCategoryIcon.mySUNI}`;
    }
  };

  return (
    // 스타일 지정: badge level + badge type
    <BadgeContentWrapper
      onViewDetail={onViewDetail}
      badgeLevel={difficultyLevel}
      badgeStyle={badgeStyle}
      badgeSize={badgeSize}
    >
      {/*인증관리주체*/}
      {/*직접 등록한 아이콘 우선 노출*/}
      <CertificationOrg
        certiAdminCategoryIcon={getCertiAdminIcon(
          certiAdminCategory.certiAdminCategory,
          certiAdminSubcategory.certiAdminSubcategory,
          iconUrl
        )}
        certiAdminCategoryName={
          certiAdminCategory.certiAdminCategoryName === 'mySUNI'
            ? certiAdminCategory.certiAdminCategoryName
            : certiAdminSubcategory.certiAdminSubcategoryName
        }
      />
      {/*College, Category*/}
      <College
        iconUrl={
          `${getPublicUrl()}${
            CategoryImageURL[
              badge.mainCategoryId as keyof typeof CategoryImageURL
            ]
          }`
        }
      />
      {/*뱃지명*/}
      <Title name={name} />
    </BadgeContentWrapper>
  );
};

export default withRouter(BadgeContainer);

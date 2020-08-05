
import React, {FunctionComponent, useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {inject} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import certificationRoutePaths from '../../../../routePaths';
import {BadgeContentWrapper, CertificationOrg, College, Title} from '../view/BadgeView';
import BadgeModel from '../../../../ui/model/BadgeModel';
import BadgeDetailModel from '../../../../ui/model/BadgeDetailModel';
import MyBadgeModel from '../../../../ui/model/MyBadgeModel';

enum certiAdminCategoryIcon {
  mySUNI = '/static/media/logo-badge.png',
  Subsidiary = '/static/media/logo_badge.svg',
  Third = '/static/media/logo78x25.9e42a9b0.svg',
}

interface Props extends RouteComponentProps {
  badge: BadgeModel | MyBadgeModel | BadgeDetailModel,
  badgeStyle: string,  // List, Detail
  badgeSize: string,  // Large, Small
}

const BadgeContainer: FunctionComponent<Props> = (Props) => {
  //
  const { badge, badgeStyle, badgeSize, history } = Props;
  const { badgeId, difficultyLevel, iconUrl, mainCategoryName, name, certiAdminCategory } = badge;

  const onViewDetail = () => {
    history.push(certificationRoutePaths.badgeDetailPage(badgeId));
    window.scrollTo(0,0);
  };

  // 인증주체(mySUNI, Subsidiary, Etc...) 아이콘
  const getCertiAdminIcon = (certiAdminCategory: string) => {
    return certiAdminCategoryIcon[certiAdminCategory as keyof typeof certiAdminCategoryIcon];
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
      <CertificationOrg
        certiAdminCategoryIcon={getCertiAdminIcon(certiAdminCategory.certiAdminCategory)}
        certiAdminCategoryName={certiAdminCategory.certiAdminCategoryName}
      />

      {/*College, Category*/}
      <College iconUrl={iconUrl} mainCategory={mainCategoryName}/>

      {/*뱃지명*/}
      <Title name={name} />

    </BadgeContentWrapper>
  );
};

export default withRouter(BadgeContainer);

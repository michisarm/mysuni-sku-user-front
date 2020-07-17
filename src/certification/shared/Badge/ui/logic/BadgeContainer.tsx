
import React, {FunctionComponent, useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {inject} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import certificationRoutePaths from '../../../../routePaths';
import {BadgeContentWrapper, CollegeIcon, MainCategory, Title} from '../view/BadgeView';
import BadgeService from '../../../../present/logic/BadgeService';
import BadgeModel from '../../../../ui/model/BadgeModel';
import BadgeDetailModel from '../../../../ui/model/BadgeDetailModel';


interface Props extends RouteComponentProps {
  badgeService?: BadgeService,

  badge: BadgeModel | BadgeDetailModel,
  badgeStyle: string,  // List, Detail
  badgeSize: string,  // Large, Small
}

const BadgeContainer: FunctionComponent<Props> = (Props) => {
  //
  const { badgeService, badge, badgeStyle, badgeSize, history } = Props;
  const {  badgeId, difficultyLevel, iconUrl, mainCategoryName, name } = badge;

  const onViewDetail = () => {
    history.push(certificationRoutePaths.badgeDetailPage(badgeId));
    window.scrollTo(0,0);
  };

  return (
    // 스타일 지정: badge level + badge type
    <BadgeContentWrapper
      onViewDetail={onViewDetail}
      badgeLevel={difficultyLevel.toLowerCase()}
      badgeStyle={badgeStyle}
      badgeSize={badgeSize}
    >
      {/*사용자 정의 아이콘 or College Icon*/}
      <CollegeIcon iconUrl={iconUrl} />

      {/*카테고리명*/}
      <MainCategory mainCategory={mainCategoryName} />

      {/*뱃지명*/}
      <Title name={name} />

    </BadgeContentWrapper>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(withRouter(BadgeContainer));

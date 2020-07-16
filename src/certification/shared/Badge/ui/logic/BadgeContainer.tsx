
import React, {FunctionComponent} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import certificationRoutePaths from '../../../../routePaths';

import {BadgeContentWrapper, CollegeIcon, MainCategory, Title} from '../view/BadgeView';


interface Props extends RouteComponentProps {
  badgeId: string,
  badgeLevel: string,
  iconUrl: string,
  mainCategory: string,
  name: string,
  badgeStyle: string,  // List, Detail
  badgeSize: string,  // Large, Small
}

const BadgeContainer: FunctionComponent<Props> = (Props) => {
  //
  const { badgeId, badgeLevel, iconUrl, mainCategory, name, badgeStyle, badgeSize, history } = Props;

  const onViewDetail = () => {
    history.push(certificationRoutePaths.badgeDetailPage(badgeId));
    window.scrollTo(0,0);
  };

  return (
    // 스타일 지정: badge level + badge type
    <BadgeContentWrapper
      onViewDetail={onViewDetail}
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

export default withRouter(BadgeContainer);

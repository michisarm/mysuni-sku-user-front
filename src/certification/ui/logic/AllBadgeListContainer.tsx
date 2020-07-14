
import React from 'react';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {RouteComponentProps, withRouter} from 'react-router';
import {NoSuchContentPanel} from 'shared';
import {PageService} from '../../../shared/stores';
import BadgeService from '../../present/logic/BadgeService';

import BadgeCategoryContainer from './BadgeCategoryContainer';
import LineHeaderContainer from './LineHeaderContainer';
import BadgeListContainer from './BadgeListContainer';
import {SeeMoreButton} from '../../shared/Badge';
import BadgeStyle from '../model/BadgeStyle';

// 샘플데이터
import SampleBadge from '../model/SampleBadge';



interface Props extends RouteComponentProps<{ type: string, pageNo: string }> {
  pageService?: PageService,
  badgeService?: BadgeService,

  badgeCount: number | undefined,
}

const AllBadgeListContainer: React.FC<Props> = (Props) => {
  //
  const { pageService, badgeService, badgeCount } = Props;

  const CONTENT_TYPE = 'Badge';
  const PAGE_SIZE = 12;  // 페이지 당 12개씩 보기(추가)

  // see more button 클릭
  const onClickSeeMore = () => {
    //
    alert('더보기');
  };

  return (
    <>
      <BadgeCategoryContainer/>

      <LineHeaderContainer
        totalCount={SampleBadge.totalCount}
      />

      {SampleBadge.totalCount > 0 ? (
        <>
          {/*Badge List*/}
          <BadgeListContainer
            badges={SampleBadge.results}
            badgeStyle={BadgeStyle.List}
          />
          < SeeMoreButton onClick={onClickSeeMore} />
        </>
      ) : (
        <>
          <NoSuchContentPanel message="등록된 Badge List가 없습니다."/>
        </>
      )
      }
    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
  'shared.pageService',
))(withRouter(observer(AllBadgeListContainer)));

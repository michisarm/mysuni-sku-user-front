
import React, {useState} from 'react';
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
import BadgeSize from '../model/BadgeSize';

// 샘플데이터
import {badgeData} from '../../present/apiclient/badgeData';
import {categoryData} from '../../present/apiclient/categoryData';



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

  const [ categorySelection, setCategorySelection ] = useState();

  const onClickBadgeCategory = (e: any, categoryId: any) => {

    // 선택된 Category 정보를 가져오되, 동일한 카테고리일 경우 toggle 처리되어야 함
    if ( categorySelection === categoryId ) {
      // 선택해제 및 전체보기
      setCategorySelection('');
    } else {
      setCategorySelection(categoryId);
    }
  };

  return (
    <>
      {/*Badge Category*/}
      <BadgeCategoryContainer
        categories={categoryData.results}
        categorySelection={categorySelection}
        onClickBadgeCategory={onClickBadgeCategory}
      />

      <LineHeaderContainer
        totalCount={badgeData.totalCount}
      />

      {badgeData.totalCount > 0 ? (
        <>
          {/*Badge List*/}
          <BadgeListContainer
            badges={badgeData.results}
            badgeStyle={BadgeStyle.List}
            badgeSize={BadgeSize.Large}
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

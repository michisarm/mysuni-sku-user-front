
import React from 'react';

import {NoSuchContentPanel} from 'shared';

import BadgeCategoryContainer from './BadgeCategoryContainer';
import LineHeaderContainer from './LineHeaderContainer';
import BadgeListContainer from './BadgeListContainer';

import {SeeMoreButton} from '../../shared/Badge';

import BadgeStyle from '../model/BadgeStyle';

// 샘플데이터
import SampleBadge from '../model/SampleBadge';


const AllBadgeListContainer: React.FC = () => {
  //
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

          < SeeMoreButton
            onClick={onClickSeeMore}
          />
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

export default AllBadgeListContainer;

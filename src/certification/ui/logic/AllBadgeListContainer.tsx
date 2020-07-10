
import React from 'react';

import BadgeCategoryContainer from './BadgeCategoryContainer';
import LineHeaderContainer from './LineHeaderContainer';
import BadgeListContainer from './BadgeListContainer';

import {SeeMoreButton} from '../../shared';


const AllBadgeListContainer: React.FC = () => {
  //
  // see more button 클릭
  const onClickSeeMore = () => {
    //
    alert('더보기');
  };

  return (
    <>
      All Badge List
      {/*<BadgeCategoryContainer/>*/}
      {/*<LineHeaderContainer />*/}
      {/*<BadgeListContainer/>*/}
      {/*<SeeMoreButton*/}
      {/*onClick={onClickSeeMore}*/}
      {/*/>*/}
    </>
  );
};

export default AllBadgeListContainer;

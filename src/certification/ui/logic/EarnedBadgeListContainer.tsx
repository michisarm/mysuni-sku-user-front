import React, {useEffect, useRef} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import routePaths from '../../../personalcube/routePaths';
import {PageService} from '../../../shared/stores';
import BadgeService from '../../present/logic/BadgeService';
import BadgeFilterRdoModel from '../model/BadgeFilterRdoModel';
import {Badge, SeeMoreButton} from '../../shared/Badge';
import {NoSuchContentPanel} from '../../../shared';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import LineHeaderContainer from './LineHeaderContainer';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  badgeService?: BadgeService,
  pageService?: PageService,

  profileMemberName: string,
  badgeCount: number | undefined,
}

const EarnedBadgeListContainer: React.FC<Props> = (Props) => {
  //
  const { badgeService, pageService, profileMemberName, badgeCount, history, match, } = Props;
  const { badges } = badgeService!;

  const PAGE_KEY = 'badge.Earned';
  const PAGE_SIZE = 12;  // 페이지 당 12개씩 보기(추가)

  const pageNo = useRef(1);
  const difficultyLevel = useRef('');

  // // lectureService 변경  실행
  // useEffect(() => {
  //   //
  //   pageNo.current = getPageNo();
  //
  //   const initialLimit = pageNo.current * PAGE_SIZE;
  //   pageService!.initPageMap(PAGE_KEY, 0, initialLimit);
  //
  //   // findMyContent();
  // }, []);

  // lectureService 변경  실행
  useEffect(() => {

    const page = pageService!.pageMap.get(PAGE_KEY);

    if (getPageNo() > 1) {
      const offset = page!.limit > PAGE_SIZE && page!.nextOffset === 0 ?
        page!.nextOffset + PAGE_SIZE : page!.nextOffset;
      pageService!.initPageMap(PAGE_KEY, offset, PAGE_SIZE);
    }
    else {
      pageService!.initPageMap(PAGE_KEY, 0, PAGE_SIZE);
    }

    findMyContent(getPageNo() - 1);

  }, [badgeCount]);

  const findMyContent = async (pageNo: number) => {
    //
    const page = pageService!.pageMap.get(PAGE_KEY);

    badgeService!.clearBadges();
    badgeService!.findPagingEarnedBadges(BadgeFilterRdoModel
      .earned('patronKey', 'Basic', '', page!.limit, page!.nextOffset));

    pageService!.setTotalCountAndPageNo(PAGE_KEY, badgeCount!, pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);

  };

  const getPageNo = () => {
    return parseInt(match.params.pageNo, 10);
  };

  const onSelectDifficultyLevel = (diffLevel: string) => {
    difficultyLevel.current = diffLevel;
  };

  // see more button 클릭
  const onClickSeeMore = () => {
    //
    history.replace(routePaths.currentPage(getPageNo() + 1));
  };

  const isContentMore = () => {
    const page = pageService!.pageMap.get(PAGE_KEY);
    return page && page.pageNo < page.totalPages;
  };

  return (
    <>
      <LineHeaderContainer
        totalCount={badgeService?.earnedCount}
        onSelectDifficultyLevel={onSelectDifficultyLevel}
      />

      {badges.length > 0 ? (
        <div className="badge-list">
          <ul>
            {badges.map( (badge: any, index: number) => {
              return (
                <li key={index}>
                  <Badge
                    badgeLevel={badge.difficultyLevel}
                    iconUrl={badge.iconUrl}
                    mainCategory={badge.mainCategoryName}
                    name={badge.name}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Large}
                  />
                </li>
              );
            })}
          </ul>
          { isContentMore() && ( <SeeMoreButton onClick={onClickSeeMore} /> ) }
        </div>
      ) : (
        <NoSuchContentPanel message={(
          <>
            <div className="text">도전중인 Badge가 없습니다.<br/>등록된 Badge 리스트에서 원하는 Badge에 도전해보세요.</div>
            <Button
              icon
              as="a"
              className="right btn-blue2"
            >
              <span className="border">Badge List 바로가기</span>
              <Icon className="morelink"/>
            </Button>
          </>
        )}
        />
      )}
    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
  'shared.pageService',
))(withRouter(observer(EarnedBadgeListContainer)));

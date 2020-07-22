import React, {useEffect, useRef, useState} from 'react';
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
import BadgeCountText from '../model/BadgeCountText';
import LineHeaderContainer from './LineHeaderContainer';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  badgeService?: BadgeService,
  pageService?: PageService,

  profileMemberName: string,
  badgeCount: number | undefined,
  resetEarnedCount: (count: number) => void;
  countMessage?: string,
}

const EarnedBadgeListContainer: React.FC<Props> = (Props) => {
  //
  const { badgeService, pageService, profileMemberName, badgeCount, resetEarnedCount, history, match, } = Props;
  const { myBadges } = badgeService!;

  // const PAGE_KEY = 'badge.earned';
  // const PAGE_SIZE = 12;  // 페이지 당 12개씩 보기(추가)

  const pageKey = useRef<string>('');

  const [difficultyLevel, setDifficultyLevel] = useState<string>('');

  useEffect(() => {
    //
    // pageKey.current = PAGE_KEY;
    badgeService!.clearMyBadges();
    // pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
    // pageService!.setTotalCount(pageKey.current, badgeCount ? badgeCount : 0);

    findMyContent();

    return (() => {
      window.scrollTo(0, 0);
    });
  }, []);

  /*
  useEffect(() => {

    const page = pageService!.pageMap.get(pageKey.current);

    if (getPageNo() > 1) {
      const offset = page!.limit > PAGE_SIZE && page!.nextOffset === 0 ?
        page!.nextOffset + PAGE_SIZE : page!.nextOffset;
      pageService!.initPageMap(pageKey.current, offset, PAGE_SIZE);
    }
    else {
      pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
    }

    findMyContent(getPageNo() - 1);

  }, [difficultyLevel, match.params.pageNo]);
  */

  const findMyContent = async (/*pageNo: number*/) => {
    //
    // const page = pageService!.pageMap.get(pageKey.current);

    const badgeOffsetList = await badgeService!.findPagingEarnedBadges(BadgeFilterRdoModel
      .earned(difficultyLevel, ''/*, page!.limit, page!.nextOffset*/));

    // pageService!.setTotalCountAndPageNo(pageKey.current, badgeOffsetList.totalCount,
    //   pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1);

    if (badgeCount !== badgeOffsetList.totalCount) {
      resetEarnedCount(badgeOffsetList.totalCount);
    }
  };

  /*
  const getPageNo = () => {
    //
    return parseInt(match.params.pageNo, 10);
  };

  const isContentMore = () => {
    const page = pageService!.pageMap.get(pageKey.current);
    return page && page.pageNo < page.totalPages;
  };

  // see more button 클릭
  const onClickSeeMore = () => {
    //
    history.replace(routePaths.currentPage(getPageNo() + 1));
  };
  */

  const onSelectDifficultyLevel = (diffLevel: string) => {
    /*
    // 페이지 변경(초기화)
    match.params.pageNo = '1';
    history.replace(routePaths.currentPage(1));
    
    // 페이지키 재설정 및 초기화
    pageKey.current = pageKey.current + '.' +  difficultyLevel;
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
    */

    // 난이도 변경
    setDifficultyLevel(diffLevel === '전체' ? '': diffLevel);
  };

  return (
    <>
      <LineHeaderContainer
        totalCount={badgeService?.earnedCount}
        onSelectDifficultyLevel={onSelectDifficultyLevel}
        countMessage={BadgeCountText.EarnedBadgeList}
      />

      {myBadges.length > 0 ? (
        <div className="badge-list">
          <ul>
            {myBadges.map( (badge: any, index: number) => {
              return (
                <li key={index}>
                  <Badge
                    badge={badge}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Large}
                  />
                  <div className="badge-name">{badge.name}</div>
                </li>
              );
            })}
          </ul>
          {/*{ isContentMore() && <SeeMoreButton onClick={onClickSeeMore} /> }*/}
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

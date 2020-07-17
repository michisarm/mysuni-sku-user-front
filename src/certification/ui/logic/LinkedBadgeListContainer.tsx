
import React, {useEffect, useRef} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {NoSuchContentPanel} from 'shared';
import {PageService} from 'shared/stores';
import BadgeService from '../../present/logic/BadgeService';

import {Badge} from '../../shared/Badge';
import {LinkedBadgeListWrapper} from '../view/BadgeContentElementView';

import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeModel from '../model/BadgeModel';


interface Props extends RouteComponentProps {
  badgeService?: BadgeService,
  pageService?: PageService,

  badgeId: string,
}

const LinkedBadgeListContainer: React.FC<Props> = (Props) => {
  //
  const { badgeService, pageService, badgeId, history } = Props;
  const { badges } = badgeService!;

  const PAGE_KEY = 'badge.linked';
  const PAGE_SIZE = 4;  // 연관뱃지 4개만 노출

  const pageKey = useRef<string>('');

  useEffect(() => {
    //
    pageKey.current = PAGE_KEY;
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
  }, []);

  useEffect(() => {
    findMyContent();
  },[]);

  const findMyContent = async () => {
    //
    const page = pageService!.pageMap.get(pageKey.current);

    const badgeOffsetList = await badgeService!.findLinkedBadges(badgeId);
  };


  return (
    <LinkedBadgeListWrapper>

      {/*연관 Badge 목록*/}
      <div className="list">

        {badges.length > 0 ? (
          <ul>
            {badges.map((badge: BadgeModel, index: number) => {
              return (
                <li key={`linked-badge-${index}`}>
                  <Badge
                    badge={badge}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                  <div className="badge-name">{badge.name}</div>
                </li>
              );
            })}
          </ul>
        ) : (
          <NoSuchContentPanel message="등록된 연관 Badge가 없습니다."/>
        )}
      </div>
    </LinkedBadgeListWrapper>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
  'shared.pageService',
))(withRouter(observer(LinkedBadgeListContainer)));

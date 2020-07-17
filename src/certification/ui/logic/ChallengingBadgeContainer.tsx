
import React, {useEffect, useRef, useState} from 'react';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {NoSuchContentPanel} from 'shared';
import {Button, Icon} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import BadgeService from '../../present/logic/BadgeService';
import {PageService} from '../../../shared/stores';
import LineHeaderContainer from './LineHeaderContainer';
import ChallengeBoxContainer from './ChallengeBoxContainer';

import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import routePaths from '../../../personalcube/routePaths';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  badgeService?: BadgeService,
  pageService?: PageService,

  badgeCount: number | undefined,
}

const ChallengingBadgeContainer: React.FC<Props> = (Props) => {
  //
  const { badgeService, pageService, badgeCount, history, match, } = Props;
  const { badges } = badgeService!;

  const PAGE_KEY = 'badge.challenging';
  const PAGE_SIZE = 12;

  const pageKey = useRef<string>(PAGE_KEY);

  const [difficultyLevel, setDifficultyLevel] = useState<string>('');

  useEffect(() => {
    //
    pageKey.current = PAGE_KEY;
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);
  }, []);

  const onSelectDifficultyLevel = (diffLevel: string) => {
    // 페이지 변경(초기화)
    match.params.pageNo = '1';
    history.replace(routePaths.currentPage(1));

    // 페이지키 재설정 및 초기화
    pageKey.current = pageKey.current + '.' +  difficultyLevel;
    pageService!.initPageMap(pageKey.current, 0, PAGE_SIZE);

    //
    setDifficultyLevel(diffLevel === '전체' ? '': diffLevel);
  };

  return (
    <>
      <LineHeaderContainer
        totalCount={badgeService?.challengingCount}
        onSelectDifficultyLevel={onSelectDifficultyLevel}
      />

      {badges.length > 0 ? (
        <>
          <ChallengeBoxContainer
            badges={badges}
            badgeStyle={BadgeStyle.Detail}
            badgeSize={BadgeSize.Small}
          />
        </>
      ) : (
        <NoSuchContentPanel message={(
          <>
            <div className="text">도전중인 Badge가 없습니다.<br/>새로운 Badge에 도전해보시겠습니까?</div>
            <Button
              icon
              as="a"
              className="right btn-blue2"
            >
              Badge List 바로가기 <Icon className="morelink"/>
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
))(withRouter(observer(ChallengingBadgeContainer)));

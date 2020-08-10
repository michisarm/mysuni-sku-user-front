import React, {useEffect, useRef, useState} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import BadgeService from '../../present/logic/BadgeService';
import BadgeFilterRdoModel from '../model/BadgeFilterRdoModel';
import {Badge} from '../../shared/Badge';
import {NoSuchContentPanel} from '../../../shared';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeCountText from '../model/BadgeCountText';
import LineHeaderContainer from './LineHeaderContainer';
import BadgeRoutePaths from '../../routePaths';


interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  badgeService?: BadgeService,

  profileMemberName: string,
  badgeCount: number | undefined,
  countMessage?: string,
}

// 페이징 처리없이 모두 표시한다.
const EarnedBadgeListContainer: React.FC<Props> = (Props) => {
  //
  const { badgeService, history } = Props;
  const { myBadges } = badgeService!;

  const [difficultyLevel, setDifficultyLevel] = useState<string>('');

  useEffect(() => {
    return (() => {
      window.scrollTo(0, 0);
    });
  }, []);

  useEffect(() => {
    //
    badgeService!.clearMyBadges();
    findMyContent();
  }, [difficultyLevel]);

  const findMyContent = async () => {
    //
    const badgeOffsetList = await badgeService!.findPagingEarnedBadges(BadgeFilterRdoModel
      .earned(difficultyLevel, 'Issued'/*, page!.limit, page!.nextOffset*/));
  };

  const onSelectDifficultyLevel = (diffLevel: string) => {
    // 난이도 변경
    setDifficultyLevel(diffLevel === '전체' ? '': diffLevel);
  };

  const moveToBadgeList = () => {
    // Badge List 탭으로 이동
    history.push(BadgeRoutePaths.badgeTab());
  };

  return (
    <>
      <LineHeaderContainer
        totalCount={badgeService?.earnedCount}
        onSelectDifficultyLevel={onSelectDifficultyLevel}
        countMessage={BadgeCountText.EarnedBadgeList}
      />

      {myBadges.length > 0 && myBadges[0] ? (
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
        </div>
      ) : (
        <NoSuchContentPanel message={(
          <>
            <div className="text">획득한 Badge가 없습니다.<br/>등록된 Badge 리스트에서 원하는 Badge에 도전해보세요.</div>
            <Button
              icon
              as="a"
              className="right btn-blue2"
              onClick={moveToBadgeList}
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

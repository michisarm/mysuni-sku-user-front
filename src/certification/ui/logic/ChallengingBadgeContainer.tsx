
import React, {useRef} from 'react';
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
''

interface Props extends RouteComponentProps<{ tab: string, pageNo: string }> {
  badgeService?: BadgeService,
  pageService?: PageService,

  badgeCount: number | undefined,
}

const ChallengingBadgeContainer: React.FC<Props> = (Props) => {
  //
  const { badgeService, pageService, badgeCount, history, match, } = Props;
  const { badges } = badgeService!;

  const difficultyLevel = useRef('');

  const onSelectDifficultyLevel = (diffLevel: string) => {
    difficultyLevel.current = diffLevel;
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

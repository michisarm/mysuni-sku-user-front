
import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {NoSuchContentPanel} from 'shared';
import BadgeService from '../../present/logic/BadgeService';
import {Badge} from '../../shared/Badge';
import {LinkedBadgeListWrapper} from '../view/BadgeContentElementView';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import MyBadgeModel from '../model/MyBadgeModel';


interface Props extends RouteComponentProps {
  badgeService?: BadgeService,

  badgeId: string,
}

const LinkedBadgeListContainer: React.FC<Props> = (Props) => {
  //
  const { badgeService, badgeId } = Props;
  const { myBadges } = badgeService!;

  useEffect(() => {
    //
    findMyContent();
  }, []);

  const findMyContent = async () => {
    //
    const badgeOffsetList = await badgeService!.findLinkedBadges(badgeId);
  };

  return (
    <LinkedBadgeListWrapper>
      {/*연관 Badge 목록*/}
      <div className="list">
        {myBadges.length > 0 && myBadges[0] ? (
          <ul>
            {myBadges.map((badge: MyBadgeModel, index: number) => {
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

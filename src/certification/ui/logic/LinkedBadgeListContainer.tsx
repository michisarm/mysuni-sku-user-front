
import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { NoSuchContentPanel } from 'shared';
import BadgeService from '../../present/logic/BadgeService';
import { Badge } from '../../shared/Badge';
import { LinkedBadgeListWrapper } from '../view/BadgeContentElementView';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import MyBadgeModel from '../model/MyBadgeModel';


interface Props extends RouteComponentProps {
  badgeId: string;
  badgeService?: BadgeService;
}

const LinkedBadgeListContainer: React.FC<Props> = (Props) => {
  /*
    연관 뱃지에 대한 state 는 store 에서 이미 관리하고 있으므로,
    컴포넌트에서 따로 관리하지 않도록 수정. 2020.09.28 by 김동구

    연관 뱃지는 my 뱃지와 동일하게 MyBadgeModel 을 사용함.
  */
  const { badgeService, badgeId } = Props;
  const { myBadges } = badgeService!;

  useEffect(() => {
    //
    findMyContent();
  }, [badgeId]);

  const findMyContent = async () => {
    //
    await badgeService!.findLinkedBadges(badgeId);
  };

  return (
    // Template Component
    <LinkedBadgeListWrapper>
      {/*연관 Badge 목록*/}
      <div className="list">
        {myBadges && myBadges.length !== 0 ? (
          <ul>
            {myBadges.map((myBadge: MyBadgeModel, index: number) => {
              return (
                <li key={`linked-badge-${index}`}>
                  <Badge
                    badge={myBadge}
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                  <div className="badge-name">{myBadge.name}</div>
                </li>
              );
            })}
          </ul>
        ) :
          (
            <NoSuchContentPanel message="등록된 연관 Badge가 없습니다." />
          )}
      </div>
    </LinkedBadgeListWrapper>
  );
};

/*
  pageService 는 사용하지 않으므로 삭제함. 0928 by 김동구
*/
export default inject(mobxHelper.injectFrom(
  'badge.badgeService'
))(withRouter(observer(LinkedBadgeListContainer)));

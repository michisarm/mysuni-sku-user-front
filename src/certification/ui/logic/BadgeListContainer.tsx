
import React, { FunctionComponent, useEffect } from 'react';
import { Badge } from '../../shared/Badge';
import BadgeModel from '../model/MyBadgeModel';
import { useScrollMove } from 'myTraining/useScrollMove';


interface BadgeListContainerProps {
  badges: BadgeModel[],
  badgeStyle: string,  // List: link, Detail: no link
  badgeSize: string,   // Large, Small
}

const BadgeListContainer: FunctionComponent<BadgeListContainerProps> = (Props) => {
  //
  const { badges, badgeStyle, badgeSize } = Props;
  const { scrollOnceMove } = useScrollMove();

  useEffect(() => {
    if (badges) {
      setTimeout(() => {
        scrollOnceMove();
      }, 300)
    }
  }, [scrollOnceMove])

  return (
    <div className="badge-list">
      <ul>
        {badges.map((badge: BadgeModel, index: number) => {
          return (
            <li key={index}>
              <Badge
                badge={badge}
                badgeStyle={badgeStyle}
                badgeSize={badgeSize}
              />
              <div className="badge-name"><span>{badge.name}</span></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BadgeListContainer;

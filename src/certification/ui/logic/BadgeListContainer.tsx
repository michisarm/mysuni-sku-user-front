
import React, {FunctionComponent} from 'react';
import {Badge} from '../../shared/Badge';
import BadgeModel from '../model/BadgeModel';


interface BadgeListContainerProps {
  badges: BadgeModel[],
  badgeStyle: string,  // List: link, Detail: no link
  badgeSize: string,   // Large, Small
}

const BadgeListContainer: FunctionComponent<BadgeListContainerProps> = (Props) => {
  //
  const { badges, badgeStyle, badgeSize } = Props;

  return (
    <div className="badge-list">
      <ul>
        {badges.map( (badge: BadgeModel, index: number) => {
          return (
            <li key={index}>
              <Badge
                badge={badge}
                badgeStyle={badgeStyle}
                badgeSize={badgeSize}
              />
              <div className="badge-name">{badge.name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BadgeListContainer;

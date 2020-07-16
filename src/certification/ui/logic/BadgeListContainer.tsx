
import React, {FunctionComponent} from 'react';
import {Badge} from '../../shared/Badge';

interface BadgeListContainerProps {
  badges: any,
  badgeStyle: string,  // List: link, Detail: no link
  badgeSize: string,   // Large, Small
}




const BadgeListContainer: FunctionComponent<BadgeListContainerProps> = (Props) => {
  //
  const { badges, badgeStyle, badgeSize } = Props;

  return (
    <div className="badge-list">
      <ul>
        {badges.map( (badge: any, index: number) => {
          return (
            <li key={index}>
              <Badge
                badgeId={badge.badgeId}
                badgeLevel={badge.difficultyLevel}
                iconUrl={badge.iconUrl}
                mainCategory={badge.mainCategoryName}
                name={badge.name}
                badgeStyle={badgeStyle}
                badgeSize={badgeSize}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BadgeListContainer;

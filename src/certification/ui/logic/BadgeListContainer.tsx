
import React, {FunctionComponent} from 'react';
import {Badge} from '../../shared/Badge';

interface BadgeListContainerProps {
  badges: any,
  badgeStyle: string
}


const BadgeListContainer: FunctionComponent<BadgeListContainerProps> = (Props) => {
  //
  const { badges } = Props;


  return (
    <div className="badge-list">
      <ul>
        {badges.map( (badge: any, index: number) => {
          return (
            <li key={index}>
              <Badge
                badgeLevel={badge.difficultyLevel}
                iconUrl={badge.iconUrl}
                mainCategory={badge.mainCategoryName}
                name={badge.name}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BadgeListContainer;

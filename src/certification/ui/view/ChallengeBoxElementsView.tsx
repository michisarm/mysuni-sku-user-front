
import React, {FunctionComponent} from 'react';


interface BadgeStatusProps {
  children: React.ReactNode
}

export const ChallengeBadgeStatus: FunctionComponent<BadgeStatusProps> = ({ children }) => (
  <div className="status">
    {children}
  </div>
);


interface BadgeTitleProps {
  mainCategoryName: string,
  name: string,
}

export const ChallengeBadgeTitle: FunctionComponent<BadgeTitleProps> = ({ mainCategoryName, name }) => (
  <div className="badge-title">
    <div className="t1">{mainCategoryName}</div>
    <div className="t2">{name}</div>
    <div className="path">Learning Path</div>
  </div>
);



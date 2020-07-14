
import React, {FunctionComponent} from 'react';
import classNames from 'classnames';


interface BadgeContentWrapperProps {
  badgeLevel: string,
  badgeSize: string,
}

export const BadgeContentWrapper: FunctionComponent<BadgeContentWrapperProps> = ({ badgeLevel, badgeSize, children }) => (
  <div className={ classNames('badge', badgeLevel, badgeSize )}>
    {children}
  </div>
);

import React from 'react';
import classNames from 'classnames';

interface TRSContainerProps {
  parentType: string,
  subDepth?: boolean,
  children: React.ReactNode,
}

export const TRSContainerWrapper: React.FC<TRSContainerProps> = ({ parentType, subDepth, children }) => (
  <>
    { parentType === 'COURSE' && (
      <li className={classNames('trs', subDepth ? 'step2' : '' )}>
        {children}
      </li>
    )}
    { parentType === 'CUBE' && (
      <div className="bar typeB">
        {children}
      </div>
    )}
  </>
);

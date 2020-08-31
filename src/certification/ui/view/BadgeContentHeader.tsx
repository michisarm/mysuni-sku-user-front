import React from 'react';


interface Props {
  children: React.ReactNode
}

const BadgeContentHeader: React.FC<Props> = ({children}) => {
  //
  return (
    <div className="badge-header">
      <div className="inner">
        {children}
      </div>
    </div>
  )
};

export default BadgeContentHeader;

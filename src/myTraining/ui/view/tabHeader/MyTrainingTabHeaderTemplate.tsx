import React from 'react';

interface Props {
  className: 'right-wrap' | 'left-wrap' | 'top-list' | undefined;
  applyDesign?: boolean;
  children?: React.ReactNode;
}

export function MyTrainingTabHeaderTemplate(props: Props) {
  const { className, applyDesign, children } = props;

  if (className === 'right-wrap' || applyDesign) {
    return <div className={className}>{children}</div>;
  } else {
    return <>{children}</>;
  }
}

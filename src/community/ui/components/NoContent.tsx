import React from 'react';
import { Icon } from 'semantic-ui-react';

interface Props {
  title?: string;
  message: string;
}

export function NoContent(props: Props) {
  const { message, title } = props;

  return (
    <div className="no-cont-wrap">
      <Icon className="no-contents80" />
      <span className="blind">{title || '콘텐츠 없음'}</span>
      <div className="text">{message}</div>
    </div>
  );
}

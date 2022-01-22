import React from 'react';

export interface Props {
  id: string;
  text: string;
  onClick: (key: string) => void;
}

export function CompanyItem({ id, text, onClick }: Props) {
  return (
    <li key={id} className="link-options">
      <a onClick={() => onClick(id)}>{text}</a>
    </li>
  );
}

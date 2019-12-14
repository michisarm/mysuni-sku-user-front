
import React from 'react';


interface DescriptionViewProps {
  name: string,
  count: number,
}

export const DescriptionView: React.FC<DescriptionViewProps> = ({ name, count }) => (
  <div className="section-count-big">
    <strong>{name}</strong> 의 학습 과정 입니다. <strong>({count})</strong>
  </div>
);

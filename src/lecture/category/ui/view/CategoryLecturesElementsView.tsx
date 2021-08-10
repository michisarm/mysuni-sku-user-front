
import React from 'react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';


interface DescriptionViewProps {
  name: string,
  count: number,
}

export const DescriptionView: React.FC<DescriptionViewProps> = ({ name, count }) => (
  <div className="section-count-big"
    dangerouslySetInnerHTML={{__html: getPolyglotText('<strong>{name}</strong> 의 학습 과정 입니다. <strong>({count})</strong>',
      'cicl-목록-학습과정',
      {name, count: count+''})}}
  />
);

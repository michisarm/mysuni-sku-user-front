import React from 'react';

interface Props {
  name: string;
  style: any;
}

const ExperimentalGroup: React.FC<Props> = (Props) => {
  const props = {
    'data-abtest': Props.name,
    'style': Props.style
  };

  return <div {...props}>{Props.children}</div>;
};

export default ExperimentalGroup;

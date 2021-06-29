import React from 'react';

interface Props {
  name: string;
}

const ExperimentalGroup: React.FC<Props> = (Props) => {
  const props = {
    'data-abtest': Props.name,
  };

  return <div {...props}>{Props.children}</div>;
};

export default ExperimentalGroup;

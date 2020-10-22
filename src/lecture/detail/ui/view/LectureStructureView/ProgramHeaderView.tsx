import React from 'react';

interface ProgramHeaderViewProps {
  name: string;
}

const ProgramHeaderView: React.FC<ProgramHeaderViewProps> = function ProgramHeaderView({
  name,
}) {
  return (
    <div className="cube-state-holder">
      <div className="cube-state-title">{name}</div>
    </div>
  );
};

export default ProgramHeaderView;

import React from 'react';

interface ProgramViewProps {
  name: string;
}

const ProgramView: React.FC<ProgramViewProps> = function ProgramView({ name }) {
  return (
    <div className="cube-state-holder">
      <div className="cube-state-title">{name}</div>
    </div>
  );
};

export default ProgramView;

import React from 'react';
import LectureStructureContainer from './LectureStructureContainer';

const LectureDetailContainer: React.FC = function LectureDetailContainer() {
  return (
    <section className="content lms v-wide">
      <LectureStructureContainer />
    </section>
  );
};

export default LectureDetailContainer;

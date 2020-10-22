import React from 'react';
import { Icon } from 'semantic-ui-react';
import { LectureStructure } from '../../../viewModel/LectureStructure';
import ProgramView from './ProgramView';

interface LectureStructureViewProps {
  lectureStructure: LectureStructure;
}

const LectureStructureView: React.FC<LectureStructureViewProps> = function LectureStructureView({
  lectureStructure,
}) {
  return (
    <div className="course-info-list">
      <div className="course-header-list">
        <a className="btn-view-change">
          <Icon className="list24 icon" />
          <span>List</span>
        </a>
        <a className="btn-close">
          <span>close</span>
        </a>
      </div>
      {lectureStructure.type === 'Program' &&
        lectureStructure.course !== undefined && (
          <ProgramView name={lectureStructure.course.name} />
        )}
    </div>
  );
};

export default LectureStructureView;

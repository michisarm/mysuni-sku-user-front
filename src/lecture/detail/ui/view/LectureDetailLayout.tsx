import React, { useCallback, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import LectureStructureContainer from '../logic/LectureStructureContainer';

const LectureDetailLayout: React.FC = function LectureDetailLayout({
  children,
}) {
  const [structureVisible, setStructureVisible] = useState<boolean>(true);

  const closeStructure = useCallback(() => {
    setStructureVisible(false);
  }, []);

  const openStructure = useCallback(() => {
    setStructureVisible(true);
  }, []);

  return (
    <section
      className={`content lms ${structureVisible ? 'v-wide' : ''}`}
      id="lms-content"
    >
      <div className="course-info-list">
        <div className="course-header-list">
          <a className="btn-view-change">
            <Icon className="list24 icon" />
            <span>List</span>
          </a>
          <a className="btn-close" onClick={closeStructure}>
            <span>close</span>
          </a>
        </div>
        <LectureStructureContainer />
      </div>
      <div className="course-info-detail responsive-course">
        <a className="btn-wide" onClick={openStructure}>
          <span>펼치기</span>
        </a>
        <div className="course-detail-center">
          <div className="main-wrap">
            <div className="scrolling-area area2 ">
              <div className="ui segment full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LectureDetailLayout;

import React, { useState } from 'react';
import {
  Segment,
  Sticky,
  Menu,
  Button,
  Icon,
  Card,
  Image,
} from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

// internal components
import AllView from '../SectionArea/AllView';
import Instructor from '../SectionArea/Instructor';
import LearningCard from '../SectionArea/LearningCard';

const COMPONENT: any = {
  All: <AllView />,
  LearningCard: <Instructor />,
  Export: <LearningCard />,
};

// const COMPONENT: any = {
//   0: <AllView />,
//   1: <Instructor />,
//   2: <LearningCard />,
// };

const ContentsTab: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('');

  const handleItemClick = (e: any, { name }: any) => {
    setActiveItem(name);
  };

  return (
    <div>
      <Sticky className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="All"
              active={activeItem === 'All'}
              onClick={handleItemClick}
              // as={Link}
              // to="/search/all"
            >
              전체보기 <span className="count" />
            </Menu.Item>
            <Menu.Item
              name="LearningCard"
              active={activeItem === 'LearningCard'}
              onClick={handleItemClick}
              // as={Link}
              // to="/search/learning-card"
            >
              학습카드 <span className="count" />
            </Menu.Item>
            <Menu.Item
              name="Export"
              active={activeItem === 'Export'}
              onClick={handleItemClick}
              // as={Link}
              // to="/search/instructor"
            >
              강사 <span className="count" />
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>

      <div
        style={{
          padding: '100px',
          width: '1400px',
          margin: '0 auto',
        }}
      >
        {COMPONENT[activeItem]}
      </div>
    </div>
  );
};

export default ContentsTab;

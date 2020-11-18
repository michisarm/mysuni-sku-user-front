import React, { useState } from 'react';
import {
  Segment,
  Sticky,
  Menu,
  Button,
  Icon,
  Card,
  Image
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
    </div>
  );
};

export default ContentsTab;

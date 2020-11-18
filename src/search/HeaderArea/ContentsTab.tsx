import React, { useState, useRef } from 'react';
import {
  Segment,
  Sticky,
  Menu,
  Button,
  Icon,
  Card,
  Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import CommentsSort from "../CommentsSort";
// import LabelRequiredState from "../LabelRequiredState";
// import LabelRequiredStateValue from "../LabelRequiredStateValue";
// import LabelStampState from "../LabelStampState";
// import LabelStampStateMulti from "../LabelStampStateMulti";
// import ExpertCard from "../ExpertCard";

const ContentsTab: React.FC = () => {
  const contextRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState<string>('');

  const handleItemClick = (e: any, { name }: any) => {
    setActiveItem(name);
  };

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="All"
              active={activeItem === 'All'}
              onClick={handleItemClick}
              // as={Link}
              to=""
            >
              전체보기 <span className="count" />
            </Menu.Item>
            <Menu.Item
              name="LearningCard"
              active={activeItem === 'LearningCard'}
              onClick={handleItemClick}
              // as={Link}
              to=""
            >
              학습카드 <span className="count" />
            </Menu.Item>
            <Menu.Item
              name="Export"
              active={activeItem === 'Export'}
              onClick={handleItemClick}
              // as={Link}
              to=""
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

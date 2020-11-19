import React from 'react';
import BoxCard from '../Components/BoxCard';
import { Icon, Button, Card, Segment } from 'semantic-ui-react';
import CommentsSort  from 'search/Components/CommentsSort';

const LearningCard: React.FC = () => {
  return (
    <div className="section">
      <div className="text01">학습카드(0)</div>
      <div className="fn-button">
        <Button icon className="right btn-blue">
          View all <Icon className="morelink" />
        </Button>
      </div>
      <BoxCard />
    </div>
  );
};

export default LearningCard;

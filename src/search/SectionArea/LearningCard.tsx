import React from 'react';
import BoxCard from '../Components/BoxCard';
import { Icon, Button, Card, Segment } from 'semantic-ui-react';

const LearningCard: React.FC = () => {
  return (
    <Segment className="full">
      <div className="section">
        <div className="text01">학습카드(0)</div>
        <div className="fn-button">
          <Button icon className="right btn-blue">
            View all <Icon className="morelink" />
          </Button>
        </div>
        <BoxCard />
      </div>
    </Segment>
  );
};

export default LearningCard;

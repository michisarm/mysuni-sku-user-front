import React from 'react';
import LearningCard from './LearningCard';
import { Segment, Icon } from 'semantic-ui-react';
import Instructor from './Instructor';

const AllView: React.FC = () => {
  
  return (
    <>
      <LearningCard />
      <Instructor />
    </>
  );
};

export default AllView;

import React from 'react';
import LearningCard from './LearningCard';
import {Segment, Icon } from 'semantic-ui-react'
import Instructor from './Instructor';

const AllView: React.FC = () => {
  return (
    <Segment className="full">
      <div className="sort-reult">
        <LearningCard/>
        <Instructor/>
      </div>
    </Segment>
  )
};

export default AllView;

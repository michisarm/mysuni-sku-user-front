import React from 'react';
import LearningCard from './LearningCard';
import { Segment, Icon } from 'semantic-ui-react';
import Instructor from './Instructor';
import CommentsSort from 'search/Components/CommentsSort';


const AllView: React.FC = () => {
  
  return (
    <>
      <Segment className="full">
        <div className="sort-reult">
          <CommentsSort/>
          <LearningCard />
          <Instructor />
        </div>
      </Segment>
    </>
  );
};

export default AllView;

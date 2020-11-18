import React, { useState }  from 'react';
import { Icon, Card, Segment,Button } from 'semantic-ui-react'
import ExpertCard from '../components/ExpertCard';

const Instructor: React.FC = () => {
  const [insetApi, getInsertApi] = useState<boolean>(true)
  
  return (
    <div className="section">
      <div className="text01">강사({insetApi ? "28" : "0"})</div>
      {
        insetApi && insetApi ? (
          <>
            <div className="fn-button">
              <Button icon className="right btn-blue">
                View all <Icon className="morelink"/>
              </Button>
            </div>
            <Card.Group className="expert-cards">
              {/* API Render */}
              <ExpertCard/>
              <ExpertCard/>
              <ExpertCard/>
              <ExpertCard/>
            </Card.Group>
          </>
        ) : (
          <div className="no-cont-wrap">
            <Icon className="no-contents80"/><span className="blind">콘텐츠 없음</span>
            <div className="text">검색된 Expert가 없습니다.</div>
          </div>
        )
      }
    </div>
  );
};

export default Instructor;

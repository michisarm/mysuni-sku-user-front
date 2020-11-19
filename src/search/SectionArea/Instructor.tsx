import React, { useState } from 'react';
import { Icon, Card, Segment, Button } from 'semantic-ui-react';
import ExpertCards from '../Components/ExpertCards';

const Instructor: React.FC = () => {
  const [insertApi, getInsertApi] = useState<boolean>(true);

  return (
    <div className="section">
      <div className="text01">강사({insertApi ? '28' : '0'})</div>
      {insertApi && insertApi ? (
        <>
          <div className="fn-button">
            <Button icon className="right btn-blue">
              View all <Icon className="morelink" />
            </Button>
          </div>
          <Card.Group className="expert-cards">
            {/* API Render */}
            <ExpertCards />
            <ExpertCards />
            <ExpertCards />
            <ExpertCards />
          </Card.Group>
        </>
      ) : (
        <div className="no-cont-wrap">
          <Icon className="no-contents80" />
          <span className="blind">콘텐츠 없음</span>
          <div className="text">검색된 Expert가 없습니다.</div>
        </div>
      )}
    </div>
  );
};

export default Instructor;

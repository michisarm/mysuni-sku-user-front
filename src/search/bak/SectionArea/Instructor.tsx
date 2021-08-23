import React, { useState } from 'react';
import { Icon, Card, Segment, Button } from 'semantic-ui-react';
import ExpertCards from '../Components/ExpertCards';
import CommentsSort from '../Components/CommentsSort';
import { useExpert } from '../Components/SearchFilter';
import { Area } from 'tracker/model';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

const Instructor: React.FC = () => {
  const [insertApi, getInsertApi] = useState<boolean>(true);
  const expert = useExpert();

  return (
    <Segment className="full">
      <div className="sort-reult" data-area={Area.SEARCH}>
        {/* <CommentsSort /> */}
        <div className="section">
          <div className="text01">
            <PolyglotText id="통검-전학강-강사" defaultString="강사" />(
            {expert ? expert.length : 0})
          </div>
          {expert && expert.length > 0 ? (
            <>
              {/* <div className="fn-button">
                <Button icon className="right btn-blue">
                  View all <Icon className="morelink" />
                </Button>
              </div> */}
              <Card.Group className="expert-cards">
                {/* API Render */}
                <ExpertCards />
              </Card.Group>
            </>
          ) : (
            <div className="section">
              <div className="no-cont-wrap">
                <Icon className="no-contents80" />
                <span className="blind">
                  <PolyglotText
                    id="통검-전학강-콘텐츠없음"
                    defaultString="콘텐츠 없음"
                  />
                </span>
                <div className="text">
                  <PolyglotText
                    id="통검-전학강-강사없음"
                    defaultString="검색된 강사가 없습니다."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Segment>
  );
};

export default Instructor;

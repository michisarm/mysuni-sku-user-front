import React from 'react';
import BoxCard from '../Components/BoxCard';
import { Icon, Segment } from 'semantic-ui-react';
import { useDisplayCard } from '../Components/SearchFilter';

const LearningCard: React.FC = () => {
  const card = useDisplayCard();
  return (
    <Segment className="full">
      <div className="sort-reult">
        {/* <CommentsSort /> */}
        <div className="section">
          <div className="text01">학습카드({card ? card.length : 0})</div>
          {card && card.length > 0 ? (
            <>
              {/* <div className="fn-button">
                <Button icon className="right btn-blue">
                  View all <Icon className="morelink" />
                </Button>
              </div> */}
              {/* API Render */}
              <BoxCard />
            </>
          ) : (
            <div className="no-cont-wrap">
              <Icon className="no-contents80" />
              <span className="blind">콘텐츠 없음</span>
              <div className="text">검색된 과정이 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </Segment>
  );
};

export default LearningCard;

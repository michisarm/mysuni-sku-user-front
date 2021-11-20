import { useHotTopicDetailViewModel } from 'hotTopic/store/HotTopicStore';
import React from 'react';
import { HotTopicCardView } from '../view/HotTopicCardView';
import { HotTopicOtherListContainer } from './HotTopicOtherListContainer';

export function HotTopicCardListContainer() {
  const hotTopicDetail = useHotTopicDetailViewModel();

  return (
    <>
      <div className="topic-content">
        <div className="list-area">
          <div className="topic-list-wrap">
            {hotTopicDetail?.cards?.map((card) => (
              <HotTopicCardView key={`hottopic-card-${card.id}`} card={card} />
            ))}
          </div>
        </div>
        <HotTopicOtherListContainer />
      </div>
    </>
  );
}

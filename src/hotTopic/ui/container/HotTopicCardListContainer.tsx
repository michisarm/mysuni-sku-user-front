import {
  useHotTopicDetailViewModel,
  useHotTopicListViewModel,
} from 'hotTopic/store/HotTopicStore';
import React from 'react';
import { HotTopicCardView } from '../view/HotTopicCardView';
import { HotTopicOtherListContainer } from './HotTopicOtherListContainer';

export function HotTopicCardListContainer() {
  const hotTopicDetail = useHotTopicDetailViewModel();
  const hotTopicList = useHotTopicListViewModel();

  return (
    <>
      <div className="topic-content">
        <div className="list-area">
          <div className="topic-list-wrap">
            {hotTopicDetail?.cards?.map((card) => (
              <HotTopicCardView card={card} />
            ))}
          </div>
        </div>
        {hotTopicList && hotTopicList.length > 0 && (
          <HotTopicOtherListContainer />
        )}
      </div>
    </>
  );
}

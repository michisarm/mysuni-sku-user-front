import {
  useHotTopicDetailViewModel,
  useHotTopicListViewModel,
} from 'hotTopic/store/HotTopicStore';
import React from 'react';
import { Segment } from 'semantic-ui-react';
import { HotTopicCardView } from '../view/HotTopicCardView';
import { HotTopicOtherListView } from '../view/HotTopicOtherListView';

export function HotTopicCardListContainer() {
  const hotTopicDetail = useHotTopicDetailViewModel();
  const hotTopicList = useHotTopicListViewModel();

  return (
    <>
      <div className="topic-content">
        <Segment className="full">
          <div className="list-area">
            <div className="topic-list-wrap">
              {hotTopicDetail?.cards?.map((card) => (
                <HotTopicCardView card={card} />
              ))}
            </div>
          </div>
          {hotTopicList && hotTopicList.length > 0 && <HotTopicOtherListView />}
        </Segment>
      </div>
    </>
  );
}

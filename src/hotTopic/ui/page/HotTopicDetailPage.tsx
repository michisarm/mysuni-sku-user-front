import { requestHotTopic } from 'hotTopic/service/requestHotTopic';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Ref, Segment, Sticky } from 'semantic-ui-react';
import { ContentLayout } from 'shared';
import { HotTopicCardListContainer } from '../container/HotTopicCardListContainer';
import { HotTopicTitleContainer } from '../container/HotTopicTitleContainer';

interface Params {
  id: string;
}

export function HotTopicDetailPage() {
  const { id } = useParams<Params>();
  useEffect(() => {
    requestHotTopic(id);
  }, [id]);

  const contextRef = useRef(null);
  return (
    <ContentLayout className="topic-wrap" breadcrumb={[{ text: 'Hot Topic' }]}>
      <Ref innerRef={contextRef}>
        <Segment className="full">
          <Sticky context={contextRef}>
            <HotTopicTitleContainer />
          </Sticky>
          <HotTopicCardListContainer />
        </Segment>
      </Ref>
    </ContentLayout>
  );
}

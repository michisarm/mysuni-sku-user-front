import {
  requestHotTopicLike,
  requestHotTopicMyLike,
} from 'hotTopic/service/requestHotTopicLike';
import {
  useHotTopicDetailViewModel,
  useHotTopicLikeInfo,
} from 'hotTopic/store/HotTopicStore';
import React, { useEffect } from 'react';
import { HotTopicTitleView } from '../view/HotTopicTitleView';

export function HotTopicTitleContainer() {
  const hotTopicDetail = useHotTopicDetailViewModel();
  useEffect(() => {
    requestHotTopicLike();
  }, [hotTopicDetail?.likeFeedbackId]);

  const hotTopicLikeInfo = useHotTopicLikeInfo();
  useEffect(() => {
    requestHotTopicMyLike();
  }, [hotTopicLikeInfo?.feedbackId]);

  return (
    <div className="topic-title">
      <div className="page-title-wrap">
        {hotTopicDetail && (
          <HotTopicTitleView
            hotTopicDetail={hotTopicDetail}
            hotTopicLikeInfo={hotTopicLikeInfo}
          />
        )}
      </div>
    </div>
  );
}

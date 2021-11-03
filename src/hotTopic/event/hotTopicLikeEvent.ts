import {
  likeByFeedbackId,
  unlikeByFeedbackId,
} from 'hotTopic/api/hotTopicLikeApi';
import {
  getHotTopicLikeInfo,
  setHotTopicLikeInfo,
} from 'hotTopic/store/HotTopicStore';

export function likeHotTopic() {
  const likeInfo = getHotTopicLikeInfo();
  if (likeInfo !== undefined) {
    setHotTopicLikeInfo({ ...likeInfo, count: likeInfo.count + 1, my: true });

    likeByFeedbackId(likeInfo.feedbackId);
  }
}

export function unlikeHotTopic() {
  const likeInfo = getHotTopicLikeInfo();
  if (likeInfo !== undefined) {
    setHotTopicLikeInfo({ ...likeInfo, count: likeInfo.count - 1, my: false });

    unlikeByFeedbackId(likeInfo.feedbackId);
  }
}

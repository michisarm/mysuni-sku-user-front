import {
  countLikeByFeedbackId,
  findMyLikeByFeedbackId,
} from 'hotTopic/api/hotTopicLikeApi';
import {
  getHotTopicDetailViewModel,
  getHotTopicLikeInfo,
  setHotTopicLikeInfo,
} from 'hotTopic/store/HotTopicStore';

export async function requestHotTopicLike() {
  const hotTopicDetail = getHotTopicDetailViewModel();

  if (hotTopicDetail === undefined) {
    return;
  }

  const likeCount = await countLikeByFeedbackId(hotTopicDetail?.likeFeedbackId);
  const hotTopicLikeInfo = getHotTopicLikeInfo();
  setHotTopicLikeInfo({
    ...hotTopicLikeInfo,
    feedbackId: hotTopicDetail.likeFeedbackId,
    count: likeCount,
  });
}

export async function requestHotTopicMyLike() {
  const hotTopicDetail = getHotTopicDetailViewModel();

  if (hotTopicDetail === undefined) {
    return;
  }

  const myLike = await findMyLikeByFeedbackId(hotTopicDetail?.likeFeedbackId);
  const hotTopicLikeInfo = getHotTopicLikeInfo();
  if (hotTopicLikeInfo !== undefined) {
    setHotTopicLikeInfo({
      ...hotTopicLikeInfo,
      my: myLike !== undefined && myLike !== null && myLike !== '',
    });
  }
}

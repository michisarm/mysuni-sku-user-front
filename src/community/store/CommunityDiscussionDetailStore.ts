import { CommunityDiscussionDetail } from '../viewModel/CommunityDiscussionDetail';
import { createStore } from './Store';

const [
  setCommunityDiscussionDetailItem,
  onCommunityDiscussionDetailItem,
  getCommunityDiscussionDetailItem,
] = createStore<CommunityDiscussionDetail>();

export {
  setCommunityDiscussionDetailItem,
  onCommunityDiscussionDetailItem,
  getCommunityDiscussionDetailItem,
};

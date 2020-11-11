import { createStore } from './Store';

const [
    setCommunityCommentFeedbackId, 
    onCommunityCommentFeedbackId, 
    getCommunityCommentFeedbackId
] = createStore<string>();

export {
    setCommunityCommentFeedbackId, 
    onCommunityCommentFeedbackId, 
    getCommunityCommentFeedbackId
}
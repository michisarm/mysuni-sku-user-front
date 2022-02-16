import LectureState from '../viewModel/LectureState';
import { createStore } from './Store';

const [setLectureState, onLectureState, getLectureState, useLectureState] =
  createStore<LectureState>();

const [
  setLectureDiscussionPrivateComment,
  onLectureDiscussionPrivateComment,
  getLectureDiscussionPrivateComment,
  useLectureDiscussionPrivateComment,
] = createStore<boolean>();

export {
  setLectureState,
  onLectureState,
  getLectureState,
  useLectureState,
  setLectureDiscussionPrivateComment,
  onLectureDiscussionPrivateComment,
  getLectureDiscussionPrivateComment,
  useLectureDiscussionPrivateComment,
};

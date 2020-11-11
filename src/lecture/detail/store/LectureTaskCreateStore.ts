import { LectureTaskDetail } from '../viewModel/LectureTaskDetail';
import { createStore } from './Store';

const [setLectureTaskCreateItem, onLectureTaskCreateItem, getLectureTaskCreateItem] = createStore<
LectureTaskDetail
>();

const [setLectureTaskCreateBoardId, onLectureTaskCreateBoardId, getLectureTaskCreateBoardId] = createStore<
string
>();

export {
  setLectureTaskCreateItem,
  onLectureTaskCreateItem,
  getLectureTaskCreateItem,
  setLectureTaskCreateBoardId, 
  onLectureTaskCreateBoardId, 
  getLectureTaskCreateBoardId
};

import LectureDescription from '../viewModel/LectureOverview/LectureDescription';
import LectureInstructor from '../viewModel/LectureOverview/LectureInstructor';
import LecturePrecourse from '../viewModel/LectureOverview/LecturePrecourse';
import LectureSubcategory from '../viewModel/LectureOverview/LectureSubcategory';
import LectureSummary from '../viewModel/LectureOverview/LectureSummary';
import LectureTags from '../viewModel/LectureOverview/LectureTags';
import { createStore } from './Store';

const [setLectureSummary, onLectureSummary, getLectureSummary] = createStore<
  LectureSummary
>();

const [
  setLectureDescription,
  onLectureDescription,
  getLectureDescription,
] = createStore<LectureDescription>();
const [
  setLectureSubcategory,
  onLectureSubcategory,
  getLectureSubcategory,
] = createStore<LectureSubcategory>();
const [setLectureTags, onLectureTags, getLectureTags] = createStore<
  LectureTags
>();
const [
  setLectureInstructor,
  onLectureInstructor,
  getLectureInstructor,
] = createStore<LectureInstructor>();

const [
  setLecturePrecourse,
  onLecturePrecourse,
  getLecturePrecourse,
] = createStore<LecturePrecourse>();

export {
  setLectureSummary,
  onLectureSummary,
  getLectureSummary,
  setLectureDescription,
  onLectureDescription,
  getLectureDescription,
  setLectureSubcategory,
  onLectureSubcategory,
  getLectureSubcategory,
  setLectureTags,
  onLectureTags,
  getLectureTags,
  setLectureInstructor,
  onLectureInstructor,
  getLectureInstructor,
  setLecturePrecourse,
  onLecturePrecourse,
  getLecturePrecourse,
};

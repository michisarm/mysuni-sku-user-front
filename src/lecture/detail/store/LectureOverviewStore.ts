import LectureBadge from '../viewModel/LectureOverview/LectureBadge';
import LectureCourseSummary from '../viewModel/LectureOverview/LectureCourseSummary';
import LectureCubeSummary from '../viewModel/LectureOverview/LectureCubeSummary';
import LectureDescription from '../viewModel/LectureOverview/LectureDescription';
import LectureInstructor from '../viewModel/LectureOverview/LectureInstructor';
import LecturePrecourse from '../viewModel/LectureOverview/LecturePrecourse';
import LectureSubcategory from '../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../viewModel/LectureOverview/LectureTags';
import { createStore } from './Store';

const [
  setLectureCubeSummary,
  onLectureCubeSummary,
  getLectureCubeSummary,
] = createStore<LectureCubeSummary>();

const [
  setLectureCourseSummary,
  onLectureCourseSummary,
  getLectureCourseSummary,
] = createStore<LectureCourseSummary>();

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

const [setLectureBadge, onLectureBadge, getLectureBadge] = createStore<
  LectureBadge
>();

export {
  setLectureCubeSummary,
  onLectureCubeSummary,
  getLectureCubeSummary,
  setLectureCourseSummary,
  onLectureCourseSummary,
  getLectureCourseSummary,
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
  setLectureBadge,
  onLectureBadge,
  getLectureBadge,
};

import InMyLectureCdo from '../model/InMyLectureCdo';
import LectureComment from '../viewModel/LectureComment/LectureComment';
import LectureBadge from '../viewModel/LectureOverview/LectureBadge';
import LectureCardSummary from '../viewModel/LectureOverview/LectureCardSummary';
import LectureCubeSummary from '../viewModel/LectureOverview/LectureCubeSummary';
import LectureDescription from '../viewModel/LectureOverview/LectureDescription';
import LectureFile from '../viewModel/LectureOverview/LectureFile';
import LectureInstructor from '../viewModel/LectureOverview/LectureInstructor';
import LecturePrecourse from '../viewModel/LectureOverview/LecturePrecourse';
import LectureRelations from '../viewModel/LectureOverview/LectureRelations';
import LectureReview from '../viewModel/LectureOverview/LectureReview';
import LectureSubcategory from '../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../viewModel/LectureOverview/LectureTags';
import { createStore } from './Store';

const [setLectureCubeSummary, onLectureCubeSummary, getLectureCubeSummary] =
  createStore<LectureCubeSummary>();

const [
  setLectureCardSummary,
  onLectureCardSummary,
  getLectureCardSummary,
  useLectureCardSummary,
] = createStore<LectureCardSummary>();

// course 학습완료표시 learningState 보기 위한 store
const [
  setLectureCardSummaryLearningState,
  onLectureCardSummaryLearningState,
  getLectureCardSummaryLearningState,
] = createStore<LectureCardSummary>();

const [setLectureDescription, onLectureDescription, getLectureDescription] =
  createStore<LectureDescription>();
const [setLectureSubcategory, onLectureSubcategory, getLectureSubcategory] =
  createStore<LectureSubcategory>();
const [setLectureTags, onLectureTags, getLectureTags] =
  createStore<LectureTags>();
const [
  setLectureInstructor,
  onLectureInstructor,
  getLectureInstructor,
  useLectureInstructor,
] = createStore<LectureInstructor>();

const [setLecturePrecourse, onLecturePrecourse, getLecturePrecourse] =
  createStore<LecturePrecourse>();

const [setLectureBadge, onLectureBadge, getLectureBadge] =
  createStore<LectureBadge>();

const [setLectureFile, onLectureFile, getLectureFile] =
  createStore<LectureFile>();

const [setLectureComment, onLectureComment, getLectureComment] =
  createStore<LectureComment>();

const [setLectureReview, onLectureReview, getLectureReview] =
  createStore<LectureReview>();

const [setInMyLectureCdo, onInMyLectureCdo, getInMyLectureCdo] =
  createStore<InMyLectureCdo>();

const [setLectureRelations, onLectureRelations, getLectureRelations] =
  createStore<LectureRelations>();

export {
  setLectureCubeSummary,
  onLectureCubeSummary,
  getLectureCubeSummary,
  setLectureCardSummary,
  onLectureCardSummary,
  getLectureCardSummary,
  useLectureCardSummary,
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
  useLectureInstructor,
  onLectureInstructor,
  getLectureInstructor,
  setLecturePrecourse,
  onLecturePrecourse,
  getLecturePrecourse,
  setLectureBadge,
  onLectureBadge,
  getLectureBadge,
  setLectureFile,
  onLectureFile,
  getLectureFile,
  setLectureComment,
  onLectureComment,
  getLectureComment,
  setLectureReview,
  onLectureReview,
  getLectureReview,
  setInMyLectureCdo,
  onInMyLectureCdo,
  getInMyLectureCdo,
  setLectureRelations,
  onLectureRelations,
  getLectureRelations,
  setLectureCardSummaryLearningState,
  onLectureCardSummaryLearningState,
  getLectureCardSummaryLearningState,
};

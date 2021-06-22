import { TaskViewType } from '../service/useLectureTask/useLectureTaskViewType';
import { LectureNote } from '../viewModel/LectureNote';
import { LectureTask } from '../viewModel/LectureTask';
import { LectureTaskDetail } from '../viewModel/LectureTaskDetail';
// import {
//   LectureTestItem,
//   LectureTestAnswerItem,
// } from '../viewModel/LectureTest';
import { createStore } from './Store';

const initialStore: LectureNote = {
  results: [],
  totalCount: 0
};

const [
  setLectureNoteItem,
  onLectureNoteItem,
  getLectureNoteItem,
  useLectureNoteItem
] = createStore<LectureNote>(initialStore);

const [
  setLectureOriginNoteItem,
  onLectureOriginNoteItem,
  getLectureOriginNoteItem,
  useLectureOriginNoteItem
] = createStore<LectureNote>({...initialStore});

const [
  setLectureNoteTab,
  onLectureNoteTab,
  getLectureNoteTab,
  useLectureNoteTab
] = createStore<boolean>();

const [
  setLectureNoteWriteState,
  onLectureNoteWriteState,
  getLectureNoteWriteState,
  useLectureNoteWriteState
] = createStore<boolean>();

const [
  setLectureNotePopupState,
  onLectureNotePopupState,
  getLectureNotePopupState,
  useLectureNotePopupState
] = createStore<boolean>();

export {
  setLectureNoteItem,
  onLectureNoteItem,
  getLectureNoteItem,
  useLectureNoteItem,
  setLectureOriginNoteItem,
  onLectureOriginNoteItem,
  getLectureOriginNoteItem,
  useLectureOriginNoteItem,
  setLectureNoteTab,
  onLectureNoteTab,
  getLectureNoteTab,
  useLectureNoteTab,
  setLectureNoteWriteState,
  onLectureNoteWriteState,
  getLectureNoteWriteState,
  useLectureNoteWriteState,
  setLectureNotePopupState,
  onLectureNotePopupState,
  getLectureNotePopupState,
  useLectureNotePopupState
};

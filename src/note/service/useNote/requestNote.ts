import {
  findNoteList,
  findNoteById,
  findCubeList,
  findAllCollege,
  findNoteCount,
  findNoteExcelList,
} from '../../api/noteApi';
import { setNote } from '../../store/NoteStore';
import { SearchBox, getEmptySearchBox } from '../../model/SearchBox';
import { setNoteList, getNoteList } from '../../store/NoteListStore';
import { OffsetElementList } from '@nara.platform/accent';
import Note from '../../model/Note';
import { setNoteCount } from '../../store/NoteCountStore';
import { getSearchBox } from '../../store/SearchBoxStore';
import moment from 'moment';
import { setColleges } from '../../store/CollegesStore';
import { setNoteWithLecture } from '../../store/NoteWithLectureStore';
import {
  setNoteWithLectureList,
  getNoteWithLectureList,
} from '../../store/NoteWithLectureListStore';
import CollegeService from '../../../college/present/logic/CollegeService';

export function requestNote(noteId: string) {
  findNoteById(noteId).then(async (result) => {
    if (result) {
      setNoteWithLecture(result);
    }
  });
}

// export function requestNoteList(searchBox: SearchBox) {
export function requestNoteList() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  // return findNoteList(cardId, cubeId, limit, offset).then(async result => {
  return findNoteList(searchBox).then(async (result) => {
    if (result) {
      // setNoteList(result);
      return result;
    }
  });
}

export function requestCubeList() {
  let searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.content === undefined) {
    searchBox = getEmptySearchBox();
  }

  findCubeList(searchBox).then(async (result) => {
    if (result) {
      setNoteWithLectureList(result);
    }
  });
}

export function requestAppendCubeList() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  findCubeList(searchBox).then(async (result) => {
    if (result) {
      // note or cube 명칭 정리
      const noteWithLectureList = getNoteWithLectureList();
      noteWithLectureList &&
        setNoteWithLectureList({
          ...noteWithLectureList,
          results: noteWithLectureList?.results.concat(result.results),
        });
    }
  });
}

export function requestNoteExcelList() {
  return findNoteExcelList().then(async (result) => {
    if (result) {
      return result;
    }
  });
}

export function requestColleges() {
  // return findAllCollege().then(async (result) => {
  //   if (result) {
  //     // note or cube 명칭 정리
  //     // return result;
  //     setColleges({ ...result });
  //   }
  // });
  setColleges(CollegeService.instance.detailAllColleges);
}

export function requestNoteCount(flag?: string) {
  let searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.createStartDate === undefined) {
    searchBox = getEmptySearchBox();
  }

  return findNoteCount(
    flag && flag === 'searchBox' ? searchBox : undefined
  ).then(async (result) => {
    if (result) {
      // setNoteList(result);
      !flag && setNoteCount(result);
      return result;
    }
  });
}

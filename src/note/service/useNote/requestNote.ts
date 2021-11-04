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
import { getNoteCount, setNoteCount } from '../../store/NoteCountStore';
import { getSearchBox } from '../../store/SearchBoxStore';
import moment from 'moment';
import { setColleges } from '../../store/CollegesStore';
import { setNoteWithLecture } from '../../store/NoteWithLectureStore';

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
      setNoteList(result);
    }
  });
}

export function requestAppendCubeList() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  findCubeList(searchBox).then(async (result) => {
    if (result) {
      // note or cube 명칭 정리
      const noteList = getNoteList();
      const count = getNoteCount();

      if (noteList) {
        //
        setNoteList({
          ...noteList,
          results: noteList?.results.concat(result.results),
        });

        setNoteCount(
          noteList.results
            .map((note) => note.noteContents.length || 0)
            .reduce((p, n) => p + n)
        );
      }
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
  return findAllCollege().then(async (result) => {
    if (result) {
      // note or cube 명칭 정리
      // return result;
      setColleges(result);
    }
  });
}

export function requestNoteCount(flag?: string) {
  let searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.startDate === undefined) {
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

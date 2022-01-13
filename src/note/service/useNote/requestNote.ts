import {
  // findNoteList,
  findNoteById,
  findNoteList,
  findAllCollege,
  findNoteCount,
} from '../../api/noteApi';
import { SearchBox, getEmptySearchBox } from '../../model/SearchBox';
import { setNoteList, getNoteList } from '../../store/NoteListStore';
import { setNoteCount } from '../../store/NoteCountStore';
import { getSearchBox } from '../../store/SearchBoxStore';
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
// export function requestNoteList() {
//   const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();
//
//   // return findNoteList(cardId, cubeId, limit, offset).then(async result => {
//   return findNoteList(searchBox).then(async (result) => {
//     if (result) {
//       // setNoteList(result);
//       return result;
//     }
//   });
// }

export async function requestCubeList() {
  let searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.content === undefined) {
    searchBox = getEmptySearchBox();
  }

  findNoteList(searchBox).then(async (result) => {
    if (result) {
      result.results.map((note) => {
        const noteContents = note.noteContents;

        noteContents.sort(
          (a, b) =>
            (b.modifiedTime === 0 ? b.registeredTime : b.modifiedTime) -
            (a.modifiedTime === 0 ? a.registeredTime : a.modifiedTime)
        );

        if (note.cubeType === 'Video' || note.cubeType === 'Audio') {
          noteContents.sort((a, b) => b.playSecond - a.playSecond);
        }

        note.noteContents = noteContents;
      });

      setNoteList(result);
    }
  });
}

export function requestAppendCubeList() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  findNoteList(searchBox).then(async (result) => {
    if (result) {
      // note or cube 명칭 정리
      const noteList = getNoteList();

      if (noteList) {
        //
        setNoteList({
          ...noteList,
          results: noteList?.results.concat(result.results),
        });
      }
    }
  });
}

export function requestNoteExcelList() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  searchBox.offset = 0;
  searchBox.limit = 99999999;
  searchBox.startDate = undefined;
  searchBox.endDate = undefined;

  return findNoteList(searchBox).then(async (result) => {
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

export async function requestNoteCount() {
  let searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox === undefined) {
    searchBox = getEmptySearchBox();
  }

  return findNoteCount(searchBox).then(async (result) => {
    if (result) {
      // setNoteList(result);
      setNoteCount(result);
      return result;
    }
  });
}

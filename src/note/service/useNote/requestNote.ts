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

export function requestCubeList() {
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

      setNoteCount(
        result.results && result.results.length > 0
          ? result.results
              .map(
                (note) => (note.noteContents && note.noteContents.length) || 0
              )
              .reduce((p, n) => p + n)
          : 0
      );
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

        // setNoteCount(
        //   result.results
        //     .map((note) => note.noteContents.length || 0)
        //     .reduce((p, n) => p + n)
        // );
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

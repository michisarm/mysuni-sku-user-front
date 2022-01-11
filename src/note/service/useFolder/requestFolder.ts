import {
  findFolders,
  findNoteListByFolderId,
  findNoteCountByFolderId,
} from '../../api/noteApi';
import { setFolder } from '../../store/FolderStore';
import { SearchBox, getEmptySearchBox } from '../../model/SearchBox';
import { getSearchBox } from '../../store/SearchBoxStore';
import { setNoteList, getNoteList } from '../../store/NoteListStore';
import { setFolderNoteCount } from '../../store/FolderNoteCountStore';

export async function requestFolder() {
  findFolders().then(async (result) => {
    if (result) {
      setFolder(result);
    }
  });
}

export async function requestCubeListByFolderId() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.folderId === '' || searchBox.folderId === undefined) {
    searchBox.folderId = undefined;
  }

  findNoteListByFolderId(searchBox).then(async (result) => {
    if (result) {
      // note or cube 명칭 정리
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

export async function requestNoteCountByFolderId() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.folderId === '' || searchBox.folderId === undefined) {
    searchBox.folderId = undefined;
  }

  return findNoteCountByFolderId(searchBox.folderId).then(async (result) => {
    await setFolderNoteCount(result);
  });
}

export async function requestAppendCubeListByFolderId() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();
  if (searchBox.folderId === '') {
    searchBox.folderId = undefined;
  }

  findNoteListByFolderId(searchBox).then(async (result) => {
    if (result) {
      // note or cube 명칭 정리
      const noteList = getNoteList();
      noteList &&
        setNoteList({
          ...noteList,
          results: noteList?.results.concat(result.results),
        });
    }
  });
}

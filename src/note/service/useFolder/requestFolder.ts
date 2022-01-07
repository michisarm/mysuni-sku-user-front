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

export function requestFolder() {
  findFolders().then(async (result) => {
    if (result) {
      setFolder(result);
    }
  });
}

export function requestCubeListByFolderId() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.folderId === '' || searchBox.folderId === undefined) {
    searchBox.folderId = undefined;
  }

  findNoteListByFolderId(searchBox).then(async (result) => {
    if (result) {
      // note or cube 명칭 정리
      setNoteList(result);
    }
  });
}

export function requestNoteCountByFolderId() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.folderId === '' || searchBox.folderId === undefined) {
    searchBox.folderId = undefined;
  }

  return findNoteCountByFolderId(searchBox.folderId).then(async (result) => {
    await setFolderNoteCount(result);
  });
}

export function requestAppendCubeListByFolderId() {
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

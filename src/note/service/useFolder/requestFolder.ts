import {
  findFolder, findNoteListByFolderId, findNoteCountByFolderId,
} from '../../api/noteApi';
import { setFolder } from '../../store/FolderStore';
import { SearchBox, getEmptySearchBox } from '../../model/SearchBox';
import { getSearchBox } from '../../store/SearchBoxStore';
import { setNoteList, getNoteList } from '../../store/NoteListStore';
import { setFolderNoteCount } from '../../store/FolderNoteCountStore';


export function requestFolder() {
  findFolder().then(async result => {
    if (result) {
      setFolder(result);
    }
  });
}

export function requestCubeListByFolderId() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.folderId === '') {
    searchBox.folderId = '0000'
  }


  findNoteListByFolderId(searchBox).then(async result => {
    if (result) {
      // note or cube 명칭 정리
      setNoteList(result);
    }
  });
}

export function requestNoteCountByFolderId() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();

  if (searchBox.folderId === '') {
    searchBox.folderId = '0000'
  }

  return findNoteCountByFolderId(searchBox.folderId || '0000').then(async result => {
    if (result) {
      setFolderNoteCount(result);
      return result;
    }
  });
}

export function requestAppendCubeListByFolderId() {
  const searchBox: SearchBox = getSearchBox() || getEmptySearchBox();
  if (searchBox.folderId === '') {
    searchBox.folderId = '0000'
  }
  findNoteListByFolderId(searchBox).then(async result => {
    if (result) {
      // note or cube 명칭 정리
      const noteList = getNoteList();
      noteList && setNoteList({ ...noteList, results: noteList?.results.concat(result.results) });
    }
  });
}

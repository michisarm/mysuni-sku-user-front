import {
  findFolder, findNoteListByFolderId, findNoteCountByFolderId,
} from '../../api/noteApi';
import { setFolder } from '../../store/FolderStore';
import { SearchBox, getEmptySearchBox } from '../../model/SearchBox';
import { getSearchBox } from '../../store/SearchBoxStore';
import { setNoteList } from '../../store/NoteListStore';


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



export function requestNoteCountByFolderId(folderId: string) {
  if (folderId === '') {
    folderId = '0000'
  }
  return findNoteCountByFolderId(folderId).then(async result => {
    if (result) {
      return result;
    }
  });
}

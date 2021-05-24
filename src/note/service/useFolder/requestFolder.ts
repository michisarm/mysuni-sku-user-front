import {
  findFolder, findNoteListByFolderId,
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
  findNoteListByFolderId(searchBox).then(async result => {
    if (result) {
      // note or cube 명칭 정리
      setNoteList(result);
    }
  });
}
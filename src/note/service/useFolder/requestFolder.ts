import {
  findFolder,
} from '../../api/noteApi';
import { setFolder } from '../../store/FolderStore';

export function requestFolder() {
  findFolder().then(async result => {
    if (result) {
      setFolder(result);
    }
  });
}

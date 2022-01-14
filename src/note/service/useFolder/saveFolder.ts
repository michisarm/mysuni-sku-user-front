import { registerFolder, modifyFolder } from '../../api/noteApi';
import Folder from '../../model/Folder';

export async function saveFolder(folder: Folder, flag: string): Promise<any> {
  if (folder?.folders && folder?.folders.idNames) {
    if (flag === 'register') {
      return registerFolder(folder);
    } else {
      return modifyFolder(folder);
    }
  }
}

import { registerFolder, modifyFolder, modifyOrder } from "../../api/noteApi";
import Folder from "../../model/Folder";

export async function saveFolder(
  folder: Folder,
  flag: string
): Promise<any> {
  if (folder?.folders && folder?.folders.idNames) {
    if (flag === 'register') {
      return registerFolder(folder);
    } else if (flag === 'order') {
      return modifyOrder(
        folder
      );
    } else {
      return modifyFolder(
        folder
      );
    }
  }
}



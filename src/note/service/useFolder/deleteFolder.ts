import { deleteFolder } from '../../api/noteApi';

export function deleteFolderById(id: string) {
  deleteFolder(id);
}

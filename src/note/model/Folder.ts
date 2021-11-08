import { IdNameList, IdName } from '../../shared/model';

export default interface Folder {
  id: string;
  folders: IdNameList;
  denizenId?: string;
  modifiedTime?: number;
  registeredTime?: number;
}

export function getFolderItem(name: string): Folder {
  const idname: IdName = new IdName();
  idname.name = name;

  return {
    id: '',
    folders: {
      idNames: [idname],
    },
  };
}

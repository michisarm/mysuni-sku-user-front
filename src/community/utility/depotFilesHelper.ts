import File from '../model/File';

import depot from '@nara.drama/depot';

export function getFiles(fileBoxIds: string[]): Promise<File[]> {
  return Promise.all(
    fileBoxIds.map(fileBoxId => {
      return depot.getDepotFiles(fileBoxId);
    })
  ).then(filesArray => {
    const next: File[] = [];
    filesArray.forEach(files => {
      if (Array.isArray(files)) {
        files.forEach(file => {
          next.push({ id: file.id, name: file.name });
        });
      } else {
        next.push({ id: files.id, name: files.name });
      }
    });
    return next;
  });
}

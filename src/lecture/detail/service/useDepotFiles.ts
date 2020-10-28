import { useEffect, useState } from 'react';
import depot from '@nara.drama/depot';
import File from '../model/File';
import { getFiles } from '../utility/depotFilesHelper';

type Value = File[] | undefined;

export function useDepotFiles(fileBoxIds: string[]): [Value] {
  const [value, setValue] = useState<File[]>();

  useEffect(() => {
    if (fileBoxIds.length === 0) {
      setValue([]);
      return;
    }
    getFiles(fileBoxIds).then(next => setValue(next));
  }, []);

  return [value];
}

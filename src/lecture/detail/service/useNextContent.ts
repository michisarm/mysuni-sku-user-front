import { useEffect, useState } from 'react';
import { getLectureParams } from '../store/LectureParamsStore';
import { useLectureStructure } from '../store/LectureStructureStore';
import { getActiveStructureItem } from '../utility/lectureStructureHelper';
import { LectureStructureItem } from '../viewModel/LectureStructure';

type Value = LectureStructureItem | undefined;

export function useNextContent(): Value {
  const [value, setValue] = useState<Value>();
  const lectureStructure = useLectureStructure();

  useEffect(() => {
    const params = getLectureParams();
    if (lectureStructure === undefined || params === undefined) {
      setValue(undefined);
      return;
    }
    const current = getActiveStructureItem(params.pathname);
    if (current === undefined) {
      setValue(undefined);
      return;
    }
    const next =
      lectureStructure.cubes.find(({ order }) => order === current.order + 1) ||
      lectureStructure.discussions.find(
        ({ order }) => order === current.order + 1
      );
    if (next?.type === 'DISCUSSION') {
      next.name = `${next.name}`;
    }
    setValue(next);
  }, [lectureStructure]);

  return value;
}

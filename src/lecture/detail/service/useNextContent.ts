import { useEffect, useState } from 'react';
import { useLectureStructure } from '../store/LectureStructureStore';
import { getActiveStructureItem } from '../utility/lectureStructureHelper';
import { LectureStructureItem } from '../viewModel/LectureStructure';

type Value = LectureStructureItem | undefined;

export function useNextContent(): Value {
  const [value, setValue] = useState<Value>();
  const lectureStructure = useLectureStructure();

  useEffect(() => {
    if (lectureStructure === undefined) {
      setValue(undefined);
      return;
    }
    const current = getActiveStructureItem();
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
      next.name = `[토론하기] ${next.name}`;
    }
    setValue(next);
  }, [lectureStructure]);

  return value;
}

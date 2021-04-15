import { useState, useEffect } from 'react';
import { BadgeCategory } from '../model/BadgeCategory';
import { find, isEmpty } from 'lodash';

export function useBadgeSlide(categories: BadgeCategory[]) {
  const isCategories = !isEmpty(categories);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [isNext, setIsNext] = useState('next-on');
  const [isPrev, setIsPrev] = useState('prev-off');
  const [sliceCategories, setSliceCategories] = useState(
    categories.slice(0, 5)
  );

  let firstDisplayOrder: number | undefined;
  let lastDisplayOrder: number | undefined;

  if (isCategories) {
    firstDisplayOrder = categories[0].displayOrder;
    lastDisplayOrder = categories[categories.length - 1].displayOrder;
  }

  useEffect(() => {
    setSliceCategories(categories && categories.slice(startIndex, endIndex));
  }, [startIndex, endIndex, categories]);

  useEffect(() => {
    if (find(sliceCategories, { displayOrder: firstDisplayOrder })) {
      setIsPrev('prev-off');
    } else {
      setIsPrev('prev-on');
    }

    if (find(sliceCategories, { displayOrder: lastDisplayOrder })) {
      setIsNext('next-off');
    } else {
      setIsNext('next-on');
    }
  }, [sliceCategories]);

  const onClickNext = () => {
    if (endIndex >= categories.length) {
      return;
    }
    setStartIndex(startIndex + 5);
    setEndIndex(endIndex + 5);
  };

  const onClickPrev = () => {
    if (startIndex === 0) {
      return;
    }
    setStartIndex(startIndex - 5);
    setEndIndex(endIndex - 5);
  };

  return {
    sliceCategories,
    onClickNext,
    onClickPrev,
    isNext,
    isPrev,
  };
}

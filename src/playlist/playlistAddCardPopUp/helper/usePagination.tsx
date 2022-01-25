import { useMemo } from 'react';

function generatorNumberArray(startNumber: number, endNumber: number) {
  const pageList: number[] = [];

  while (startNumber <= endNumber) {
    pageList.push(startNumber);
    startNumber++;
  }
  return pageList;
}

function getPageList(
  selectedNumber: number,
  totalPageCount: number,
  pageLimit: number
) {
  if (totalPageCount <= pageLimit) {
    return generatorNumberArray(1, totalPageCount);
  }

  if (selectedNumber % pageLimit === 0) {
    const startNumber = selectedNumber - pageLimit + 1;
    return generatorNumberArray(startNumber, selectedNumber);
  }

  const startNumber = Math.floor(selectedNumber / pageLimit) * pageLimit || 1;
  const endNumber = Math.ceil(selectedNumber / pageLimit) * pageLimit;

  return generatorNumberArray(startNumber, endNumber);
}

/**
 * @param totalCount 데이터 전체 count
 * @param offset 내가 선택한 페이지
 * @param pageLimit 페이지 번호를 몇개씩 보여줄건지 limit이 5라면 1에서5까지
 * @param limit 보여줄 데이터의 limit limit이 10이라면 한페이지에서 10개씩 보여줌
 *
 */
export function usePagination(
  totalCount: number,
  offset: number,
  pageLimit: number,
  limit: number
) {
  const totalPageCount = useMemo(
    () => Math.ceil(totalCount / limit),
    [totalCount, limit]
  );

  const pageList = useMemo(() => {
    return getPageList(offset, totalPageCount, pageLimit);
  }, [offset, pageLimit, totalPageCount]);

  return pageList;
}

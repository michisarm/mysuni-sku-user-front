export default interface ElementList<T> {
  //
  results: T[];
  empty: boolean;
  totalCount: number;
  title: string | null;
  offset: number;
  limit: number;
}


export function getsetElementList<T>(): ElementList<T> {
  return {
    results: [],
    empty: true,
    totalCount: 0,
    title: null,
    offset: 0,
    limit: 0,
  };
}

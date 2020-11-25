import ElementList,{getsetElementList} from '../../model/ElementList';

export function GroupElementList<T>(
    response: any,
  ): ElementList<T> {
    //
    if (response && response.data) {
      const {
        results = [],
        empty = true,
        totalCount = 0,
        title = null,
      }: {
        results: T[];
        empty: boolean;
        totalCount: number;
        title: string | null;
      } = response.data;
      return {
        ...getsetElementList<T>(),
        results,
        empty,
        totalCount,
        title,
      };
    }
    return getsetElementList<T>();
  }
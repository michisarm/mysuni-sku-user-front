import { useEffect, useState } from 'react';

type UseApiValue<T> = [T | undefined, string | null | undefined];

interface Api<T, P> {
  (params: P): Promise<T | undefined>;
}

export function useApi<T, P>(api: Api<T, P>, params: P): UseApiValue<T> {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<string | null | undefined>();

  useEffect(() => {
    setData(undefined);
    setError(undefined);
    const response = api(params);
    response
      .then(next => {
        setData(next);
      })
      .catch(next => setError(next));
  }, [api, params]);

  return [data, error];
}

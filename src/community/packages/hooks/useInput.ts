import { useState, useCallback, ChangeEvent, useMemo } from 'react';

export function useInput(
  initialValue?: string
): [string | undefined, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [coreValue, setCoreValue] = useState<string>();

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCoreValue(e.target.value);
  }, []);

  const value = useMemo(() => {
    if (coreValue === undefined && initialValue !== undefined) {
      return initialValue;
    }
    return coreValue;
  }, [coreValue, initialValue]);

  return [value, onChange];
}

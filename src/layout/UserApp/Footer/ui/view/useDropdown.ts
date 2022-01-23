import { RefObject, useCallback, useEffect, useState } from 'react';

type ReturnValue = [boolean, () => void];

export function useDropdown(dropdownRef: RefObject<HTMLElement>): ReturnValue {
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    const onClickOutside = (event: any) => {
      if (opened && !dropdownRef.current?.contains(event.target)) {
        setOpened(false);
      }
    };
    window.addEventListener('click', onClickOutside);
    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, [dropdownRef, opened, setOpened]);

  const onToggle = useCallback(() => {
    setOpened(!opened);
  }, [opened, setOpened]);

  return [opened, onToggle];
}

import { useEffect, useState } from 'react';

interface Unsubscribe {
  (): void;
}

interface SubscribeCallback<T> {
  (next: T | undefined): void;
}

interface Set<T> {
  (next?: T): void;
}

interface On<T> {
  (callback: SubscribeCallback<T>, subscriberId: string): Unsubscribe;
}

interface Get<T> {
  (emptyValue?: T): T | undefined;
}

interface Use<T> {
  (emptyValue?: T): T | undefined;
}

let subscriberIdRef = 0;

export function createStore<T>(
  initialStore?: T,
): [Use<T>, Set<T>, Get<T>, On<T>] {
  let store: T | undefined;
  if (initialStore !== undefined) {
    store = initialStore;
  }
  const subscriberMap = new Map<string, SubscribeCallback<T>>();

  function dispatch(next?: T) {
    store = next;
    subscriberMap.forEach(callback => {
      callback(store);
    });
  }

  function subscribe(
    callback: SubscribeCallback<T>,
    subscriberId: string,
  ): Unsubscribe {
    subscriberMap.set(subscriberId, callback);
    // First Callback
    callback(store);
    return () => subscriberMap.delete(subscriberId);
  }

  function getValue(emptyValue?: T): T | undefined {
    return store || emptyValue;
  }

  function useStore(emptyValue?: T): T | undefined {
    const [subscriberId, setSubscriberId] = useState<string>();
    const [value, setValue] = useState<T | undefined>();
    useEffect(() => {
      const next = `useStore-${++subscriberIdRef}`;
      setSubscriberId(next);
    }, []);

    useEffect(() => {
      if (subscriberId === undefined) {
        return;
      }
      return subscribe(next => {
        setValue(next);
      }, subscriberId);
    }, [subscriberId]);

    return value || emptyValue;
  }

  return [useStore, dispatch, getValue, subscribe];
}

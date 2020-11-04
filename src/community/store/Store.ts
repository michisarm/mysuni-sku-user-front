interface Unsubscribe {
  (): void;
}

interface SubscribeCallback<T> {
  (next?: T): void;
}

interface Publish<T> {
  (next?: T, publisherId?: string): void;
}

interface Subscribe<T> {
  (callback: SubscribeCallback<T>, subscriberId: string): Unsubscribe;
}

interface GetCurrent<T> {
  (): T | undefined;
}

export function createStore<T>(
  initialStore?: T
): [Publish<T>, Subscribe<T>, GetCurrent<T>] {
  let store: T | undefined;
  if (initialStore !== undefined) {
    store = initialStore;
  }
  const subscriberMap = new Map<string, SubscribeCallback<T>>();

  function publish(next?: T, publisherId?: string) {
    store = next;
    subscriberMap.forEach(callback => {
      callback(store);
    });
  }

  function subscribe(
    callback: SubscribeCallback<T>,
    subscriberId: string
  ): Unsubscribe {
    subscriberMap.set(subscriberId, callback);
    // First Callback
    callback(store);
    return () => subscriberMap.delete(subscriberId);
  }

  function getCurrent(): T | undefined {
    return store;
  }

  return [publish, subscribe, getCurrent];
}

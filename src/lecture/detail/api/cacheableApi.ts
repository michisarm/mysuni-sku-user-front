interface ClearCache {
  (): void;
}

interface Api {
  (...args: any[]): Promise<any>;
}

interface CancelablePromise extends Promise<any> {
  cancel?: () => void;
}

function getCancelablePromise(promise: Promise<any>): CancelablePromise {
  let isCancelled = false;
  const cancelablePromise: CancelablePromise = new Promise(
    (resolve, reject) => {
      promise
        .then(response => {
          if (isCancelled) {
            reject();
          } else {
            resolve(response);
          }
        })
        .catch(err => reject(err));
    }
  );
  cancelablePromise.cancel = function cancel() {
    isCancelled = true;
  };

  return cancelablePromise;
}

export function createCacheApi<T extends Api>(api: T): [T, ClearCache] {
  const currentPromiseMap: Map<string, CancelablePromise> = new Map();
  const cacheDataMap: Map<string, any> = new Map();

  const clearCache: ClearCache = function() {
    currentPromiseMap.forEach(currentPromise => {
      if (currentPromise.cancel !== undefined) {
        currentPromise.cancel();
      }
    });
    currentPromiseMap.clear();
    cacheDataMap.clear();
  };

  const cacheApi: Api = function cacheApi(...args: any[]): CancelablePromise {
    const cacheData = cacheDataMap.get(JSON.stringify(args));
    if (cacheData !== undefined) {
      return Promise.resolve(cacheData);
    }
    const currentPromise = currentPromiseMap.get(JSON.stringify(args));
    if (currentPromise !== undefined) {
      return currentPromise;
    }
    const newCurrentPromise = getCancelablePromise(api(...args));
    currentPromiseMap.set(JSON.stringify(args), newCurrentPromise);
    return newCurrentPromise;
  };

  return [cacheApi as T, clearCache];
}

export interface TrackerInstance {
  userId: string;
  trackAction: Function;
  trackView: Function;
}

export interface TrackerProviderProps {
  value: TrackerInstance;
}

export interface TrackerParams {
  userId?: string;
  referer?: string;
  refererSearch?: string;
  area?: string;
  target?: HTMLElement;
}

export interface PathParams {
  path: string;
  search?: string;
  data?: TrackerParams;
  action?: string;
  historyAction?: string;
}

export type useStateRefType<T> = {
  valueRef: React.MutableRefObject<T>;
};

export type ErrorWithMessage = {
  message: string;
};

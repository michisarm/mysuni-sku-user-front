import { CheckableChannel } from '../viewmodel/CheckableChannel';
import { createStore } from './Store';

export const [
  setCheckableChannelsStore,
  onCheckableChannelsStore,
  getCheckableChannelsStore,
  useCheckableChannelsStore,
] = createStore<CheckableChannel[]>();

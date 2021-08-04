import { createStore } from './Store';
import { CollegeModel } from '../../college/model/CollegeModel';

type Channel = Pick<CollegeModel, 'id' | 'name' | 'langSupports'>;

const initialStore: Channel = {
  id: '',
  name: { ko: '', zh: '', en: '' },
  langSupports: [],
};

const [setChannelStore, onChannelStore, getChannelStore, useChannelStore] =
  createStore<Channel[]>([initialStore]);

export { setChannelStore, onChannelStore, getChannelStore, useChannelStore };

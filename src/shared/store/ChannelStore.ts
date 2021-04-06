import { createStore } from './Store'
import { CollegeModel } from '../../college/model/CollegeModel';

type Channel = Pick<CollegeModel, 'id' | 'name'>

const initialStore: Channel = {
  id: "",
  name: "",
}

const [
  setChannelStore,
  onChannelStore,
  getChannelStore,
] = createStore<Channel[]>([initialStore]);

export {
  setChannelStore,
  onChannelStore,
  getChannelStore,
};

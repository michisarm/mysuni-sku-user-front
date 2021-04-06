import { createStore } from './Store';
import { CineroomModel } from '../model/CineroomModel';

const initialStore: CineroomModel = {
  id: "",
  teamId: "",
  name: "",
  state: "",
  pavilionId: "",
}

const [
  setCineroomStore,
  onCineroomStore,
  getCineroomStore,
] = createStore<CineroomModel[]>([initialStore]);

export {
  setCineroomStore,
  onCineroomStore,
  getCineroomStore,
};

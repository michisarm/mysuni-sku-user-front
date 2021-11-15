import { createStore } from '../../packages/store/createStore';
import { Main } from './main.models';

export const [useMain, setMain, getMain, onMain] = createStore<Main>();

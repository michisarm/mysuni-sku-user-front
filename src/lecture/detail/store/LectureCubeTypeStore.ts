import LectureCubeType from '../viewModel/LectureCubeType';
import { createStore } from './Store';

const [setLectureCubeType, onLectureCubeType, getLectureCubeType] = createStore<
  LectureCubeType
>();

export { setLectureCubeType, onLectureCubeType, getLectureCubeType };

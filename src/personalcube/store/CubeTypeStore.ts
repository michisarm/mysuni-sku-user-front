import { createStore } from "./Store";

const [
  setCubeType,
  onCubeType,
  getCubeType,
  useCubeType,
] = createStore<string>('');

export {
  setCubeType,
  onCubeType,
  getCubeType,
  useCubeType,
};
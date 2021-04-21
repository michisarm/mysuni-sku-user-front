import { createStore } from './Store';

const [
  setEmbed,
  onEmbed,
  getEmbed,
] = createStore<any>();

export { setEmbed, onEmbed, getEmbed };

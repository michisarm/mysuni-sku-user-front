import { createStore } from './Store';
import { CollegeModel } from '../../college/model/CollegeModel';

type College = Pick<CollegeModel, 'id' | 'name'>;

const initialStore: College = {
  id: '',
  name: { ko: '', cn: '', en: '' },
};

const [
  setCollegeStore,
  onCollegeStore,
  getCollegeStore,
  useCollegeStore,
] = createStore<College[]>([initialStore]);

export { setCollegeStore, onCollegeStore, getCollegeStore, useCollegeStore };

const [
  setCollegeModelStore,
  onCollegeModelStore,
  getCollegeModelStore,
  useCollegeModelStore,
] = createStore<CollegeModel[]>([]);

export {
  setCollegeModelStore,
  onCollegeModelStore,
  getCollegeModelStore,
  useCollegeModelStore,
};

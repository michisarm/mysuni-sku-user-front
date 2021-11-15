import { createStore } from './Store';
import { CollegeModel } from '../../college/model/CollegeModel';

const [setColleges, onColleges, getColleges, useColleges] =
  createStore<CollegeModel[]>();

export { setColleges, onColleges, getColleges, useColleges };

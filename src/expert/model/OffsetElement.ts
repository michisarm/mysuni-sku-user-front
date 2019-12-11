import { decorate, observable } from 'mobx';
import { InstructorModel } from './InstructorModel';

export class OffsetElement<T> {
  //
  result : InstructorModel = new InstructorModel();
}

decorate(OffsetElement, {
  result: observable,
});

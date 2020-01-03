import { action, configure, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import InstructorApi from '../apiclient/InstructorApi';
import { InstructorModel } from '../../model/InstructorModel';
import { OffsetElement } from '../../model/OffsetElement';

configure({
  enforceActions: 'observed',
});

@autobind
export default class InstructorService {
  //
  static instance: InstructorService;

  instructorApi: InstructorApi;

  @observable
  instructor: OffsetElement<InstructorModel> = new OffsetElement<InstructorModel>() ;

  constructor(instructorApi: InstructorApi) {
    this.instructorApi = instructorApi;
  }

  @action
  async findInstructor(instructorId: string) {
    //
    const instructor = await this.instructorApi.findInstructor(instructorId);
    if (instructor) {
      return runInAction(() => this.instructor = instructor);
    }
    return null;
  }
}

Object.defineProperty(InstructorService, 'instance', {
  value: new InstructorService(InstructorApi.instance),
  writable: false,
  configurable: false,
});

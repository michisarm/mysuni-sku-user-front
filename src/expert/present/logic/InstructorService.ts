
import { action, configure, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import InstructorApi from '../apiclient/InstructorApi';
import { InstructorModel } from '../../model/InstructorModel';


configure({
  enforceActions: 'observed',
});

@autobind
class InstructorService {
  //
  static instance: InstructorService;

  instructorApi: InstructorApi;

  @observable
  instructor: InstructorModel = new InstructorModel();


  constructor(instructorApi: InstructorApi) {
    this.instructorApi = instructorApi;
  }

  @action
  async findInstructor(instructorId: string) {
    //
    const instructor = await this.instructorApi.findInstructor(instructorId);

    runInAction(() => this.instructor = instructor);
    return instructor;
  }
}

Object.defineProperty(InstructorService, 'instance', {
  value: new InstructorService(InstructorApi.instance),
  writable: false,
  configurable: false,
});

export default InstructorService;

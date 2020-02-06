
import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';

import JobGroupApi from '../apiclient/JobGroupApi';
import { JobGroupModel } from '../../model/JobGroupModel';


@autobind
class JobGroupService {
  //
  static instance: JobGroupService;

  jobGroupApi: JobGroupApi;

  @observable
  jobGroups: JobGroupModel[] = [];

  @observable
  jobGroup: JobGroupModel = new JobGroupModel();


  constructor(jobGroupApi: JobGroupApi = JobGroupApi.instance) {
    //
    this.jobGroupApi = jobGroupApi;
  }

  @action
  async findAllJobGroups() {
    //
    const jobGroups = await this.jobGroupApi.findAllJobGroups();

    runInAction(() => this.jobGroups = jobGroups);
    return jobGroups;
  }

  @action
  async findJobGroupById(jobGroupId: string) {
    //
    const jobGroup = await this.jobGroupApi.findJobGroupById(jobGroupId);

    runInAction(() => this.jobGroup = jobGroup);
    return jobGroup;
  }
}

Object.defineProperty(JobGroupService, 'instance', {
  value: new JobGroupService(JobGroupApi.instance,),
  writable: false,
  configurable: false,
});

export default JobGroupService;

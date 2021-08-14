import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';

import JobGroupApi from '../apiclient/JobGroupApi';
import { JobGroupModel } from '../../model/JobGroupModel';
import { findJobDuty } from 'college/api/collegeApi';

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

    runInAction(() => (this.jobGroups = jobGroups));
    return jobGroups;
  }

  @action
  async findJobGroupById(jobGroupId: string) {
    //
    const jobGroup = await findJobDuty();

    const parsejobGroup = jobGroup
      ?.filter((job) => job.jobGroupId === jobGroupId)
      .map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });

    runInAction(() => (this.jobGroup.jobDuties = parsejobGroup || []));
    return jobGroup;
  }
}

Object.defineProperty(JobGroupService, 'instance', {
  value: new JobGroupService(JobGroupApi.instance),
  writable: false,
  configurable: false,
});

export default JobGroupService;

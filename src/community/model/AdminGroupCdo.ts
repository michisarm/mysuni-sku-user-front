import { decorate, observable } from 'mobx';

export default interface AdminGroupCdo {
  groupId: string;
  communityId: string;
  name: string;
  introduce: string;
  managerId: string;
  managerName: string;
}

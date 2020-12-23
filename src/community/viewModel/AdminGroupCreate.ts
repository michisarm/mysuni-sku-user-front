import { decorate, observable } from 'mobx';

export default interface AdminGroupCreate {
  groupId?: string;
  communityId?: string;
  name?: string;
  introduce?: string;
  managerId?: string;
  managerName?: string;
}

export function getEmptyAdminGroupCreate(communityId:string): AdminGroupCreate {
  return {
    communityId
  };
}

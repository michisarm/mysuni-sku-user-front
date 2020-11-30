import { decorate, observable } from 'mobx';

export default class MemberCdo {
  communityId: string = '';
  memberId: string = '';
  approved: boolean = false;
}
decorate(MemberCdo, {
  communityId: observable,
  memberId: observable,
  approved: observable,
});

import { decorate, observable } from 'mobx';

export class MemberModel {
  memberId: string = '';

  constructor(member?: MemberModel) {
    if (member) Object.assign(this, { ...member });
  }
}

decorate(MemberModel, {
  memberId: observable,
});

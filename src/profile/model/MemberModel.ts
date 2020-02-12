
import { decorate, observable } from 'mobx';


class MemberModel {
  //
  citizenId: string = '';

  constructor(member?: MemberModel) {
    if (member) {
      Object.assign(this, { ...member });
    }
  }
}

decorate(MemberModel, {
  citizenId: observable,
});

export default MemberModel;

import { observable, action, computed } from 'mobx';
import { Moment } from 'moment';
import _ from 'lodash';
import Member from '../model/Member';
import ElementList, { getsetElementList } from '../model/ElementList';
import MemberCdo from '../model/MemberCdo';

class MemberStore {
  static instance: MemberStore;

  // constructor() {

  // }

  @observable
  innerMemberList: ElementList<Member> = getsetElementList();
  
  @action
  setMemberList(next: ElementList<Member>) {
    this.innerMemberList = next
  }

  @computed
  get memberList() {
    return this.innerMemberList;
  }

  @observable
  memberCdo: MemberCdo = new MemberCdo();

  @action
  clearMemberCdo(){
    this.memberCdo = new MemberCdo();
  }

  @action
  setMemberCdo(
    query: MemberCdo,
    name: string,
    value: string | Moment | number | undefined
  ) {
    this.memberCdo = _.set(query, name, value)
  }

  @action
  selectMemberCdo(next: MemberCdo) {
    this.memberCdo = next
  }

  @computed
  get selectedMemberCdo() {
    return this.memberCdo
  }

}

MemberStore.instance = new MemberStore();

export default MemberStore;
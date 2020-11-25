import { observable, action, computed } from 'mobx';
import { Moment } from 'moment';
import _ from 'lodash';

import Group, { getEmptyGroup } from '../model/Group';
import GroupCdoModel from '../model/GroupCdoModel';
import { GroupQueryModel } from '../model/GroupQueryModel';
import ElementList, {getsetElementList} from '../../model/ElementList';

class GroupStore {
  static instance: GroupStore;

  constructor() {
    this.clearGroupCdo = this.clearGroupCdo.bind(this);
  }

  @observable
  innerGroupList: ElementList<Group> = getsetElementList();

  @action
  setGroupList(next: ElementList<Group>) {
    this.innerGroupList = next;
  }

  @computed
  get groupList() {
    return this.innerGroupList;
  }

  @observable
  innerSelected: Group = getEmptyGroup();

  @action
  select(next: Group) {
    this.innerSelected = next;
  }

  @computed
  get selected() {
    return this.innerSelected;
  }

  @observable
  groupQuery: GroupQueryModel = new GroupQueryModel();

  @action
  clearGroupQuery() {
    this.groupQuery = new GroupQueryModel();
  }

  @action
  setGroupQuery(
    query: GroupQueryModel,
    name: string,
    value: string | Moment | number | undefined
  ) {
    this.groupQuery = _.set(query, name, value);
  }

  @computed
  get selectedGroupQuery() {
    return this.groupQuery;
  }

  @observable
  groupCdo: GroupCdoModel = new GroupCdoModel();

  @action
  clearGroupCdo() {
    this.groupCdo = new GroupCdoModel();
  }

  @action
  setGroupCdo(
    query: GroupCdoModel,
    name: string,
    value: string | Moment | number | undefined
  ) {
    this.groupCdo = _.set(query, name, value);
  }

  @action
  selectGroupCdo(next: GroupCdoModel) {
    this.groupCdo = next;
  }

  @computed
  get selectedGroupCdo() {
    return this.groupCdo;
  }
}

GroupStore.instance = new GroupStore();

export default GroupStore;

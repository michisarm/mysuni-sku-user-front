import autobind from 'autobind-decorator';
import { action, computed, observable, runInAction } from 'mobx';
import { getUserTargets } from 'abtest/api/AbtestApi';
import { Abtest, initAbtest } from 'abtest/model/Abtest';
@autobind
export default class AbtestService {
  static instance: AbtestService;

  @observable
  _abtests: Abtest[] = [];

  @computed get abtestUserTargets() {
    return this._abtests;
  }

  @action
  async getAbtestUserTargets() {
    return '[]';
    // try {
    //   const abtests = await getUserTargets();
    //   if (abtests && abtests.length > 0) {
    //     runInAction(() => (this._abtests = abtests));
    //     return abtests;
    //   } else {
    //     runInAction(() => (this._abtests = [initAbtest()]));
    //     return [initAbtest()];
    //   }
    // } catch {
    //   runInAction(() => (this._abtests = [initAbtest()]));
    //   return [initAbtest()];
    // }
  }

  @action
  async getAbtestUserTarget(name: string) {
    const abtest = this._abtests.filter((a) => a.abtestId === name)[0];
    if (abtest) {
      abtest.isNonExperimentalGroup = false;
      return abtest;
    } else {
      return initAbtest();
    }
  }
}

Object.defineProperty(AbtestService, 'instance', {
  value: new AbtestService(),
  writable: false,
  configurable: false,
});

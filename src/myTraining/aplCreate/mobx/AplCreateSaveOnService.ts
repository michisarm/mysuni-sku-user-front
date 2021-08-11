import { autobind } from '@nara.platform/accent';
import { action, computed } from 'mobx';

@autobind
export default class AplCreateSaveOnService {
  static instance: AplCreateSaveOnService;

  private _saveAplOn: boolean = false;

  @computed get saveAplOn() {
    return this._saveAplOn;
  }

  @action
  setSaveAplOn(next: boolean) {
    this._saveAplOn = next;
  }
}

Object.defineProperty(AplCreateSaveOnService, 'instance', {
  value: new AplCreateSaveOnService(),
  writable: false,
  configurable: false,
});

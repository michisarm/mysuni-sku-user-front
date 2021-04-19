import { observable, computed, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import _ from 'lodash';
import { InternalMediaConnection } from '../../../lecture/model/InternalMediaConnection';
import { PanoptoCdoModel } from '../../../personalcube/media/model/PanoptoCdoModel';
import { findPanopToList } from '../../../personalcube/personalcube/present/apiclient/cubeApi';

@autobind
export class PanoptoService {
  static instance: PanoptoService;

  @observable
  _panoptoCdo: PanoptoCdoModel = new PanoptoCdoModel();

  @computed get panoptoCdo() {
    return this._panoptoCdo;
  }

  @action
  changePanoptoCdoProps(name: string, value: string | number) {
    this._panoptoCdo = _.set(this._panoptoCdo, name, value);
  }

  @observable
  _panopto: InternalMediaConnection = {
    duration: 0,
    folderId: '',
    folderName: '',
    name: '',
    panoptoSessionId: '',
    startTime: '',
    thumbUrl: '',
    viewUrl: '',
    quizIds: [],
  };

  @computed get panopto() {
    return this._panopto;
  }

  @action
  setPanoptoProps(selectedPanopto: InternalMediaConnection) {
    return runInAction(() => {
      this._panopto = selectedPanopto;
    });
  }

  @observable
  _panoptoList: InternalMediaConnection[] = [];

  @computed get panoptoList() {
    return this._panoptoList;
  }

  @action
  async findPanopToList(panoptoCdo: PanoptoCdoModel) {
    const panoptos = await findPanopToList(panoptoCdo);
    return runInAction(() => {
      this._panoptoList = panoptos.results;
    });
  }
}

Object.defineProperty(PanoptoService, 'instance', {
  value: new PanoptoService(),
  writable: false,
  configurable: false,
});

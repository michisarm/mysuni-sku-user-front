import moment from 'moment';
import { autobind, getCookie } from '@nara.platform/accent';
import ActionLogApi from '../apiclient/ActionLogApi';
import ActionLogModel from '../../model/ActionLogModel';


@autobind
class ActionLogService {

  static instance: ActionLogService;

  CHUNCK_SIZE = 10;

  TIME_OUT = 30_000; // 30초

  _actionLogs: ActionLogModel[] = [];

  _timerId: any = -1;

  actionLogApi: ActionLogApi;

  constructor(actionLogApi: ActionLogApi) {
    this.actionLogApi = actionLogApi;
  }

  registerActionLog(actionLog: ActionLogModel, isEmpty: boolean = false) {
    actionLog.userId = getCookie('email');
    actionLog.context = window.location.href;

    this._actionLogs.push(actionLog);

    if (isEmpty) {

      console.log('ActionLogService _actionLogs empty');

      clearTimeout(this._timerId);
      this._registerActionLog();

    } else if (this._actionLogs.length >= this.CHUNCK_SIZE) {

      console.log('ActionLogService _actionLogs size');

      clearTimeout(this._timerId);
      this._registerActionLog();

    } else if (this._timerId === -1) {

      console.log('ActionLogService _actionLogs timeout');

      this._timerId = setTimeout(this._registerActionLog, this.TIME_OUT);

    }
  }

  _registerActionLog() {
    this._timerId = -1;
    const actionLogs: ActionLogModel[] = this._actionLogs.splice(0, this.CHUNCK_SIZE);

    actionLogs.forEach(actionLogModel => actionLogModel.requestTimestampe = moment().toISOString(true));

    console.log('ActionLogService _actionLogs request');

    this.actionLogApi.registerActionLogs(actionLogs);
  }

}

ActionLogService.instance = new ActionLogService(new ActionLogApi());

export default ActionLogService;

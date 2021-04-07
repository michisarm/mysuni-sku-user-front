import { decorate, observable } from 'mobx';

class AlarmInfoModel {
    //
    url: String = '';
    managerEmail: String = '';
    contentsName: String = '';


    constructor(alarmInfoModel?: AlarmInfoModel) {
        if (alarmInfoModel) {
            //
            this.url = alarmInfoModel.url || alarmInfoModel.url;
            this.managerEmail = alarmInfoModel.managerEmail || alarmInfoModel.managerEmail;
            this.contentsName = alarmInfoModel.contentsName || alarmInfoModel.contentsName;
        }
    }
}

decorate(AlarmInfoModel, {
    url: observable,
    managerEmail: observable,
    contentsName: observable,
});

export default AlarmInfoModel;
import { decorate, observable } from 'mobx';
import { IdName, NameValueList } from 'shared/model';

class CurrentJobGroupModel {
  //
  currentJobGroup: IdName = new IdName();
  currentJobDuty: IdName = new IdName();

  constructor(currentJobGroup?: CurrentJobGroupModel) {
    Object.assign(this, { ...currentJobGroup });
  }

  static asNameValues(currentJob: CurrentJobGroupModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'currentJobGroup',
          value: JSON.stringify(currentJob.currentJobGroup),
        },
        {
          name: 'currentJobDudy',
          value: JSON.stringify(currentJob.currentJobDuty),
        },
      ],
    };
    return asNameValues;
  }
}

decorate(CurrentJobGroupModel, {
  currentJobGroup: observable,
  currentJobDuty: observable,
});

export default CurrentJobGroupModel;

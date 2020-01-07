import { decorate, observable } from 'mobx';
import { tenantInfo } from '@nara.platform/dock';

export class WriterModel {
  employeeId: string = '';
  email: string = '';
  name: string = '';

  constructor(writer?: WriterModel) {
    //
    Object.assign(this, { ...writer });
  }

  static new() {
    //
    console.log(tenantInfo);
    return new WriterModel({
      employeeId: tenantInfo.getTenantId(),
      email: '',
      name: tenantInfo.getTenantName(),
    });
  }
}

decorate(WriterModel, {
  employeeId: observable,
  email: observable,
  name: observable,
});

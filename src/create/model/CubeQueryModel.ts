import { decorate, observable } from 'mobx';
import { CubeRdoModel } from './CubeRdoModel';
import { ApprovalContentsRdo } from './ApprovalContentsRdo';
import { QueryModel } from '../../shared/model/QueryModel';

export class CubeQueryModel extends QueryModel {
  //
  cubeType: string = '';
  openState: string = '';
  openFilter: string = '';

  // ApprovalContents
  serviceType: string = '';

  // learner
  learnerType: string = '';

  static asCubeRdo(cubeQuery: CubeQueryModel) : CubeRdoModel {
    let isName = false;
    let isWord = false;
    if (cubeQuery.searchPart === '과정명') isName = true;
    if (cubeQuery.searchPart === '생성자') isWord = true;
    return (
      {
        startDate: cubeQuery && cubeQuery.period && cubeQuery.period.startDateNumber,
        endDate: cubeQuery && cubeQuery.period && cubeQuery.period.endDateNumber,
        cubeType: cubeQuery && cubeQuery.cubeType,
        channel: cubeQuery && cubeQuery.channel,
        college: cubeQuery && cubeQuery.college,
        openState: cubeQuery && cubeQuery.openState,
        openFilter: cubeQuery && cubeQuery.openFilter,
        name: isName && cubeQuery && cubeQuery.searchWord || '',
        creatorName: isWord && cubeQuery && cubeQuery.searchWord || '',
        offset: cubeQuery && cubeQuery.offset,
        limit: cubeQuery && cubeQuery.limit,
      }
    );
  }

  static asApprovalContentsRdo(cubeQuery: CubeQueryModel) : ApprovalContentsRdo {
    let isName = false;
    let isWord = false;
    if (cubeQuery.searchPart === '과정명') isName = true;
    if (cubeQuery.searchPart === '생성자') isWord = true;
    return (
      {
        serviceType: cubeQuery && cubeQuery.serviceType,
        cubeType: cubeQuery && cubeQuery.cubeType,
        channel: cubeQuery && cubeQuery.channel,
        college: cubeQuery && cubeQuery.college,
        openState: cubeQuery && cubeQuery.openState,
        name: isName && cubeQuery && cubeQuery.searchWord || '',
        creatorName: isWord && cubeQuery && cubeQuery.searchWord || '',
        startDate: cubeQuery && cubeQuery.period && cubeQuery.period.startDateNumber,
        endDate: cubeQuery && cubeQuery.period && cubeQuery.period.endDateNumber,
        offset: cubeQuery && cubeQuery.offset,
        limit: cubeQuery && cubeQuery.limit,
      }
    );
  }
}

decorate(CubeQueryModel, {
  cubeType: observable,
  openState: observable,
  openFilter: observable,

  learnerType: observable,
  serviceType: observable,
});

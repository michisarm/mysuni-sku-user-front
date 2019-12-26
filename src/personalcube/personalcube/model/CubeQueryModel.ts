import { decorate, observable } from 'mobx';
import { DatePeriod } from 'shared-model';
import { ApprovalContentsRdo } from './ApprovalContentsRdo';
import { PersonalCubeRdoModel } from './PersonalCubeRdoModel';


console.log('DatePeriod', DatePeriod);

// export class CubeQueryModel extends QueryModel {
export class CubeQueryModel {
  //
  cubeType: string = '';
  cubeState: string = '';
  searchFilter: string = '';

  // ApprovalContents
  serviceType: string = '';

  // learner
  learnerType: string = '';

  //임시
  period: DatePeriod = new DatePeriod();
  college: string = '';
  channel: string = '';
  searchPart: string = '';
  searchWord: string = '';

  offset: number = 0;
  limit: number = 20;

  static asCubeRdo(cubeQuery: CubeQueryModel) : PersonalCubeRdoModel {
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
        cubeState: cubeQuery && cubeQuery.cubeState,
        searchFilter: cubeQuery && cubeQuery.searchFilter,
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
        cubeState: cubeQuery && cubeQuery.cubeState,
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
  cubeState: observable,
  searchFilter: observable,

  learnerType: observable,
  serviceType: observable,
});

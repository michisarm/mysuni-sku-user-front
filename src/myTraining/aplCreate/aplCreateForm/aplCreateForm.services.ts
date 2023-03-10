import { DepartmentModel } from 'approval/department/model/DepartmentModel';
import {
  CompanyApproverService,
  DepartmentService,
  MemberService,
  MenuControlAuthService,
} from 'approval/stores';
import { CollegeService } from 'college/stores';
import CollegeLectureCountRdo from 'lecture/model/CollegeLectureCountRdo';
import { CollegeLectureCountService } from 'lecture/stores';
import moment from 'moment';
import { AplService } from 'myTraining/stores';
import { SkProfileModel } from 'profile/model';
import { SkProfileService } from 'profile/stores';
import { SelectOption } from 'shared/model/SelectOption';
import {
  compareCollgeCineroom,
  findMyAplCollege,
  getChannelName,
  getCollgeName,
} from '../../../shared/service/useCollege/useRequestCollege';
import { onResetFocusControl } from '../aplCreate.events';
import AplCreateCollegeService from '../mobx/AplCreateCollegeService';
import AplCreateFocusService from '../mobx/AplCreateFocusService';
import { CollegeModel } from '../../../college/model';
import { College } from 'shared/service/requestAllColleges';

export async function requestAplApprover() {
  const aplService = AplService.instance;
  const skProfileService = SkProfileService.instance;
  const departmentService = DepartmentService.instance;
  const memberService = MemberService.instance;
  const companyApproverService = CompanyApproverService.instance;
  const menuControlAuthService = MenuControlAuthService.instance;

  skProfileService
    .findSkProfile()
    .then((profile: SkProfileModel) =>
      departmentService.findDepartmentByCode(profile?.departmentCode)
    )
    .then((department: DepartmentModel) =>
      memberService.findApprovalMemberByEmployeeId(department.managerId)
    )
    .then(() => companyApproverService.findCompanyAplApprover())
    .then((companyAplApprover) => {
      aplService.changeAplProps(
        'approvalUserIdentity.id',
        companyAplApprover.id
      );
      aplService.changeAplProps(
        'approvalUserIdentity.email',
        companyAplApprover.email
      );
      aplService.changeAplProps(
        'approvalUserIdentity.name',
        companyAplApprover.name
      );
      aplService.changeAplProps(
        'approvalUserIdentity.companyName',
        companyAplApprover.companyName
      );
      aplService.changeAplProps(
        'approvalUserIdentity.departmentName',
        companyAplApprover.departmentName
      );
    })
    .then(() => {
      menuControlAuthService.findMenuControlAuth();
    });
}

export async function requestAplCreateColleges() {
  //
  if (window.navigator.onLine) {
    // await CollegeService.instance.findCollegesForCurrentCineroom();
    // parseCollegeOptions(CollegeService.instance.mainColleges);
    const aplCollege = findMyAplCollege(
      MenuControlAuthService.instance.menuControlAuth.id
    );

    if (aplCollege) {
      parseCollegeOptions(aplCollege);
    }
  }
}

export function parseCollegeOptions(colleges: College[]) {
  const collegeOptions: SelectOption[] = [
    { key: 'Select', value: 'Select', text: 'Select' },
  ];
  if (colleges) {
    colleges.forEach((college, index) => {
      if (college.id) {
        collegeOptions.push({
          key: String(index + 1),
          value: college.id,
          text: getCollgeName(college.id),
        });
      }
    });
  }
  const { setCollegeOptions } = AplCreateCollegeService.instance;
  setCollegeOptions(collegeOptions);
}

export function getChannelOptions() {
  const { mainCollege } = CollegeService.instance;
  const channels = mainCollege && mainCollege.channels;
  const channelOptions: any = [
    { key: 'Select', text: 'Select', value: 'Select' },
  ];
  channels.map((channel, index) => {
    channelOptions.push({
      key: index + 1,
      value: channel.id,
      text: getChannelName(channel.id),
    });
  });
  return channelOptions;
}

export function focusInput() {
  const {
    aplCreateFocus: { focusControlName },
    focusInputRefs,
  } = AplCreateFocusService.instance;
  if (
    !focusControlName ||
    !focusInputRefs[focusControlName] ||
    !focusInputRefs[focusControlName].current
  ) {
    return;
  }

  if (
    [
      'title',
      'type',
      'typeName',
      'collegeId',
      'channelId',
      'institute',
      'requestHour',
      'requestMinute',
      'content',
      'approvalId',
    ].includes(focusControlName)
  ) {
    focusInputRefs[focusControlName].current.focus();
  } else if (['startDate', 'endDate'].includes(focusControlName)) {
    focusInputRefs[focusControlName].current.input.focus();
  }
  onResetFocusControl();
}

export function initWeek() {
  AplService.instance.changeAplProps(
    'period.endDateMoment',
    moment().endOf('day').subtract(-7, 'd')
  );
}

import { DepartmentModel } from 'approval/department/model/DepartmentModel';
import {
  CompanyApproverService,
  DepartmentService,
  MemberService,
} from 'approval/stores';
import { CollegeService } from 'college/stores';
import CollegeLectureCountRdo from 'lecture/model/CollegeLectureCountRdo';
import { getDefaultLang } from 'lecture/model/LangSupport';
import { CollegeLectureCountService } from 'lecture/stores';
import moment from 'moment';
import { AplService } from 'myTraining/stores';
import { SkProfileModel } from 'profile/model';
import { SkProfileService } from 'profile/stores';
import { SelectOption } from 'shared/model/SelectOption';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { onResetFocusControl } from '../aplCreate.events';
import AplCreateCollegeService from '../mobx/AplCreateCollegeService';
import AplCreateFocusService from '../mobx/AplCreateFocusService';

export async function requestAplApprover() {
  const aplService = AplService.instance;
  const skProfileService = SkProfileService.instance;
  const departmentService = DepartmentService.instance;
  const memberService = MemberService.instance;
  const companyApproverService = CompanyApproverService.instance;

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
    });
}

export async function requestAplCreateColleges() {
  const collegeLectureCountService = CollegeLectureCountService.instance;
  if (window.navigator.onLine) {
    const collegeLectureCounts =
      await collegeLectureCountService.findCollegeLectureCounts();
    if (collegeLectureCounts.length > 0) {
      parseCollegeOptions(collegeLectureCounts);
    }
  }
}

export function parseCollegeOptions(colleges: CollegeLectureCountRdo[]) {
  const collegeOptions: SelectOption[] = [
    { key: 'Select', value: 'Select', text: 'Select' },
  ];
  if (colleges) {
    colleges.map((college, index) => {
      if (college.collegeType === 'Company') {
        collegeOptions.push({
          key: String(index + 1),
          value: college.id,
          text: parsePolyglotString(
            college.name,
            getDefaultLang(college.langSupports)
          ),
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
      text: parsePolyglotString(
        channel.name,
        getDefaultLang(channel.langSupports)
      ),
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

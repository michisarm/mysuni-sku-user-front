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
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { onResetFocusControl } from './aplCreate.events';
import AplCreateCollegeService from './mobx/AplCreateCollegeService';
import AplCreateFocusService from './mobx/AplCreateFocusService';

export async function requestAplCreate() {
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
    .then((companyAplApprover) =>
      memberService.findApprovalMemberByEmployeeId(companyAplApprover.id)
    )
    .then((companyApprover) => {
      aplService.changeAplProps('approvalId', companyApprover.id);
      aplService.changeAplProps('approvalEmail', companyApprover.email);
      aplService.changeAplProps('approvalName', companyApprover.name);
      aplService.changeAplProps('approvalCompany', companyApprover.companyName);
      aplService.changeAplProps(
        'approvalDepartment',
        companyApprover.departmentName
      );
    });
}

export async function requestAplCreateColleges() {
  const collegeLectureCountService = CollegeLectureCountService.instance;
  const { collegeLectureCounts } = collegeLectureCountService;
  if (window.navigator.onLine) {
    const category = sessionStorage.getItem('category');
    if (category !== null && collegeLectureCounts.length > 0) {
      const collegeLectureCounts = JSON.parse(category);
      if (collegeLectureCounts.length > 0) {
        setCollege(collegeLectureCounts);
      }
    } else {
      const collegeLectureCounts =
        await collegeLectureCountService.findCollegeLectureCounts();
      if (collegeLectureCounts.length > 0) {
        setCollege(collegeLectureCounts);
      }
    }
  }
}

export function setCollege(colleges: CollegeLectureCountRdo[]) {
  const collegeSelect: any = [];
  if (colleges) {
    collegeSelect.push({ key: 'Select', text: 'Select', value: 'Select' });
    colleges.map((college, index) => {
      if (college.collegeType === 'Company') {
        collegeSelect.push({
          key: index + 1,
          text: parsePolyglotString(
            college.name,
            getDefaultLang(college.langSupports)
          ),
          value: college.id,
        });
      }
    });
  }
  const { setCollegeOptions } = AplCreateCollegeService.instance;
  setCollegeOptions(collegeSelect);
}

export function setChannel() {
  const { mainCollege } = CollegeService.instance;
  const channels = mainCollege && mainCollege.channels;
  const channelSelect: any = [];
  channelSelect.push({ key: 'Select', text: 'Select', value: 'Select' });
  channels.map((channel, index) => {
    channelSelect.push({
      key: index + 1,
      text: parsePolyglotString(
        channel.name,
        getDefaultLang(channel.langSupports)
      ),
      value: channel.id,
    });
  });
  return channelSelect;
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

export function getFileBoxIdForReference(fileBoxId: string) {
  AplService.instance.changeAplProps('fileIds', fileBoxId);
}

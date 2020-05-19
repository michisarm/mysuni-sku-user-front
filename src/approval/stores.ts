
import MemberService from './member/present/logic/MemberService';
import DepartmentService from './department/present/logic/DepartmentService';
import CompanyApproverService from './company/present/logic/CompanyApproverService';

export default {
  approval: {
    memberService: MemberService.instance,
    departmentService: DepartmentService.instance,
    companyApproverService: CompanyApproverService.instance,
  },
};

export {
  MemberService,
  DepartmentService,
  CompanyApproverService,
};

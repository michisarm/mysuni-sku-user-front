
import MemberService from './member/present/logic/MemberService';
import DepartmentService from './department/present/logic/DepartmentService';

export default {
  approval: {
    memberService: MemberService.instance,
    departmentService: DepartmentService.instance,
  },
};

export {
  MemberService,
  DepartmentService,
};

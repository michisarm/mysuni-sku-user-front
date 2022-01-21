import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface MemberByDepartmentCode {
  chartDisplayed: boolean;
  code: string;
  companyCode: string;
  companyName: PolyglotString;
  departmentCode: string;
  departmentName: PolyglotString;
  displayOrder: string;
  duty: string;
  email: string;
  employeeId: string;
  id: string;
  modifiedTime: number;
  modifier: string | null;
  name: PolyglotString;
  phone: string;
  photoFileUrl: string;
  rank: string;
  registeredTime: number;
  state: string;
  title: string;
  titleCode: string | null;
}

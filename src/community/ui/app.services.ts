import { find } from 'lodash';
import { getColleges } from './app/services/app.services';
import { CollegeColor } from './data/college/models/CollegeColor';
import { findMember, joinCommunity } from './data/community/apis/memberApi';
import { PermittedCineroom } from './data/lecture/models/PermittedCineroom';
import { showAlert, showConfirm } from '../packages/alert/Alert';
import { getAllColleges } from '../../shared/service/requestAllColleges';
import { parsePolyglotString } from '../../shared/viewmodel/PolyglotString';

export async function checkMember(
  communityId: string
): Promise<boolean | undefined> {
  const member = await findMember(communityId);

  if (
    member === undefined ||
    member.memberId === null ||
    member.memberId === '' ||
    member.approved === 'DRAW'
  ) {
    showConfirm({
      title: '알림',
      message: '커뮤니티에 가입하시겠습니까??',
      onOk: async () => {
        await joinCommunity(communityId);
        //requestCommunity(communityId); 커뮤니티 정보 값 새로 받아오기
      },
      onCancel: () => {
        return false;
      },
    });
    return false;
  } else if (member.approved === 'WAITING') {
    showAlert({ title: '알림', message: '가입 승인 대기중입니다.' });
    return false;
  } else if (member.approved === 'APPROVED') {
    return true;
  }
  return false;
}

export function checkInstructor() {
  const instructorId = localStorage.getItem('nara.instructorId');
  if (
    instructorId !== undefined &&
    instructorId !== null &&
    instructorId !== ''
  ) {
    return true;
  }
  return false;
}

export function checkExternalInstructor() {
  const isExternal = localStorage.getItem('nara.externalInstructor');
  if (isExternal !== null && isExternal === 'true') {
    return true;
  }
  return false;
}

export function getCollegeColor(collegeId: string) {
  switch (collegeId) {
    case 'CLG00001':
      return CollegeColor.AI;
    case 'CLG00002':
      return CollegeColor.DT;
    case 'CLG00006':
      return CollegeColor.Global;
    case 'CLG00007':
      return CollegeColor.Leadership;
    case 'CLG00008':
      return CollegeColor.Management;
    case 'CLG00004':
      return CollegeColor.SV;
    case 'CLG00003':
      return CollegeColor.Happiness;
    case 'CLG00019':
      return CollegeColor.SemicondDesign;
    case 'CLG00005':
      return CollegeColor.InnovationDesign;
    case 'CLG00020':
      return CollegeColor.BMDesign;
    case 'CLG0001c':
      return CollegeColor.EnergySolution;
    default:
      return CollegeColor.Default;
  }
}

function isIncludeCineroomId(cineroomList: PermittedCineroom[]) {
  const myCineroomList =
    JSON.parse(localStorage.getItem('nara.workspaces') || '') || {};

  const filteredCineroomList: string[] = [];

  cineroomList.forEach((cineroom) => {
    if (cineroom.required) {
      filteredCineroomList.push(cineroom.cineroomId);
    }
  });

  for (let i = 0; i < filteredCineroomList.length; i++) {
    if (
      find(myCineroomList.cineroomWorkspaces, { id: filteredCineroomList[i] })
    ) {
      return true;
    }
  }
  return false;
}

export default isIncludeCineroomId;

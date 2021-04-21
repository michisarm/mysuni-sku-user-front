import { PermittedCineroom } from '../../lecture/model/PermittedCineroom';
import { find } from 'lodash';

function isIncludeCineroomId(cineroomList: PermittedCineroom[]) {
  const myCineroomList =
    JSON.parse(localStorage.getItem('nara.workspaces') || '') || {};

  const filteredCineroomList: string[] = [];

  cineroomList.map(cineroom => {
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

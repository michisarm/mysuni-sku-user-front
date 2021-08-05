import { PageElement } from 'lecture/shared/model/PageElement';
import { createStore } from './Store';
import { find } from 'lodash';

export const [
  setMenuAuthModel,
  onMenuAuthModel,
  getMenuAuthModel,
  useMenuAuthModel,
] = createStore<PageElement[]>();

export function isCommunityAuth() {
  const menuAuth = getMenuAuthModel();

  if (menuAuth === undefined) {
    return false;
  }

  const findCommunityMemu = find(menuAuth, { type: 'Category' });

  if (findCommunityMemu === undefined) {
    return false;
  }

  return true;
}

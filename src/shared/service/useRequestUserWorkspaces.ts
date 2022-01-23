import { useEffect } from 'react';
import { createStore } from 'restoa';
import { UserWorkspace } from 'approval/models/UserWorkspace';
import { findAllWorkspaces } from 'lecture/detail/api/profileApi';
import { isSuperManager } from 'shared/helper/isSuperManager';

export const [useUserWorkspaces, setUserWorkspaces, getUserWorkspaces] =
  createStore<UserWorkspace[]>([]);

export function useRequestUserWorkspaces() {
  useEffect(() => {
    // SuperManager 인 경우에만 사용하는 데이터
    if (!isSuperManager()) {
      return;
    }
    requestUserWorkspaces();
  }, []);
}

export async function requestUserWorkspaces() {
  const workspaces = await findAllWorkspaces();
  if (workspaces === undefined) {
    return;
  }
  setUserWorkspaces(workspaces);
}

export function getUserWorkspace(id: string): UserWorkspace | undefined {
  const userWorkspaces = getUserWorkspaces();
  if (userWorkspaces === undefined) {
    return undefined;
  }
  return userWorkspaces.find((workspace) => workspace.id === id);
}

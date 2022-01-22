import { UserWorkspace } from 'approval/models/UserWorkspace';
import { findAllWorkspaces } from 'lecture/detail/api/profileApi';
import { useEffect } from 'react';
import { createStore } from 'restoa';

export const [useUserWorkspaces, setUserWorkspaces, getUserWorkspaces] =
  createStore<UserWorkspace[]>([]);

export function useRequestWorkspaces() {
  useEffect(() => {
    requestWorkspaces();
  }, []);
}

export async function requestWorkspaces() {
  const workspaces = await findAllWorkspaces();
  if (workspaces === undefined) {
    return;
  }
  setUserWorkspaces(workspaces);
}

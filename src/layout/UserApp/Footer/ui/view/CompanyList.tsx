import React from 'react';
import { patronInfo } from '@nara.platform/dock';

import { useUserWorkspaces } from 'shared/service/useRequestWorkspaces';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { CompanyItem } from './CompanyItem';

export function CompanyList() {
  const workspaces = useUserWorkspaces();

  if (workspaces === undefined) {
    return null;
  }

  const onClickItem = (key: string) => {
    patronInfo.setCineroomId(key);
    window.location.reload();
  };

  return (
    <ul>
      {workspaces.map((workspace) => (
        <CompanyItem
          id={workspace.id}
          text={parsePolyglotString(workspace.name)}
          onClick={onClickItem}
        />
      ))}
    </ul>
  );
}

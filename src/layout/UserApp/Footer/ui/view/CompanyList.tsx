import React from 'react';
import { patronInfo } from '@nara.platform/dock';

import { useUserWorkspaces } from 'shared/service/useRequestWorkspaces';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { CompanyItem } from './CompanyItem';
import { useHistory } from 'react-router-dom';

export function CompanyList() {
  const history = useHistory();
  const workspaces = useUserWorkspaces();

  if (workspaces === undefined) {
    return null;
  }

  const onClickItem = (key: string) => {
    patronInfo.setCineroomId(key);
    history.push('/');
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

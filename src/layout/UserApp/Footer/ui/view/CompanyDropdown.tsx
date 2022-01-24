import React, { useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import { useDropdown } from './useDropdown';
import {
  getUserWorkspace,
  useUserWorkspaces,
} from 'shared/service/useRequestUserWorkspaces';
import { patronInfo } from '@nara.platform/dock';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import '../logic/Footer.css';

export function CompanyDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [opened, onToggle] = useDropdown(dropdownRef);
  const workspaces = useUserWorkspaces();

  const filtered = workspaces
    ?.filter((worspace) => worspace.id !== 'ne1-m2-c2')
    .filter((worspace) => worspace.hasChildren === false);

  const onClickItem = (id: string) => {
    patronInfo.setCineroomId(id);
    window.location.reload();
  };

  const selected = getUserWorkspace(patronInfo.getCineroomId() || '');

  return (
    <div className="foot-site" ref={dropdownRef}>
      <div className="f-site-box">
        <div className="f-site-btnbox" onClick={onToggle}>
          <span>{parsePolyglotString(selected?.name)}</span>
          <Icon
            name="chevron down"
            style={opened ? { transform: 'rotate(180deg)' } : {}}
          />
        </div>
        {opened && (
          <div
            className="f-site-menu"
            style={{ display: 'block' }}
            onClick={onToggle}
          >
            <ul>
              {filtered.map((workspace) => (
                <li key={workspace.id} className="link-options">
                  <a onClick={() => onClickItem(workspace.id)}>
                    {parsePolyglotString(workspace.name)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

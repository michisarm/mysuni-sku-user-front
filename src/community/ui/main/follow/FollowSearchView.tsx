import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useMainFollow } from './follow.services';
import {
  onMainFollowSearchChange,
  onMainFollowFilterClick,
} from './follow.events';

export function FollowSearchView() {
  const mainFollow = useMainFollow();
  if (mainFollow === undefined) {
    return null;
  }
  const { search } = mainFollow;

  return (
    <div className="main-left-search">
      <div className="ui h38 search input">
        <input
          type="text"
          placeholder="닉네임을 입력하세요."
          value={search}
          onChange={onMainFollowSearchChange}
          onKeyPress={onMainFollowFilterClick}
        />
        <button onClick={onMainFollowFilterClick}>
          <Icon className="search link" />
        </button>
      </div>
    </div>
  );
}

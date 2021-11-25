import { ChangeEvent } from 'react';
import { getMainFollow, setMainFollow } from './follow.services';
import { getEmptyMainFollow } from './follow.model';

export function onMainFollowSearchChange(e: ChangeEvent<HTMLInputElement>) {
  const value = getMainFollow() || getEmptyMainFollow();
  setMainFollow({
    ...value,
    search: e.target.value,
  });
}

export function onMainFollowFilterClick() {
  const value = getMainFollow() || getEmptyMainFollow();
  setMainFollow({
    ...value,
    filteredItems: value.items.filter((c) =>
      c.profileNickName.includes(value.search)
    ),
  });
}

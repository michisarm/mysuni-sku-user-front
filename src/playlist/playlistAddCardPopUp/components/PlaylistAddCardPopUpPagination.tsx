/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { usePagination } from '../helper/usePagination';
import {
  onChangeNextOffset,
  onChangeOffset,
  onChangePrevOffset,
} from '../playlistAddCardPopUp.events';
import { usePlaylistAddCardPopUpOffset } from '../playlistAddCardPopUp.stores';

export function PlaylistAddCardPopUpPagination() {
  const playlistAddCardPopUpOffset = usePlaylistAddCardPopUpOffset();
  const { offset, totalCount } = playlistAddCardPopUpOffset;

  const pageList = usePagination(totalCount, offset, 5, 4);

  if (pageList.length === 0) {
    return null;
  }

  return (
    <div className="lms-paging-holder">
      <a className="lms-prev" onClick={onChangePrevOffset}>
        이전5개
      </a>
      {pageList.map((pageNumber) => (
        <a
          className={`lms-num ${offset === pageNumber ? 'lms-on' : ''}`}
          key={pageNumber}
          onClick={onChangeOffset}
        >
          {pageNumber}
        </a>
      ))}
      <a className="lms-next" onClick={onChangeNextOffset}>
        이후5개
      </a>
    </div>
  );
}

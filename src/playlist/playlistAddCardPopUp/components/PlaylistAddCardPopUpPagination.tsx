/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { usePagination } from '../helper/usePagination';
import { onChangeOffset } from '../playlistAddCardPopUp.events';
import { usePlaylistAddCardPopUpOffset } from '../playlistAddCardPopUp.stores';

export function PlaylistAddCardPopUpPagination() {
  const playlistAddCardPopUpOffset = usePlaylistAddCardPopUpOffset();
  const { offset, totalCount } = playlistAddCardPopUpOffset;

  const pageList = usePagination(totalCount, offset, 5, 4);
  console.log(offset, totalCount);
  return (
    <div className="lms-paging-holder">
      <a className="lms-prev" onClick={onChangeOffset}>
        이전5개
      </a>
      {pageList.map((pageNumber) => {
        // const onClick = () => {
        //   onPageClick(pageNumber);
        // };

        return (
          <a
            className={`lms-num ${offset === pageNumber ? 'lms-on' : ''}`}
            key={pageNumber}
            onClick={onChangeOffset}
          >
            {pageNumber}
          </a>
        );
      })}
      <a className="lms-next" onClick={onChangeOffset}>
        이후5개
      </a>
    </div>
  );
}

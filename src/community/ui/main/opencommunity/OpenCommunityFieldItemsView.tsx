import {
  requestFindAllOpenCommunities,
  useRequestMainOpenCommunities,
} from './opencommunity.request.services';
import { Icon } from 'semantic-ui-react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FieldItem,
  getEmptyAllWithBookMarkCount,
  getEmptyMainOpenCommunities,
} from './opencommunity.model';
// import {
//   onBookmarkFieldCheckClick,
//   onTotalFieldCheckClick,
// } from './opencommunity.events';
import {
  getMainOpenCommunities,
  setMainOpenCommunities,
  useAllWithBookMarkCount,
  useMainOpenCommunities,
} from './opencommunity.services';
import { onAllFieldCheckClick } from './opencommunity.events';

interface ItemViewProps extends FieldItem {
  fieldId?: string;
}

function ItemView(props: ItemViewProps) {
  const { id, title, fieldId, notJoinedCommunityCount } = props;

  const onClick = useCallback(() => {
    const value = getMainOpenCommunities() || getEmptyMainOpenCommunities();
    setMainOpenCommunities({
      ...value,
      index: 0,
      totalCount: 0,
      items: [],
      fieldId: id,
    });
    requestFindAllOpenCommunities();
  }, [id]);
  return (
    <label htmlFor={`field-item-view-${id}`} className="check-type1">
      <input
        type="checkbox"
        id={`field-item-view-${id}`}
        onClick={onClick}
        onChange={() => {}}
        checked={id === fieldId}
      />
      <span className="check-type1-text">
        {title} &nbsp;
        <span>{notJoinedCommunityCount}</span>
      </span>
    </label>
  );
}

export function OpenCommunityFieldItemsView() {
  useRequestMainOpenCommunities();
  const openCommunities = useMainOpenCommunities();
  const allWithBookMarkCount =
    useAllWithBookMarkCount() || getEmptyAllWithBookMarkCount();

  const [scollLeft, setScrollLeft] = useState<number>(0);
  const [canRight, setCanRight] = useState<boolean>(false);

  const leftClick = useCallback(() => {
    if (scollLeft >= 0) {
      return;
    }
    const slide = document.getElementById('community-slide-inner');
    const button = document.getElementById('community-slide-prev');
    if (slide === null || button === null) {
      return;
    }
    if (button.hasAttribute('disabled')) {
      return;
    }
    const next = Math.min(scollLeft + 200, 0);
    function onTransitionEnd() {
      setScrollLeft(next);
      button?.removeAttribute('disabled');
    }
    if (slide.animate !== undefined) {
      button.setAttribute('disabled', '');

      const animation = slide.animate(
        [{ transform: `translate(${next}px, 0)` }],
        500,
      );
      animation.onfinish = onTransitionEnd;
    } else {
      setScrollLeft(next);
    }
  }, [scollLeft]);

  const rightClick = useCallback(() => {
    const content = document.getElementById('community-slide-content');
    const slide = document.getElementById('community-slide-inner');
    const button = document.getElementById('community-slide-next');
    if (slide === null || button === null || content === null) {
      return;
    }
    if (slide.clientWidth - content.clientWidth + scollLeft < 0) {
      return;
    }
    if (button.hasAttribute('disabled')) {
      return;
    }
    const next = Math.min(scollLeft - 200, 0);
    function onTransitionEnd() {
      setScrollLeft(next);
      button?.removeAttribute('disabled');
    }
    if (slide.animate !== undefined) {
      button.setAttribute('disabled', '');

      const animation = slide.animate(
        [{ transform: `translate(${next}px, 0)` }],
        500,
      );
      animation.onfinish = onTransitionEnd;
    } else {
      setScrollLeft(next);
    }
  }, [scollLeft]);

  useEffect(() => {
    const content = document.getElementById('community-slide-content');
    const slide = document.getElementById('community-slide-inner');
    if (slide === null || content === null) {
      return;
    }
    if (slide.clientWidth - content.clientWidth + scollLeft < 0) {
      setCanRight(false);
      return;
    }
    setCanRight(true);
  }, [scollLeft, openCommunities?.fieldItems]);

  if (openCommunities === undefined) {
    return null;
  }
  const { fieldItems, fieldId } = openCommunities;

  return (
    <div className="community-slide-wrap">
      <button
        className="community-slide-prev"
        id="community-slide-prev"
        onClick={leftClick}
      >
        {/* 활성시 on */}
        <Icon className={`prev-${scollLeft < 0 ? 'on' : 'off'}`} />
      </button>
      <div className="community-slide-content" id="community-slide-content">
        <div
          className="community-slide-inner"
          id="community-slide-inner"
          style={{ transform: `translate(${scollLeft}px, 0)` }}
        >
          <label htmlFor="field-item-view-all" className="check-type1">
            <input
              type="checkbox"
              id="field-item-view-all"
              checked={fieldId === 'all'}
              onChange={onAllFieldCheckClick}
              value="all"
            />
            <span className="check-type1-text">
              전체 &nbsp;
              <span>{allWithBookMarkCount.allCount}</span>
            </span>
          </label>
          <label htmlFor="field-item-view-bookmark" className="check-type1">
            <input
              type="checkbox"
              id="field-item-view-bookmark"
              checked={fieldId === 'bookmark'}
              onChange={onAllFieldCheckClick}
              value="bookmark"
            />
            <span className="check-type1-text">
              즐겨찾기 &nbsp;
              <span>{allWithBookMarkCount.bookMarkedCount}</span>
            </span>
          </label>
          {fieldItems.map(fieldItem => (
            <ItemView key={fieldItem.id} fieldId={fieldId} {...fieldItem} />
          ))}
        </div>
      </div>
      <button
        className="community-slide-next"
        id="community-slide-next"
        onClick={rightClick}
      >
        {/* 비활성시 off */}
        <Icon className={`next-${canRight ? 'on' : 'off'}`} />
      </button>
    </div>
  );
}

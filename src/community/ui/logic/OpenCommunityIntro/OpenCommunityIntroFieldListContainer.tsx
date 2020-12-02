import React, { useCallback, useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { requestOpenCommunityList } from '../../../service/useOpenCommunityIntro/utility/requestOpenCommunityIntro';
import {
  getOpenCommunityIntro,
  setOpenCommunityIntro,
  useOpenCommunityIntro,
} from '../../../store/CommunityMainStore';
import FieldItem from '../../../viewModel/OpenCommunityIntro/FieldItem';
import { getEmptyOpenCommunityIntro } from '../../../viewModel/OpenCommunityIntro/OpenCommunityIntro';

interface FieldItemViewProps {
  fieldId?: string;
}

const FieldItemView: React.FC<FieldItem &
  FieldItemViewProps> = function FieldItemView({ id, title, fieldId }) {
  const onClick = useCallback(() => {
    const openCommunityIntro =
      getOpenCommunityIntro() || getEmptyOpenCommunityIntro();
    if (openCommunityIntro.fieldId === id) {
      return;
    }
    setOpenCommunityIntro({ ...openCommunityIntro, fieldId: id });
    requestOpenCommunityList();
  }, [id]);
  return (
    <label htmlFor={`field-item-view-${id}`} className="check-type1">
      <input
        type="checkbox"
        id={`field-item-view-${id}`}
        onClick={onClick}
        checked={id === fieldId}
      />
      <span className="check-type1-text">{title}</span>
    </label>
  );
};

function OpenCommunityIntroFieldListContainer() {
  const openCommunityIntro = useOpenCommunityIntro();

  const onClickAll = useCallback(() => {
    const openCommunityIntro =
      getOpenCommunityIntro() || getEmptyOpenCommunityIntro();
    if (openCommunityIntro.fieldId === undefined) {
      return;
    }
    setOpenCommunityIntro({ ...openCommunityIntro, fieldId: undefined });
    requestOpenCommunityList();
  }, []);

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
        500
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
        500
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
  }, [scollLeft, openCommunityIntro?.fields]);

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
              checked={openCommunityIntro?.fieldId === undefined}
              onClick={onClickAll}
            />
            <span className="check-type1-text">전체</span>
          </label>
          {openCommunityIntro &&
            openCommunityIntro.fields.map(fieldItem => (
              <FieldItemView
                key={fieldItem.id}
                fieldId={openCommunityIntro.fieldId}
                {...fieldItem}
              />
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

export default OpenCommunityIntroFieldListContainer;

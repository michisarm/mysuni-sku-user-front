import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  cubeCount: number;
  collapsedIds: string[];
  onToggle: (nextCollapsedIds: string[]) => void;
  contentId: string;
  path: string;
  activated: boolean;
}

export function ChapterStructureView(props: Props) {
  const {
    name,
    cubeCount,
    collapsedIds,
    onToggle,
    contentId,
    path,
    activated,
  } = props;
  const onToggleClick = useCallback(() => {
    if (collapsedIds.includes(contentId)) {
      onToggle(collapsedIds.filter(c => c !== contentId));
    } else {
      onToggle([...collapsedIds, contentId]);
    }
  }, [collapsedIds, contentId]);
  return (
    <Link to={path}>
      <div
        className={`accordion-state-holder ${activated == true && 'act-on'}`}
      >
        <a className="btn-over-view enable v2">{name}</a>
        <a
          className={`btn-accordion ${!collapsedIds.includes(contentId) &&
            'open'}`}
          onClick={onToggleClick}
        >
          총<strong>{`${cubeCount}개`}</strong> 강의 구성
        </a>
      </div>
    </Link>
  );
}

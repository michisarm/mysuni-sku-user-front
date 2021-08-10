import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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
      onToggle(collapsedIds.filter((c) => c !== contentId));
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
          className={`btn-accordion ${
            !collapsedIds.includes(contentId) && 'open'
          }`}
          Chapter-Structure-구성갯수
          onClick={onToggleClick}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `총<strong>{cubeCount}개</strong> 구성`,
                'Chapter-Structure-구성갯수',
                { cubeCount: cubeCount.toString() }
              ),
            }}
          />
        </a>
      </div>
    </Link>
  );
}

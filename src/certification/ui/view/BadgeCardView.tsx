import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import LectureParams, {
  toPath,
} from '../../../lecture/detail/viewModel/LectureParams';

interface BadgeCardViewProps {
  cardId: string;
  cardName: string;
  cubeCount: string;
  isPassed: boolean;
}

function BadgeCardView({
  cardId,
  cardName,
  cubeCount,
  isPassed,
}: BadgeCardViewProps) {
  const history = useHistory();

  const moveToCardPage = useCallback((cardId: string) => {
    const params: LectureParams = {
      cardId,
      viewType: 'view',
      pathname: '',
    };

    history.push(toPath(params));
  }, []);

  return (
    <div className="bar">
      <div className="tit">
        <a className="ellipsis" href="#" onClick={e => { moveToCardPage(cardId); e.preventDefault(); }}>
          {cardName}
        </a>
      </div>
      <span className="num" onClick={() => moveToCardPage(cardId)}>
        {cubeCount}개 강의 구성
        {isPassed && <span className="completed">학습완료</span>}
      </span>
    </div>
  );
}

export default BadgeCardView;

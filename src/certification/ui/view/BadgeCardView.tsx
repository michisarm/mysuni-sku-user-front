import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import LectureParams, {
  toPath,
} from '../../../lecture/detail/viewModel/LectureParams';
import {
  PolyglotText,
  getPolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

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
        <a
          className="ellipsis"
          href="#"
          onClick={(e) => {
            moveToCardPage(cardId);
            e.preventDefault();
          }}
        >
          {cardName}
        </a>
      </div>
      <span className="num" onClick={() => moveToCardPage(cardId)}>
        <div
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              `{cubeCount}개 강의 구성`,
              'Certification-View-갯수',
              {
                cubeCount,
              }
            ),
          }}
        />

        {isPassed && (
          <span className="completed">
            <PolyglotText
              id="Certification-View-학습완료"
              defaultString="학습완료"
            />
          </span>
        )}
      </span>
    </div>
  );
}

export default BadgeCardView;

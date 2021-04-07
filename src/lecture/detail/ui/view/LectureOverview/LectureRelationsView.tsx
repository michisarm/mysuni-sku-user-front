import { patronInfo } from '@nara.platform/dock';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';
import LectureModel from '../../../../model/LectureModel';
import CardGroup, {
  GroupType,
} from '../../../../shared/Lecture/sub/CardGroup/CardGroupContainer';
import BoxCardView from '../../../../shared/Lecture/ui/view/BoxCardView';
import LectureRelations from '../../../viewModel/LectureOverview/LectureRelations';
import lectureRoutePaths from '../../../../routePaths';
import CardView from '../../../../shared/Lecture/ui/view/CardVIew';

interface LectureRelationsViewProps {
  lectureRelations: LectureRelations;
}

interface LectureViewProps {
  model: LectureModel;
  thumbnailImage?: string;
  rating?: number;
}

const LectureView: React.FC<LectureViewProps> = function LectureView({
  model,
  thumbnailImage,
  rating,
}) {
  const [hovered, setHovered] = useState<boolean>(false);
  const history = useHistory();

  const onHoverIn = useCallback(() => {
    setHovered(true);
  }, []);

  const onHoverOut = useCallback(() => {
    setHovered(false);
  }, []);

  const onViewDetail = useCallback(
    (_: any) => {
      const cineroom = patronInfo.getCineroomByDomain(model)!;

      history.push(lectureRoutePaths.courseOverview(model.cardId));
    },
    [history, model]
  );

  let state = model.state;
  let date;

  if (model.required && !state) {
    state = '권장과정';
    rating = undefined;
    date = undefined;
  } else if (state) {
    rating = undefined;
    date = model.timeStrByState;
  }

  return (
    <li>
      <CardGroup type={GroupType.Box}>
        <BoxCardView
          model={model}
          hovered={hovered}
          rating={rating}
          state={state}
          date={date}
          thumbnailImage={thumbnailImage}
          onViewDetail={onViewDetail}
          onHoverIn={onHoverIn}
          onHoverOut={onHoverOut}
        />
      </CardGroup>
    </li>
  );
};

const LectureRelationsView: React.FC<LectureRelationsViewProps> = function LectureRelationsView({
  lectureRelations,
}) {
  return (
    <div className="badge-detail border-none" id="lms-related-process">
      <div className="ov-paragraph">
        <div className="section-head">
          <div className="title">
            <h3 className="title-style">
              <Label className="onlytext bold size24">
                <Icon className="before" />
                <span>{/*Tag*/}관련과정</span>
              </Label>
            </h3>
          </div>
        </div>
        <div className="scrolling">
          <ul className="belt">
            {lectureRelations.cards.map(({ card, cardRelatedCount }) => {
              return (
                <li key={card.id}>
                  <div className="ui cards box-cards">
                    <CardView
                      cardId={card.id}
                      {...card}
                      {...cardRelatedCount}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LectureRelationsView;

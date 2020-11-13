import { patronInfo } from '@nara.platform/dock';
import { boolean } from '@storybook/addon-knobs';
import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';
import LectureModel from '../../../../model/LectureModel';
import CardGroup, {
  GroupType,
} from '../../../../shared/Lecture/sub/CardGroup/CardGroupContainer';
import LectureContainer from '../../../../shared/Lecture/ui/logic/LectureContainer';
import BoxCardView from '../../../../shared/Lecture/ui/view/BoxCardView';
import ListCardView from '../../../../shared/Lecture/ui/view/ListCardView';
import LectureRelations from '../../../viewModel/LectureOverview/LectureRelations';
import lectureRoutePaths from '../../../../routePaths';

interface LectureRelationsViewProps {
  lectureRelations: LectureRelations;
}

interface LectureViewProps {
  model: LectureModel;
  thumbnailImage?: string;
  onAction: () => void;
  rating?: number;
}

interface CourseDetailParams {
  cineroomId?: string;
  collegeId: string;
  coursePlanId: string;
  serviceType: string;
  serviceId: string;
}

const LectureView: React.FC<LectureViewProps> = function LectureView({
  model,
  thumbnailImage,
  onAction,
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

      history.push(
        lectureRoutePaths.courseOverview(
          cineroom.id,
          model.category.college.id,
          model.coursePlanId,
          model.serviceType,
          model.serviceId
        )
      );
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
            {lectureRelations.lectures.map(lecture => {
              return (
                <LectureView
                  model={new LectureModel(lecture)}
                  thumbnailImage={lecture.baseUrl || undefined}
                  onAction={() => {}}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LectureRelationsView;

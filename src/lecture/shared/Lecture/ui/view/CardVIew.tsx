import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import {
  Button,
  Card,
  Icon,
  Rating,
  Label,
  ButtonProps,
} from 'semantic-ui-react';
import {
  Field,
  Fields,
  Ribbon,
  SubField,
  Thumbnail,
  Title,
} from '../../../ui/view/LectureElementsView';
import numeral from 'numeral';
import { CardCategory } from 'shared/model/CardCategory';
import { dateTimeHelper } from 'shared';
import {
  getCollgeName,
  getColor,
} from '../../../../../shared/service/useCollege/useRequestCollege';
import { Link } from 'react-router-dom';
import { toPath } from '../../../../detail/viewModel/LectureParams';
import { InMyLectureModel } from '../../../../../myTraining/model';
import { autorun } from 'mobx';
import InMyLectureService from '../../../../../myTraining/present/logic/InMyLectureService';

interface Props {
  cardId: string;
  learningTime: number;
  thumbImagePath: string;
  categories: CardCategory[];
  name: string;
  stampCount: number;
  passedStudentCount: number;
  starCount: number;
  description: string;
}

function CardView({
  cardId,
  name,
  starCount,
  stampCount,
  categories,
  description,
  learningTime,
  thumbImagePath,
  passedStudentCount,
}: Props) {
  const [inMyLectureMap, setInMyLectureMap] = useState<
    Map<string, InMyLectureModel>
  >();
  const [inMyLectureModel, setInMyLectureModel] = useState<InMyLectureModel>();
  const [hovered, setHovered] = useState(false);
  const iconName = useMemo(() => {
    if (inMyLectureModel === undefined) {
      return 'add-list';
    }
    return 'remove2';
  }, [inMyLectureModel]);
  useEffect(() => {
    return autorun(() => {
      setInMyLectureMap(InMyLectureService.instance.inMyLectureMap);
    });
  }, []);
  useEffect(() => {
    setInMyLectureModel(inMyLectureMap?.get(cardId));
  }, [inMyLectureMap, cardId]);
  const hourMinuteFormat = useMemo(
    () => dateTimeHelper.timeToHourMinuteFormat(learningTime),
    [learningTime]
  );
  const collegeId = useMemo(() => categories[0].collegeId, [categories]);

  const onHoverIn = useCallback(() => {
    setHovered(true);
  }, []);

  const onHoverOut = useCallback(() => {
    setHovered(false);
  }, []);

  const action = useCallback(() => {}, [inMyLectureModel]);

  return (
    <Card
      className={classNames({
        'card-h': true,
        on: hovered,
      })}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <div className="card-inner">
        <Thumbnail image={thumbImagePath} />
        <div className="title-area">
          {
            <Label className={getColor(collegeId)}>
              {getCollgeName(collegeId)}
            </Label>
          }
          <div className="header">{name}</div>
        </div>

        <Fields>
          {(learningTime || stampCount) && (
            <div className="li">
              {learningTime && (
                <SubField icon="time2" bold text={hourMinuteFormat} />
              )}
              {stampCount > 0 && (
                <SubField
                  className={(learningTime && 'card-stamp') || ''}
                  bold
                  icon="stamp"
                  text={`Stamp x${stampCount}`}
                />
              )}
            </div>
          )}
          <Field
            icon="complete"
            text={`이수 ${numeral(passedStudentCount).format('0,0')}명`}
          />
        </Fields>
        <div className="foot-area">
          <div className="fixed-rating">
            <Rating
              className="rating-num"
              size="small"
              disabled
              rating={starCount}
              maxRating={5}
            />
          </div>
        </div>
      </div>
      <div className="hover-content">
        <div className="title-area">
          {categories && (
            <Label className={getColor(collegeId)}>
              {getCollgeName(collegeId)}
            </Label>
          )}
          <div className="header">{name}</div>
        </div>
        <p
          className="text-area"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="btn-area">
          <Button icon className="icon-line">
            <Icon className={iconName} />
          </Button>
          {/* onClick={onAction} */}
          <Link to={toPath({ cardId, viewType: 'view' })}>
            <button className="ui button fix bg">상세보기</button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default CardView;

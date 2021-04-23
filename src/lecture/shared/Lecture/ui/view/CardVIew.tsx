import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Button, Card, Icon, Rating, Label } from 'semantic-ui-react';
import {
  Field,
  Fields,
  SubField,
  Thumbnail,
} from '../../../ui/view/LectureElementsView';
import numeral from 'numeral';
import { reactAlert } from '@nara.platform/accent';
import { InMyLectureService } from 'myTraining/stores';
import { CardCategory } from 'shared/model/CardCategory';
import { dateTimeHelper } from 'shared';
import {
  useRequestCollege,
  getCollgeName,
  getColor,
} from '../../../../../shared/service/useCollege/useRequestCollege';
import { find } from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toPath } from '../../../../detail/viewModel/LectureParams';
import { InMyLectureModel } from '../../../../../myTraining/model';
import { autorun } from 'mobx';
import CardType from '../../../model/CardType';
import CubeIconType from '../../model/CubeIconType';
import CubeNameType from '../../../../../personalcube/personalcube/model/CubeTypeNameType';

interface Props {
  cardId: string;
  learningTime: number;
  thumbImagePath: string;
  mainCategory: CardCategory;
  name: string;
  stampCount: number;
  passedStudentCount: number;
  starCount: number;
  simpleDescription: string;
  type: CardType;
  isRequired?: boolean;
  studentCount?: number;
  remainingDayCount?: number;
  capacity?: number;
}

export default function CardView({
  cardId,
  name,
  starCount,
  stampCount,
  mainCategory,
  simpleDescription,
  learningTime,
  thumbImagePath,
  passedStudentCount,
  type,
  isRequired,
  capacity,
  remainingDayCount,
  studentCount,
}: Props) {
  const [inMyLectureMap, setInMyLectureMap] = useState<
    Map<string, InMyLectureModel>
  >();
  const [inMyLectureModel, setInMyLectureModel] = useState<InMyLectureModel>();
  const [hovered, setHovered] = useState(false);

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

  const collegeId = useMemo(() => mainCategory.collegeId, [mainCategory]);

  const onHoverIn = useCallback(() => {
    setHovered(true);
  }, []);

  const onHoverOut = useCallback(() => {
    setHovered(false);
  }, []);

  const handleAlert = (inMyLectureModel?: InMyLectureModel) => {
    reactAlert({
      title: '알림',
      message: inMyLectureModel
        ? '본 과정이 관심목록에서 제외되었습니다.'
        : '본 과정이 관심목록에 추가되었습니다.',
    });
  };

  const handleInMyLecture = () => {
    if (inMyLectureModel) {
      InMyLectureService.instance.removeInMyLectureCard(cardId);
    } else {
      InMyLectureService.instance.addInMyLectureCard({
        serviceId: cardId,
        serviceType: 'Card',
        category: {
          channelId: mainCategory.channelId,
          collegeId: mainCategory.collegeId,
          mainCategory: mainCategory.mainCategory,
        },
        name,
        cubeType: type,
        learningTime,
        stampCount,
      });
    }

    handleAlert(inMyLectureModel);
  };

  const getEducationDate = (
    state: 'inProgressTableViews' | 'completedTableViews'
  ) => {
    const educationStateList = sessionStorage.getItem(state);

    const parserEducationStateList =
      educationStateList && JSON.parse(educationStateList);

    const filterEducationState = find(parserEducationStateList, {
      serviceId: cardId,
    });

    if (state === 'inProgressTableViews') {
      return (
        filterEducationState &&
        moment(Number(filterEducationState.startDate)).format('YYYY.MM.DD')
      );
    } else {
      return (
        filterEducationState &&
        moment(Number(filterEducationState.endDate)).format('YYYY.MM.DD')
      );
    }
  };

  const renderBottom = () => {
    const startDate = getEducationDate('inProgressTableViews');
    const endDate = getEducationDate('completedTableViews');

    if (startDate || endDate) {
      const text = startDate ? '학습중' : endDate && '학습 완료';
      const date = startDate || endDate;
      return (
        <>
          <Label className="onlytext bold">
            <Icon className="state" />
            <span>{text}</span>
          </Label>
          <div className="study-date">{`${date} 학습 시작`}</div>
        </>
      );
    }

    return (
      <div className="fixed-rating">
        <Rating
          className="rating-num"
          size="small"
          disabled
          rating={starCount}
          maxRating={5}
        />
      </div>
    );
  };

  const renderRibbon = () => {
    if (
      studentCount !== undefined &&
      capacity !== undefined &&
      remainingDayCount !== undefined
    ) {
      if (studentCount >= capacity) {
        return <Label className="done">정원 마감</Label>;
      }

      if (remainingDayCount === 0) {
        return <Label className="day">오늘 마감</Label>;
      } else {
        return <Label className="day">D-{remainingDayCount}</Label>;
      }
    }

    if (isRequired) {
      return <Label className="ribbon2">핵인싸과정</Label>;
    }
  };

  return (
    <Card
      className={classNames({
        'card-h': true,
        on: hovered,
      })}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <div className="card-ribbon-wrap">{renderRibbon()}</div>
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
          <div className="li">
            <Label className="onlytext bold">
              <Icon className={CubeIconType[type]} />
              <span>{CubeNameType[type]}</span>
            </Label>
          </div>
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
        <div className="foot-area">{renderBottom()}</div>
      </div>
      <div className="hover-content">
        <div className="title-area">
          {mainCategory && (
            <Label className={getColor(collegeId)}>
              {getCollgeName(collegeId)}
            </Label>
          )}
        </div>
        <p
          className="text-area"
          dangerouslySetInnerHTML={{ __html: simpleDescription }}
        />
        <div className="btn-area">
          <Button icon className="icon-line" onClick={handleInMyLecture}>
            <Icon className={inMyLectureModel ? 'remove2' : 'add-list'} />
          </Button>
          <Link to={toPath({ cardId, viewType: 'view', pathname: '' })}>
            <button className="ui button fix bg">상세보기</button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

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
import { observer, inject } from 'mobx-react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import { InMyLectureService } from 'myTraining/stores';
import { CardCategory } from 'shared/model/CardCategory';
import { dateTimeHelper } from 'shared';
import {
  getCollgeName,
  getColor,
} from '../../../../../shared/service/useCollege/useRequestCollege';
import { find } from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toPath } from '../../../../detail/viewModel/LectureParams';
import { InMyLectureModel } from '../../../../../myTraining/model';
import { autorun } from 'mobx';

interface Props {
  isRequired?: boolean;
  cardId: string;
  learningTime: number;
  thumbImagePath: string;
  mainCategory: CardCategory;
  name: string;
  stampCount: number;
  passedStudentCount: number;
  starCount: number;
  description: string;
  inMyLectureService?: InMyLectureService;
  contentType?: string;
}

function CardView({
  isRequired,
  cardId,
  name,
  starCount,
  stampCount,
  mainCategory,
  description,
  learningTime,
  thumbImagePath,
  passedStudentCount,
  inMyLectureService,
  contentType,
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
      inMyLectureService!.removeInMyLectureCard(cardId, cardId);
    } else {
      inMyLectureService!.addInMyLectureCard({
        cardId,
        serviceId: cardId,
        serviceType: 'Card',
        category: {
          channelId: mainCategory.channelId,
          collegeId: mainCategory.collegeId,
          mainCategory: mainCategory.mainCategory,
        },
        name,
        learningTime,
        stampCount,
      });
    }

    handleAlert(inMyLectureModel);
  };

  const renderBottom = () => {
    const progressList = sessionStorage.getItem('inProgressTableViews');
    const completeList = sessionStorage.getItem('completedTableViews');

    const parserProgressList = progressList && JSON.parse(progressList);
    const parserCompleteList = completeList && JSON.parse(completeList);

    const filterProgress = find(parserProgressList, { serviceId: cardId });
    const filterComplete = find(parserCompleteList, { serviceId: cardId });

    if (filterProgress) {
      const startDate = moment(Number(filterProgress.startDate)).format(
        'YYYY.MM.DD'
      );
      return (
        <>
          <Label className="onlytext bold">
            <Icon className="state" />
            <span>학습중</span>
          </Label>
          <div className="study-date">{`${startDate} 학습 시작`}</div>
        </>
      );
    }

    if (filterComplete) {
      const endDate = moment(Number(filterComplete.endDate)).format(
        'YYYY.MM.DD'
      );

      return (
        <>
          <Label className="onlytext bold">
            <Icon className="state" />
            <span>학습 완료</span>
          </Label>
          <div className="study-date">{`${endDate} 학습 완료`}</div>
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

  return (
    <Card
      className={classNames({
        'card-h': true,
        on: hovered,
      })}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {/* Todo: stampReady */}
      <div className="card-ribbon-wrap">
        {isRequired && <Label className="ribbon2">핵인싸과정</Label>}
        {contentType && contentType === 'Enrolling' && (
          // 나중에 정원 정보 추가 되면 수정 해야함
          <Label className="ribbon2">정원 마감</Label>
        )}
        {/* { stampReady && <Label className="ribbon2">Stamp</Label>} */}
      </div>
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
        <div className="foot-area">{renderBottom()}</div>
      </div>
      <div className="hover-content">
        <div className="title-area">
          {mainCategory && (
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

export default inject(mobxHelper.injectFrom('myTraining.inMyLectureService'))(
  observer(CardView)
);

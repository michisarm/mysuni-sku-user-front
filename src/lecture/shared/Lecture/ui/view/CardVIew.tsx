import React, { useState } from 'react';
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
import { find } from 'lodash';

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
  iconName: string;
  // state?: string;
  // date?: string;
  // action?: Action;
  onAction?: () => void;
  onViewDetail?: (_: React.MouseEvent, data: ButtonProps) => void;
}

function CardView({
  cardId,
  name,
  iconName,
  starCount,
  stampCount,
  categories,
  description,
  learningTime,
  thumbImagePath,
  passedStudentCount,
  onAction,
  onViewDetail,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const hourMinuteFormat = dateTimeHelper.timeToHourMinuteFormat(learningTime);
  const collegeId = categories[0].collegeId;

  const onHoverIn = () => {
    setHovered(true);
  };

  const onHoverOut = () => {
    setHovered(false);
  };

  const renderBottom = () => {
    const progressList = sessionStorage.getItem('inProgressTableViews');
    const completeList = sessionStorage.getItem('completedTableViews');

    const parserProgressList = progressList && JSON.parse(progressList);
    const parserCompleteList = completeList && JSON.parse(completeList);

    if (find(parserProgressList, { serviceId: cardId })) {
      return (
        <Label className="onlytext bold">
          <Icon className="state" />
          <span>학습중</span>
        </Label>
      );
    }

    if (find(parserCompleteList, { serviceId: cardId })) {
      return (
        <Label className="onlytext bold">
          <Icon className="state" />
          <span>학습 완료</span>
        </Label>
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
      {/* <Ribbon required={model!.required} /> */}

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

        {/*아이콘과 정보 영역*/}
        <Fields>
          {
            // model.cubeTypeName && (
            //   <Field
            //     icon={
            //       CubeIconType[model.cubeType] ||
            //       CubeIconType[model.serviceType]
            //     }
            //     text={model.cubeTypeName}
            //     bold
            //   >
            //     {/*0630 PSJ 수강신청, 유료과정에 대한 메타 정보*/}
            //     {(model.cubeType === CubeType.ClassRoomLecture ||
            //       model.cubeType === CubeType.ELearning) && (
            //       <>
            //         {/*0630 size12 클래스는 유료과정+수강신청일 경우에만 적용*/}
            //         {/*<span className={ classNames('g-text', 'size12')}>유료과정&amp;수강신청</span>*/}
            //       </>
            //     )}
            //   </Field>
            // )
          }

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

      {/* hover 시 컨텐츠 */}
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
          <Button icon className="icon-line" onClick={onAction}>
            <Icon className={iconName} />
          </Button>
          <Button
            className="ui button fix bg"
            id={cardId}
            onClick={onViewDetail}
          >
            상세보기
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CardView;

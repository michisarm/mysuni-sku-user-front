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
          {/* {typeof state === 'string' && (
              <Label className="onlytext bold">
                <Icon className="state" />
                <span>{state}</span>
              </Label>
            )} */}
          {/* {typeof date === 'string' && <div className="study-date">{date}</div>} */}
          {/* Todo: 기획, 도메인 확인 후 속성명 정의하여 props에 추가 */}
          {/*<Label className="bold onlytext">*/}
          {/*  <Icon className="state" /><span>Required</span> // In Progress, Enrolled, Completed, Cancelled */}
          {/*</Label>*/}
          {/*<div className="study-date">19.10.10 필수 학습 등록</div>*/}
        </div>
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
          {/* {action && (
            <> */}
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
          {/* </>
          )}
          {!action && (
            <Button
              className="ui button fix bg"
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '13.75rem',
              }}
              onClick={onViewDetail}
            >
              상세보기
            </Button>
          )} */}
        </div>
      </div>
    </Card>
  );
}

export default CardView;

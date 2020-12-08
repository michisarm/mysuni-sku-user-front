import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import numeral from 'numeral';
import { Button, Card, Icon, Rating, Label } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { CubeTypeNameType } from 'personalcube/personalcube/model';
import { InMyLectureModel, MyTrainingModel } from 'myTraining/model';

import { LectureModel } from '../../../../model';
import {
  Buttons,
  Field,
  Fields,
  Ribbon,
  SubField,
  Thumbnail,
  Title,
} from '../../../ui/view/LectureElementsView';
import Action from '../../model/Action';
import { CubeIconType } from '../../model';
// 고도화
import { CubeType } from '../../../../../shared/model';

interface Props {
  model: LectureModel | MyTrainingModel | InMyLectureModel;
  hovered: boolean;
  rating?: number;
  state?: string;
  date?: string;
  thumbnailImage?: string;
  action?: Action;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
  onAction?: () => void;
  onViewDetail?: (e: any) => void;
}

interface States {
  hovered: boolean;
}

@reactAutobind
@observer
class BoxCardView extends Component<Props, States> {
  //
  static defaultProps = {
    rating: null,
    state: null,
    date: null,
    thumbnailImage: null,
    action: null,
    onHover: () => {},
    onAction: () => {},
    onViewDetail: () => {},
  };

  renderBottom() {
    //
    const { rating, state, date } = this.props;

    return (
      <div className="foot-area">
        {typeof rating === 'number' && (
          <div className="fixed-rating">
            <Rating
              className="rating-num"
              size="small"
              disabled
              rating={rating}
              maxRating={5}
            />
          </div>
        )}
        {typeof state === 'string' && (
          <Label className="onlytext bold">
            <Icon className="state" />
            <span>{state}</span>
          </Label>
        )}
        {typeof date === 'string' && <div className="study-date">{date}</div>}
        {/* Todo: 기획, 도메인 확인 후 속성명 정의하여 props에 추가 */}
        {/*<Label className="bold onlytext">*/}
        {/*  <Icon className="state" /><span>Required</span> // In Progress, Enrolled, Completed, Cancelled */}
        {/*</Label>*/}
        {/*<div className="study-date">19.10.10 필수 학습 등록</div>*/}
      </div>
    );
  }

  render() {
    //
    const {
      model,
      hovered,
      thumbnailImage,
      action,
      onHoverIn,
      onHoverOut,
      onAction,
      onViewDetail,
    } = this.props;

    const hourMinuteFormat = dateTimeHelper.timeToHourMinuteFormat(
      model!.learningTime
    );

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
        <Ribbon required={model!.required} />

        <div className="card-inner">
          <Thumbnail image={thumbnailImage} />

          <Title title={model.name} category={model.category} />

          {/*아이콘과 정보 영역*/}
          <Fields>
            {model.cubeTypeName && (
              <Field
                icon={
                  CubeIconType[model.cubeType] ||
                  CubeIconType[model.serviceType]
                }
                text={model.cubeTypeName}
                bold
              >
                {/*0630 PSJ 수강신청, 유료과정에 대한 메타 정보*/}
                {(model.cubeType === CubeType.ClassRoomLecture ||
                  model.cubeType === CubeType.ELearning) && (
                  <>
                    {/*0630 size12 클래스는 유료과정+수강신청일 경우에만 적용*/}
                    {/*<span className={ classNames('g-text', 'size12')}>유료과정&amp;수강신청</span>*/}
                  </>
                )}
              </Field>
            )}

            {((model!.learningTime ||
              (model.cubeTypeName === CubeTypeNameType.Program &&
                model.stampCount)) && (
              <div className="li">
                {(model!.learningTime && (
                  <SubField icon="time2" bold text={hourMinuteFormat} />
                )) ||
                  null}
                {(model.cubeTypeName === CubeTypeNameType.Program &&
                  model.stampCount && (
                    <SubField
                      className={(model!.learningTime && 'card-stamp') || ''}
                      bold
                      icon="stamp"
                      text={`Stamp x${model.stampCount}`}
                    />
                  )) ||
                  null}
              </div>
            )) ||
              null}
            <Field
              icon="complete"
              text={`이수 ${numeral(model.passedStudentCount).format('0,0')}명`}
            />
          </Fields>

          {this.renderBottom()}
        </div>

        {/* hover 시 컨텐츠 */}
        <div className="hover-content">
          <Title title={model.name} category={model.category} />

          <p
            className="text-area"
            dangerouslySetInnerHTML={{ __html: model.description }}
          />

          <Buttons>
            {action && (
              <>
                <Button icon className="icon-line" onClick={onAction}>
                  <Icon className={action.iconName} />
                </Button>
                <Button className="ui button fix bg" onClick={onViewDetail}>
                  상세보기
                </Button>
              </>
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
            )}
          </Buttons>
        </div>
      </Card>
    );
  }
}

export default BoxCardView;

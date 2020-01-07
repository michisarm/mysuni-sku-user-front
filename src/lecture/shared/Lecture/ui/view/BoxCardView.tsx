import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import classNames from 'classnames';
import numeral from 'numeral';
import { Button, Card, Icon, Rating, Label } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { LectureModel } from 'lecture/index';
import { InMyLectureModel, MyTrainingModel } from 'mypage';
import { CubeTypeNameType } from 'personalcube/personalcube';
import Action from '../../model/Action';
import { CubeIconType } from '../../model';
import { Buttons, Field, Fields, Ribbon, SubField, Thumbnail, Title } from '../../../ui/view/LectureElementsView';


interface Props {
  model: LectureModel | MyTrainingModel | InMyLectureModel,
  hovered: boolean,
  rating?: number,
  state?: string,
  date?: string,
  thumbnailImage?: string,
  action?: Action,
  onHoverIn?: () => void,
  onHoverOut?: () => void,
  onAction?: () => void,
  onViewDetail?: (e: any) => void,
}

interface States {
  hovered: boolean,
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
        { typeof rating === 'number' && (
          <div className="fixed-rating">
            <Rating className="rating-num" size="small" disabled rating={rating} maxRating={5} />
          </div>
        )}
        {
          typeof state === 'string'  && (
            <Label className="onlytext bold">
              <Icon className="state" /><span>{state}</span>
            </Label>
          )
        }
        {
          typeof date === 'string'  && (
            <div className="study-date">{date} 학습 시작</div>
          )
        }

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
      model, hovered, thumbnailImage, action,
      onHoverIn, onHoverOut, onAction, onViewDetail,
    } = this.props;
    const hourMinuteFormat = dateTimeHelper.timeToHourMinuteFormat(model!.learningTime);

    return (
      <Card
        className={classNames({
          'card-h': true,
          on: hovered,
        })}
        onMouseOver={onHoverIn}
        onMouseOut={onHoverOut}
      >
        {/* Todo: stampReady */}
        <Ribbon required={model!.required} />

        <div className="card-inner">
          <Thumbnail image={thumbnailImage} />

          <Title title={model.name} category={model.category} />

          <Fields>
            { model.cubeTypeName && (
              <Field icon={CubeIconType[model.cubeType] || CubeIconType[model.serviceType]} text={model.cubeTypeName} bold />
            )}
            <div className="li">
              <SubField
                icon="time2"
                bold
                text={hourMinuteFormat}
              />
              { (model.cubeTypeName === CubeTypeNameType.Program) && (
                <SubField className="card-stamp" bold icon="stamp" text={`Stamp x${model.stampCount}`} />
              )}

            </div>
            { model instanceof LectureModel && (
              <Field icon="complete" text={`이수 ${numeral(model.studentCount).format('0,0')}명`} />
            )}
          </Fields>

          {this.renderBottom()}
        </div>

        {/* hover 시 컨텐츠 */}
        <div className="hover-content">
          <Title title={model.name} category={model.category} />

          <p className="text-area" dangerouslySetInnerHTML={{ __html: model.description }} />

          <Buttons>
            { action && (
              <Button icon className="icon-line" onClick={onAction}>
                <Icon className={action.iconName} />
              </Button>
            )}
            <Button className="fix bg" onClick={onViewDetail}>상세보기</Button>
          </Buttons>
        </div>
      </Card>
    );
  }
}

export default BoxCardView;

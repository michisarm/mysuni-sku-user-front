import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { InMyLectureModel, MyTrainingModel } from 'myTraining/model';
import numeral from 'numeral';
import React, { Component } from 'react';
import { Button, Card, Icon, Label, Rating } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
// 고도화
import { CategoryModel } from '../../../../../shared/model';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { LectureModel } from '../../../../model';
import {
  Buttons,
  EnrollingRibbon,
  Field,
  Fields,
  Ribbon,
  SubField,
  Thumbnail,
  Title,
} from '../../../ui/view/LectureElementsView';
import Action from '../../model/Action';

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
  contentType?: string;
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
    contentType: '',
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
      contentType,
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
        {contentType != 'Enrolling' ? (
          <Ribbon required={model!.required} />
        ) : (
          <EnrollingRibbon model={model} />
        )}

        <div className="card-inner">
          <Thumbnail image={thumbnailImage} />

          <Title
            title={model.name && parsePolyglotString(model.name)}
            category={new CategoryModel(model.category)}
          />

          {/*아이콘과 정보 영역*/}
          <Fields>
            {(model!.learningTime && (
              <div className="li">
                {(model!.learningTime && (
                  <SubField icon="time2" bold text={hourMinuteFormat} />
                )) ||
                  null}
              </div>
            )) ||
              null}
            <Field
              icon="complete"
              // text={`${getPolyglotText(
              //   '이수',
              //   'home-Inprogress-이수'
              // )} ${numeral(model.passedStudentCount).format(
              //   '0,0'
              // )}${getPolyglotText('명', 'home-Inprogress-명')}`}
              text={getPolyglotText(
                '이수 {personCount}명',
                'home-Inprogress-이수',
                { personCount: numeral(model.passedStudentCount).format('0,0') }
              )}
            />
          </Fields>

          {this.renderBottom()}
        </div>

        {/* hover 시 컨텐츠 */}
        <div className="hover-content">
          <Title
            title={model.name && parsePolyglotString(model.name)}
            category={new CategoryModel(model.category)}
          />

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
                  <PolyglotText
                    defaultString="상세보기"
                    id="home-Inprogress-상세보기"
                  />
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
                <PolyglotText
                  defaultString="상세보기"
                  id="home-Inprogress-상세보기"
                />
              </Button>
            )}
          </Buttons>
        </div>
      </Card>
    );
  }
}

export default BoxCardView;

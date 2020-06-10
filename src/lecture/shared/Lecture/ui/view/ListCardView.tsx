import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';

import { Button, Card, Icon } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { LearningState } from 'shared/model';
import { InMyLectureModel, MyTrainingModel } from 'myTraining/model';

import { LectureModel } from '../../../../model';
import { Buttons, Field, Fields, Thumbnail, Title } from '../../../ui/view/LectureElementsView';
import Action from '../../model/Action';


interface Props {
  model: LectureModel | MyTrainingModel | InMyLectureModel,
  thumbnailImage?: string,
  action?: Action,
  onAction?: (e: any) => void,
  onViewDetail?: () => void,
}

@reactAutobind
@observer
class ListCardView extends Component<Props> {
  //
  static defaultProps = {
    thumbnailImage: null,
    action: null,
    onAction: (e: any) => {},
    onViewDetail: () => {},
  };

  getHourMinuteFormat(hour: number, minute: number) {
    //
    if (hour < 1 && minute < 1) {
      return (
        <>
          <strong>00</strong><span>h</span>
          <strong className="ml9">00</strong><span>m</span>
        </>
      );
    }
    else if (hour < 1) {
      return (
        <>
          <strong className="ml9">{minute}</strong><span>m</span>
        </>
      );
    }
    else if (minute < 1) {
      return (
        <>
          <strong>{hour}</strong><span>h</span>
        </>
      );
    }
    else {
      return (
        <>
          <strong>{hour}</strong><span>h</span>
          <strong className="ml9">{minute}</strong><span>m</span>
        </>
      );
    }
  }

  render() {
    //
    const {
      model, thumbnailImage, action,
      onAction,
    } = this.props;
    const { hour, minute } = dateTimeHelper.timeToHourMinute(model.learningTime);

    let image = thumbnailImage;

    if ((model instanceof LectureModel && model.viewState === 'Passed')
      || ((model instanceof MyTrainingModel || model instanceof InMyLectureModel) && model.learningState === LearningState.Passed)
    ) {
      image = `${process.env.PUBLIC_URL}/images/all/thumb-card-complete-60-px@2x.png`;
    }

    return (
      <Card>
        {
          model.required && (
            <div className="card-ribbon-wrap">
              <div className="ui ribbon2 label">핵인싸과정</div>
            </div>
          )
        }
        <div className="card-inner">
          {/* Todo: stampReady, 미사용이면 제거 */}
          {/*<Ribbon stampReady={false} />*/}

          <Thumbnail image={image} />

          <Title title={<a>{model.name}</a>} category={model.category}>
            <Fields>
              {/*<Field icon="date" text={`학습완료일 : ${moment(model.time).format('YYYY.MM.DD')}`} />*/}
              <Field icon="date" text={`학습완료일 : ${moment(Number(model.endDate)).format('YYYY.MM.DD')}`} />
            </Fields>
          </Title>

          <Buttons>
            { action && (
              <Button className="icon-big-line" onClick={onAction}>
                <Icon className={action.iconName} />
                { action.text && (
                  <span>{action.text}</span>
                )}
              </Button>
            )}
          </Buttons>

          <div className="time-area">
            <div className="location">
              { model.cubeTypeName &&  <Field icon="video2" text={model.cubeTypeName} bold />}
            </div>
            {
              model.cubeTypeName === 'Course' && model.stampCount && (
                <div className="stamp">Stamp<strong>x{model.stampCount}</strong></div>
              ) || null
            }
            {
              model.cubeTypeName !== 'Course' && (
                <div className="time">
                  <strong>&nbsp;</strong>
                  {this.getHourMinuteFormat(hour, minute)}
                </div>
              ) || null
            }
          </div>

        </div>
      </Card>
    );
  }
}

export default ListCardView;

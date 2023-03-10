import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';

import { Button, Card, Icon } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { CategoryModel, LearningState } from 'shared/model';
import { InMyLectureModel, MyTrainingModel } from 'myTraining/model';

import { LectureModel } from '../../../../model';
import {
  Buttons,
  Field,
  Fields,
  Thumbnail,
  Title,
} from '../../../ui/view/LectureElementsView';
import Action from '../../model/Action';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props {
  model: LectureModel | MyTrainingModel | InMyLectureModel;
  thumbnailImage?: string;
  action?: Action;
  onAction?: (e: any) => void;
  onViewDetail?: () => void;
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
          <strong>00</strong>
          <span>h</span>
          <strong className="ml9">00</strong>
          <span>m</span>
        </>
      );
    } else if (hour < 1) {
      return (
        <>
          <strong className="ml9">{minute}</strong>
          <span>m</span>
        </>
      );
    } else if (minute < 1) {
      return (
        <>
          <strong>{hour}</strong>
          <span>h</span>
        </>
      );
    } else {
      return (
        <>
          <strong>{hour}</strong>
          <span>h</span>
          <strong className="ml9">{minute}</strong>
          <span>m</span>
        </>
      );
    }
  }

  render() {
    //
    const { model, thumbnailImage, action, onAction } = this.props;
    const { hour, minute } = dateTimeHelper.timeToHourMinute(
      model.learningTime
    );

    let image = thumbnailImage;

    if (
      (model instanceof LectureModel && model.viewState === 'Passed') ||
      ((model instanceof MyTrainingModel ||
        model instanceof InMyLectureModel) &&
        model.learningState === LearningState.Passed)
    ) {
      image = `${process.env.PUBLIC_URL}/images/all/thumb-card-complete-60-px@2x.png`;
    }

    return (
      <Card>
        {model.required && (
          <div className="card-ribbon-wrap">
            <div className="ui ribbon2 label">???????????????</div>
          </div>
        )}
        <div className="card-inner">
          {/* Todo: stampReady, ??????????????? ?????? */}
          {/*<Ribbon stampReady={false} />*/}

          <Thumbnail image={image} />

          <Title
            title={<a>{model.name && parsePolyglotString(model.name)}</a>}
            category={new CategoryModel(model.category)}
          >
            <Fields>
              {/*<Field icon="date" text={`??????????????? : ${moment(model.time).format('YYYY.MM.DD')}`} />*/}
              <Field
                icon="date"
                text={`??????????????? : ${moment(Number(model.endDate)).format(
                  'YYYY.MM.DD'
                )}`}
              />
            </Fields>
          </Title>

          <Buttons>
            {action && (
              <Button className="icon-big-line" onClick={onAction}>
                <Icon className={action.iconName} />
                {action.text && <span>{action.text}</span>}
              </Button>
            )}
          </Buttons>

          <div className="time-area">
            <div className="location">
              {model.cubeTypeName && (
                <Field icon="video2" text={model.cubeTypeName} bold />
              )}
            </div>
            {(model.cubeTypeName === 'Card' && model.stampCount && (
              <div className="stamp">
                Stamp<strong>x{model.stampCount}</strong>
              </div>
            )) ||
              null}
            {model.cubeTypeName !== 'Card' && (
              <div className="time">
                <strong>&nbsp;</strong>
                {this.getHourMinuteFormat(hour, minute)}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }
}

export default ListCardView;

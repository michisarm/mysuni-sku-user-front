import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import moment from 'moment';

import { Card, Icon, Button } from 'semantic-ui-react';
import { MyTrainingModel, InMyLectureModel } from 'myTraining/model';

import { LectureModel } from '../../../../model';
import Action from '../../model/Action';
import {
  Title,
  Fields,
  Field,
  Buttons,
  Thumbnail,
} from '../../../ui/view/LectureElementsView';
import { dateTimeHelper } from '../../../../../shared';
import { CategoryModel } from '../../../../../shared/model';
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

    const { hour, minute } = (model.learningTime &&
      dateTimeHelper.timeToHourMinute(model.learningTime)) || {
      hour: 0,
      minute: 0,
    };

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

          <Thumbnail image={thumbnailImage} />

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
            {(model.cubeTypeName !== 'Card' && (
              <div className="time">
                <strong>&nbsp;</strong>
                {this.getHourMinuteFormat(hour, minute)}
              </div>
            )) ||
              null}
          </div>
        </div>
      </Card>
    );
  }
}

export default ListCardView;

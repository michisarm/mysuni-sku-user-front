import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';

import {reactAutobind} from '@nara.platform/accent/src/snap/index';
import classNames from 'classnames';
import CubeStateName from '../../model/CubeStateName';


interface Props {
  learningType: string | React.ReactNode,
  learningState: string | React.ReactNode,
  learningTime?: string | React.ReactNode,
  per?: string | React.ReactNode
}

@reactAutobind
class CubeRightInfo extends Component<Props> {

  render() {
    const {learningType, learningTime, learningState, per} = this.props;
    let buttonStyle = 'black';
    // let percent = null;

    if (learningState === CubeStateName.InProgress) {
      // 학습중
      buttonStyle = 'orange';
    } else if (learningState === CubeStateName.Completed) {
      // 학습완료
      buttonStyle = 'completed';
    } else {
      // 학습하기(학습시작전)
      buttonStyle = 'black';
    }

    return (
      <div className="right">
        <span>{learningType}</span>
        <span>{learningTime}</span>
        <a href="#" className={classNames('btn-play', buttonStyle)}>
          <span className="text">
            {learningState}
            {
              (learningState === CubeStateName.InProgress && (learningType === 'Video' || learningType === 'Audio')) && (
                '(' + per + '%)'
              )
            }
          </span>

          {/*Video or Audio일 경우 Progress bar*/}
          {
            learningState === CubeStateName.InProgress && (learningType === 'Video' || learningType === 'Audio') ? (
              <span className={classNames('pie-wrapper', 'progress-' + per)}>
                <span className="pie">
                  <span className="left-side" />
                  <span className="right-side" />
                </span>
                <div className="shadow" />
              </span>
            ) : (
              <Icon className={'play-' + buttonStyle + '24'}/>
            )
          }
        </a>
      </div>
    );
  }
}

export default CubeRightInfo;
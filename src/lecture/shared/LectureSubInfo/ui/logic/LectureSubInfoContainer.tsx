import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Button } from 'semantic-ui-react';
import classNames from 'classnames';
import { ActionType, State, Level } from '../../model';
import Action from '../../model/Action';
import Operator from '../../model/Operator';
import Class from '../../model/Class';
import {
  Required,
  Buttons,
  StateView,
  LevelView,
  ClassView,
  OperatorView,
  FootButtons,
  Survey,
  Report,
} from '../view/LectureSubInfoElementsView';


interface Props {
  /** required stamp 여부 */
  required?: boolean;
  /** 빨간버튼 */
  mainAction?: Action;
  /** 파란버튼 */
  subActions?: Action[];
  /** level */
  level: Level;
  /** 상태 */
  state?: State;
  /** 수강정보 */
  clazz: Class;
  /** 담당자 및 강사*/
  operator: Operator;
  /** 취소버튼 액션 */
  onCancel?: () => void;
  /** 북마크 액션 */
  onBookmark?: () => void;
  /** 삭제 액션 */
  onRemove?: () => void;
  /** 설문 액션*/
  onSurvey?: () => void;
  /** 과제 다운로드 액션*/
  onDownloadReport?: () => void;
  /* support 이동 */
  moveToSupport?: () => void;
}

@reactAutobind
class LectureSubInfoContainer extends Component<Props> {
  //
  static Action: Action;

  static ActionType = ActionType;

  static State = State;

  static Level = Level;

  static Operator: Operator;

  static Class: Class;

  render() {
    //
    const {
      required,
      mainAction,
      subActions,
      state,
      level,
      clazz,
      operator,
      onCancel,
      onBookmark,
      onRemove,
      onSurvey,
      onDownloadReport,
      moveToSupport
    } = this.props;
    return (
      <div className="sub-info-wrap">
        <div className="sub-info-box">
          <Required required={required} />
          <div className="pd30">
            <Buttons
              mainAction={mainAction}
              subActions={subActions}
              onCancel={onCancel}
              state={state}
            />
            {/* 레벨 */}
            <StateView state={state} /> 
            <LevelView level={level} />
            {/* 학습시간 ~ 인원 */}
            <ClassView clazz={clazz} />
            {/* 강사 담당자  */}
            <OperatorView operator={operator} />
          </div>
          {/* 스크랩 url 복사 */}
          <FootButtons onBookmark={onBookmark} onRemove={onRemove} />
        </div>
        <Survey onSurvey={onSurvey} />
        <Report onDownloadReport={onDownloadReport} />
        <div className={classNames('contact-us')}>
          <Button icon className={classNames('right', 'btn-blue')} onClick={moveToSupport}>
            시스템 문의
            <Icon className={classNames('arrow-b-16')} />
          </Button>
        </div>
      </div>
    );
  }
}

export default LectureSubInfoContainer;

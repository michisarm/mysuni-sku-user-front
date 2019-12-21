
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
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
  required?: boolean
  /** 빨간버튼 */
  mainAction?: Action
  /** 파란버튼 */
  subActions?: Action[]
  /** level */
  level: Level
  /** 상태 */
  state?: State
  /** 수강정보 */
  clazz: Class
  /** 담당자 및 강사*/
  operator: Operator
  /** 취소버튼 액션 */
  onCancel?: () => void
  /** 북마크 액션 */
  onBookmark: () => void
  /** 공유 액션 */
  onShare: () => void
  /** 삭제 액션 */
  onRemove?: () => void
  /** 설문 액션*/
  onSurvey?: () => void
  /** 과제 다운로드 액션*/
  onDownloadReport?: () => void
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
      required, mainAction, subActions, state, level, clazz, operator,
      onCancel, onBookmark, onShare, onRemove, onSurvey, onDownloadReport,
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
            />
            <StateView state={state} />
            <LevelView level={level} />
            <ClassView clazz={clazz} />
            <OperatorView operator={operator} />
          </div>
          <FootButtons
            onBookmark={onBookmark}
            onShare={onShare}
            onRemove={onRemove}
          />
        </div>
        <Survey onSurvey={onSurvey} />
        <Report onDownloadReport={onDownloadReport} />
      </div>
    );
  }
}

export default LectureSubInfoContainer;


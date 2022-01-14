import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import { Button, Icon } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import QnAModel from '../../model/QnAModel';
import OperatorModel from '../../model/vo/OperatorModel';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import { getQuestionStateReactNode } from '../logic/QuestionStateHelper';
import { QnaState } from '../../model/vo/QnaState';

interface Props {
  title: string;
  time: number;
  onClickList: (e: any) => void;
  deletable?: boolean;
  onClickDelete?: (e: any) => void;
  onClickModify?: (e: any) => void;

  getCategoryName: (categoryId: string) => string;
  getStateToString: (state: QnaState) => string;

  qna: QnAModel;
  finalOperator: OperatorModel;
}

@reactAutobind
@observer
class BoardDetailContentHeaderView extends Component<Props> {
  //
  render() {
    //
    const {
      title,
      time,
      deletable,
      onClickList,
      onClickDelete,
      onClickModify,
      getStateToString,
    } = this.props;

    const { getCategoryName } = this.props;
    const { qna, finalOperator } = this.props;
    const questionState = () => {
      if (qna.question.state === QnaState.AnswerCompleted) {
        return 'done';
      }

      return 'wait';
    };
    return (
      <div className="title-area">
        <div className="title-inner">
          <div className="title">{title}</div>
          <div className="qna-navi">
            {/*<strong>{qna.question.requestChannel}</strong>*/}
            <div>
              <span>{`${getCategoryName(qna.question.mainCategoryId)}`}</span>
              <span>{`${getCategoryName(qna.question.subCategoryId)}`}</span>
            </div>
            <strong className={`stat ${questionState()}`}>
              {getStateToString(qna.question.state)}
            </strong>
          </div>
          <div className="user-info">
            {finalOperator && finalOperator.denizenId ? (
              <span className="date">
                <span>{parsePolyglotString(finalOperator.operatorName)}</span>
                <span>{finalOperator.email}</span>
                <span>{time && moment(time).format('YYYY.MM.DD HH:mm')}</span>
              </span>
            ) : null}
          </div>
          <div className="actions">
            {onClickModify && (
              <Button
                icon
                className="left postset edit"
                onClick={onClickModify}
              >
                <Icon name="edit" />

                <PolyglotText
                  defaultString="Edit"
                  id="support-QnaRead-수정버튼"
                />
              </Button>
            )}
            {/*{deletable && (*/}
            {/*  <Button*/}
            {/*    icon*/}
            {/*    className="left postset delete"*/}
            {/*    onClick={onClickDelete}*/}
            {/*  >*/}
            {/*    <Icon name="delete" />*/}

            {/*    <PolyglotText*/}
            {/*      defaultString="Delete"*/}
            {/*      id="support-QnaRead-삭제버튼"*/}
            {/*    />*/}
            {/*  </Button>*/}
            {/*)}*/}
            <Button
              icon
              className="left postset commu-list16"
              onClick={onClickList}
            >
              <Icon className="commu-list16" />

              <PolyglotText defaultString="List" id="support-noti-list1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default BoardDetailContentHeaderView;

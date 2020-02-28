import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAutobind, reactConfirm } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';

import { Modal, List, Button } from 'semantic-ui-react';
import ExamPaperService from '../../paper/present/logic/ExamPaperService';
import ExaminationService from '../../exam/present/logic/ExaminationService';
import AnswerSheetService from '../../exam/present/logic/AnswerSheetService';
import { QuestionType } from '../../paper/model/QuestionType';
import ShortAnswerView from '../view/ShortAnswerView';
import EssayView from '../view/EssayView';
import SingleChoiceView from '../view/SingleChoiceView';
import MultiChoiceView from '../view/MultiChoiceView';

interface Props {
  examPaperService?: ExamPaperService
  examinationService?: ExaminationService
  answerSheetService?: AnswerSheetService

  examId: string
  trigger?: React.ReactNode
  onSaveCallback?:() => void
}

interface States {
  open: boolean
}

@inject(mobxHelper.injectFrom(
  'assistant.examPaperService',
  'assistant.examinationService',
  'assistant.answerSheetService',
))
@observer
@reactAutobind
export class AnswerSheetModalContainer extends React.Component<Props, States> {
  //
  state= {
    open: false,
  };

  onOpenModal() {
    this.setState({
      open: true,
    }, this.init);
  }

  onCloseModal() {
    this.setState({
      open: false,
    }, this.clear);
  }


  async init() {
    const { examinationService, examPaperService, answerSheetService, examId } = this.props;

    if (examId) {
      answerSheetService!.findAnswerSheet(examId, patronInfo.getDenizenId() || '');
      const examination = await examinationService!.findExamination(examId);
      examPaperService!.findExamPaper(examination.paperId);
    }
  }

  clear() {
    const { examinationService, examPaperService, answerSheetService } = this.props;

    answerSheetService!.clear();
    examinationService!.clear();
    examPaperService!.clear();
  }

  onSetAnswer(questionNo: string, answer: string) {
    //
    const { answerSheetService, examPaperService } = this.props;
    const { examPaper } = examPaperService!;
    const { questions } = examPaper!;
    answerSheetService!.setAnswer(questionNo, answer, questions.map(question => question.questionNo));
  }

  onSaveAnswerSheet(finished: boolean) {
    const { answerSheetService, onSaveCallback, examId } = this.props;
    const { answerSheet } = answerSheetService!;

    if (answerSheet.id) {
      answerSheetService!.setAnswerSheetProp('finished', finished);
      answerSheetService!.modifyAnswerSheet(answerSheet)
        .then(() => {
          if (finished) {
            this.onCloseModal();
            if (onSaveCallback) onSaveCallback();
          }
        });
    }
    else {
      answerSheetService!.setAnswerSheetProp('examineeId', patronInfo.getDenizenId());
      answerSheetService!.setAnswerSheetProp('examId', examId);
      answerSheetService!.setAnswerSheetProp('finished', finished);
      answerSheetService!.registerAnswerSheet(answerSheet)
        .then((answerSheetId: any) => {
          answerSheetService!.setAnswerSheetProp('id', answerSheetId.result);
          answerSheetService!.modifyAnswerSheet(answerSheet)
            .then(() => {
              if (finished) {
                this.onCloseModal();
                if (onSaveCallback) onSaveCallback();
              }
            });
        });
    }
  }

  onSubmitClick() {
    reactConfirm({ title: '알림', message: 'Test를 최종 제출 하시겠습니까?', onOk: () => this.onSaveAnswerSheet(true) });
  }

  render() {
    //
    const { open } = this.state;
    const { examPaperService, examinationService, answerSheetService, trigger } = this.props;
    const { examination } = examinationService!;
    const { examPaper } = examPaperService!;
    const { answerMap } = answerSheetService!;
    const { score, questions } = examPaper!;

    return (
      <Modal
        open={open}
        onOpen={this.onOpenModal}
        // onClose={this.onCloseModal}
        trigger={trigger}
        className="base w1000 inner-scroll test-modal"
      >
        <Modal.Header className="res">
          {examPaper && examPaper.title}
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap1">
              <div className="title-area">
                <div className="title-inner">
                  <div className="sub-info">
                    합격점 : {examination && examination.successPoint || 0}점 |
                    객관식 : {score && score.objective || 0}점 |
                    주관식 : {score && score.subjective || 0}점 |
                    총 점 : {score && score.total || 0}점
                  </div>
                </div>
              </div>

              <List as="ol" className="num-list">
                {
                  questions && questions.length
                  && questions.map(question => {
                    let answerArea = null;
                    const answer = answerMap.get(question.questionNo) || '';

                    switch (question.questionType) {
                      case QuestionType.ShortAnswer:
                        answerArea = (
                          <ShortAnswerView answer={answer} onSetAnswer={(value) => this.onSetAnswer(question.questionNo, value)} />
                        );
                        break;
                      case QuestionType.Essay:
                        answerArea = (
                          <EssayView answer={answer} onSetAnswer={(value) => this.onSetAnswer(question.questionNo, value)} />
                        );
                        break;
                      case QuestionType.MultiChoice:
                        answerArea = (
                          <MultiChoiceView
                            answer={answer}
                            items={question.items}
                            onSetAnswer={(value) => this.onSetAnswer(question.questionNo, value)}
                          />
                        );
                        break;
                      case QuestionType.SingleChoice:
                        answerArea = (
                          <SingleChoiceView
                            answer={answer}
                            question={question}
                            items={question.items}
                            onSetAnswer={(value) => this.onSetAnswer(question.questionNo, value)}
                          />
                        );
                        break;
                    }
                    return (
                      <List.Item as="li" key={question.questionNo}>
                        <div className="ol-title">
                          {question.direction}
                          <span className="q-score">({question.allocatedPoint}점)</span>
                        </div>
                        <div className="ol-answer">
                          {answerArea}
                        </div>
                      </List.Item>
                    );
                  }) || null
                }
              </List>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.onCloseModal}>취소</Button>
          <Button className="w190 pop s" onClick={() => this.onSaveAnswerSheet(false)}>저장</Button>
          <Button className="w190 pop p" onClick={() => this.onSubmitClick()}>제출</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AnswerSheetModalContainer;

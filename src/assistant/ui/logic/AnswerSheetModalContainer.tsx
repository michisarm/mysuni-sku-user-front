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
  examPaperService?: ExamPaperService;
  examinationService?: ExaminationService;
  answerSheetService?: AnswerSheetService;

  examId: string;
  type?: string;
  trigger?: React.ReactNode;
  onSaveCallback?: () => void;
  onInitCallback?: () => void;
}

interface States {
  open: boolean;
}

@inject(
  mobxHelper.injectFrom(
    'assistant.examPaperService',
    'assistant.examinationService',
    'assistant.answerSheetService'
  )
)
@observer
@reactAutobind
export class AnswerSheetModalContainer extends React.Component<Props, States> {
  //
  state = {
    open: false,
  };

  onOpenModal() {
    const { onInitCallback } = this.props;
    this.setState(
      {
        open: true,
      },
      this.init
    );
  }

  onCloseModal() {
    const { onInitCallback } = this.props;
    if (onInitCallback) onInitCallback();

    setTimeout(() => {
      this.setState(
        {
          open: false,
        }
        // this.clear
      );
    }, 300);
  }

  async init() {
    const { examinationService, examPaperService, answerSheetService, examId } =
      this.props;

    if (examId) {
      answerSheetService!.findAnswerSheet(
        examId,
        patronInfo.getDenizenId() || ''
      );
      const examination = await examinationService!.findExamination(examId);
      examPaperService!.findExamPaper(examination.paperId);
    }
  }

  clear() {
    const { examinationService, examPaperService, answerSheetService } =
      this.props;

    answerSheetService!.clear();
    examinationService!.clear();
    examPaperService!.clear();
  }

  onSetAnswer(questionNo: string, answer: string) {
    //
    const { answerSheetService, examPaperService } = this.props;
    const { examPaper } = examPaperService!;
    const { questions } = examPaper!;
    answerSheetService!.setAnswer(
      questionNo,
      answer,
      questions.map((question) => question.questionNo)
    );
  }

  onSaveAnswerSheet(finished: boolean) {
    const { answerSheetService, onSaveCallback, examId } = this.props;
    const { answerSheet } = answerSheetService!;

    if (finished) {
      answerSheetService!.setAnswerSheetProp(
        'submitAnswers',
        answerSheet.answers
      );
    }
    answerSheetService!.setAnswerSheetProp('submitted', finished);

    if (answerSheet.id) {
      answerSheetService!.setAnswerSheetProp('finished', finished);
      answerSheetService!.modifyAnswerSheet(answerSheet).then(() => {
        if (finished) {
          this.onCloseModal();
          if (onSaveCallback) onSaveCallback();
        }
      });
    } else {
      answerSheetService!.setAnswerSheetProp(
        'examineeId',
        patronInfo.getDenizenId()
      );
      answerSheetService!.setAnswerSheetProp('examId', examId);
      answerSheetService!.setAnswerSheetProp('finished', finished);
      answerSheetService!
        .registerAnswerSheet(answerSheet)
        .then((answerSheetId: any) => {
          answerSheetService!.setAnswerSheetProp('id', answerSheetId.result);
          answerSheetService!.modifyAnswerSheet(answerSheet).then(() => {
            if (finished) {
              this.onCloseModal();
              if (onSaveCallback) onSaveCallback();
            }
          });
        });
    }

    if (finished) {
      // setter
      localStorage.setItem('finishedChk', 'Y');
      localStorage.setItem('finishedChkFirst', 'Y');
    } else {
      // setter
      localStorage.setItem('finishedChk', 'N');
      localStorage.setItem('finishedChkFirst', 'N');
    }
  }

  // MultiChoice 선택 정답 여부 체크
  onSaveAnswerMultiChoice(answerChkStr: string, answerMulti: string) {
    let answerChkArr = [];

    // 문제지 정답
    answerChkArr = answerChkStr.split(',');
    // 사용자 정답
    const answerMultiJson = JSON.parse(answerMulti);

    let chechkMultiYn = 'N';
    let checkCnt = 0;

    // 자릿수 비교
    if (answerChkArr.length === answerMultiJson.length) {
      // 정답지
      for (let i = 0; i < answerChkArr.length; i++) {
        // 사용자문제지
        for (let j = 0; j < answerMultiJson.length; j++) {
          // 정답지 사용자 문제지 체크
          if (answerChkArr[i] === answerMultiJson[j]) {
            checkCnt++;
          }
        }
      }
    }

    // 정답지와 사용자 정답 갯수 체크
    if (answerChkArr.length === checkCnt) {
      chechkMultiYn = 'Y';
    }

    return chechkMultiYn;
  }

  onSubmitClick() {
    if (this.onCheckAnswer()) {
      reactConfirm({
        title: '알림',
        message: 'Test를 최종 제출 하시겠습니까?',
        onOk: () => this.onSaveAnswerSheet(true),
      });
    }
  }

  onCheckAnswer() {
    const { answerSheetService } = this.props;
    const { answerSheet } = answerSheetService!;
    let valueCheck = 0;

    if (answerSheet && answerSheet.answers.length > 0) {
      answerSheet.answers.map((answer, index) => {
        if (!answer.answer) {
          valueCheck++;
        }
      });
      if (valueCheck > 0) {
        alert('빈 답안을 작성해주세요!');
        return false;
      } else {
        return true;
      }
    } else {
      alert('빈 답안을 작성해주세요!');
      return false;
    }
  }

  onSetScoring(
    questionType: string,
    answer: string,
    numberOfTrials: string | null,
    finichChkVal: string | null,
    answerChk: string,
    correctArea: string | null,
    correctMultiArea: string | null
  ) {
    const { answerSheetService } = this.props;
    const { answerSheet } = answerSheetService!;
    // 제출 여부 체크
    const submittedChk = answerSheet.submitted;

    let rtnClass = '';
    if (submittedChk) {
      if (
        questionType !== QuestionType.ShortAnswer &&
        questionType !== QuestionType.Essay
      ) {
        if (
          (numberOfTrials !== '0' &&
            finichChkVal !== 'N' &&
            answerChk === answer) ||
          (finichChkVal !== 'N' && answerChk === answer) ||
          (finichChkVal !== 'N' &&
            correctArea === 'M' &&
            correctMultiArea === 'Y')
        ) {
          rtnClass = 'exact-answer';
        } else {
          rtnClass = 'wrong-answer';
        }
      }
    }
    return rtnClass;
  }

  render() {
    //
    const { open } = this.state;
    const {
      examPaperService,
      examinationService,
      answerSheetService,
      trigger,
      type,
    } = this.props;
    const { examination } = examinationService!;
    const { examPaper } = examPaperService!;
    const { answerMap, answerChkMap, answerSheet } = answerSheetService!;
    const { score, questions } = examPaper!;

    // 제출 여부 체크
    const submittedChk = answerSheet.submitted;

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
                    합격점 : {(examination && examination.successPoint) || 0}점
                    | 객관식 : {(score && score.objective) || 0}점 | 주관식 :{' '}
                    {(score && score.subjective) || 0}점 | 총 점 :{' '}
                    {(score && score.total) || 0}점
                  </div>
                </div>
              </div>

              <List as="ol" className="num-list">
                {(questions &&
                  questions.length &&
                  questions.map((question, idx) => {
                    let answerArea = null;
                    let correctArea = null; // 오답 처리
                    let correctMultiArea = null; // 멀티 오답 처리

                    const answer = answerMap.get(question.questionNo) || '';
                    const answerChk =
                      answerChkMap.get(question.questionNo) || '';

                    // getter
                    const finishedChkFirst =
                      localStorage.getItem('finishedChkFirst');

                    // 시험, 재응시 최초 화면 진입시 체크 F5
                    if (submittedChk) {
                      if (finishedChkFirst === 'N') {
                        localStorage.setItem('finishedChk', 'N');
                      } else {
                        localStorage.setItem('finishedChk', 'Y');
                      }
                    } else {
                      localStorage.setItem('finishedChk', 'N');
                    }

                    // getter
                    const finichChkVal = localStorage.getItem('finishedChk');

                    // getter
                    const numberOfTrials =
                      localStorage.getItem('numberOfTrials');

                    switch (question.questionType) {
                      case QuestionType.ShortAnswer:
                        answerArea = (
                          <ShortAnswerView
                            answer={answer}
                            onSetAnswer={(value) =>
                              this.onSetAnswer(question.questionNo, value)
                            }
                          />
                        );
                        break;
                      case QuestionType.Essay:
                        answerArea = (
                          <EssayView
                            answer={answer}
                            onSetAnswer={(value) =>
                              this.onSetAnswer(question.questionNo, value)
                            }
                          />
                        );
                        break;
                      case QuestionType.MultiChoice:
                        correctArea = 'M';
                        correctMultiArea = this.onSaveAnswerMultiChoice(
                          answerChk,
                          question.answer
                        );
                        answerArea = (
                          <MultiChoiceView
                            answer={answer}
                            items={question.items}
                            onSetAnswer={(value) =>
                              this.onSetAnswer(question.questionNo, value)
                            }
                            type={type}
                          />
                        );
                        break;
                      case QuestionType.SingleChoice:
                        correctArea = 'Y';
                        answerArea = (
                          <SingleChoiceView
                            answer={answer}
                            question={question}
                            items={question.items}
                            onSetAnswer={(value) =>
                              this.onSetAnswer(question.questionNo, value)
                            }
                            type={type}
                          />
                        );
                        break;
                    }
                    return (
                      <List.Item as="li" key={question.questionNo}>
                        {type === '5' ? (
                          <div
                            className={`ol-title ${this.onSetScoring(
                              question.questionType,
                              question.answer,
                              numberOfTrials,
                              finichChkVal,
                              answerChk,
                              correctArea,
                              correctMultiArea
                            )}`}
                          >
                            {question.direction}
                            <span className="q-score">
                              ({question.allocatedPoint}점)
                            </span>
                          </div>
                        ) : (
                          <div
                            className={`ol-title ${this.onSetScoring(
                              question.questionType,
                              question.answer,
                              numberOfTrials,
                              finichChkVal,
                              answerChk,
                              correctArea,
                              correctMultiArea
                            )}`}
                            dangerouslySetInnerHTML={{
                              __html: `${question.direction} <span className="q-score">(${question.allocatedPoint}점)</span>`,
                            }}
                          />
                        )}

                        <div className="ol-answer">{answerArea}</div>
                      </List.Item>
                    );
                  })) ||
                  null}
              </List>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          {type === '5' ? (
            <Button className="w190 pop d" onClick={this.onCloseModal}>
              완료
            </Button>
          ) : (
            <>
              <Button className="w190 pop d" onClick={this.onCloseModal}>
                취소
              </Button>
              <Button
                className="w190 pop s"
                onClick={() => this.onSaveAnswerSheet(false)}
              >
                저장
              </Button>
              <Button
                className="w190 pop p"
                onClick={() => this.onSubmitClick()}
              >
                제출
              </Button>
            </>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AnswerSheetModalContainer;

// operator-linebreak warning 때문에 eslint 비활성화
/* eslint-disable */
import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  mobxHelper,
  reactAutobind,
  reactConfirm,
  reactAlert,
} from '@nara.platform/accent';

import { Button, List, Modal } from 'semantic-ui-react';
import SurveyCaseService from '../../event/present/logic/SurveyCaseService';
import SurveyFormService from '../../form/present/logic/SurveyFormService';
import AnswerSheetService from '../../answer/present/logic/AnswerSheetService';

import ShortAnswerView from '../view/ShortAnswerView';
import EssayView from '../view/EssayView';
import SingleChoiceView from '../view/SingleChoiceView';
import MultiChoiceView from '../view/MultiChoiceView';
import { AnswerItemModel } from '../../answer/model/AnswerItemModel';
import { QuestionModel } from '../../form/model/QuestionModel';
import { CriterionModel } from '../../form/model/CriterionModel';
import { QuestionItemType } from '../../form/model/QuestionItemType';
import { EssayQuestionItems } from '../../form/model/EssayQuestionItems';
import { CriterionQuestionItems } from '../../form/model/CriterionQuestionItems';
import { ChoiceQuestionItems } from '../../form/model/ChoiceQuestionItems';
import CriterionView from '../view/CriterionView';
import { AnswerProgress } from '../../answer/model/AnswerProgress';
import { langStringsToString } from '../../../lecture/detail/model/LangStrings';

interface Props {
  surveyCaseService?: SurveyCaseService;
  surveyFormService?: SurveyFormService;
  answerSheetService?: AnswerSheetService;

  surveyId: string;
  surveyCaseId: string;
  trigger?: React.ReactNode;
  onSaveCallback?: () => void;
  serviceId: string;
  serviceType: string;
}

interface States {
  open: boolean;
}

@inject(
  mobxHelper.injectFrom(
    'survey.surveyCaseService',
    'survey.surveyFormService',
    'survey.answerSheetService'
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
    this.setState(
      {
        open: true,
      },
      this.init
    );
  }

  onCloseModal() {
    this.setState(
      {
        open: false,
      },
      this.clear
    );
  }

  async init() {
    const {
      surveyCaseService,
      surveyFormService,
      answerSheetService,
      surveyId,
      surveyCaseId,
    } = this.props;

    if (surveyId && surveyCaseId) {
      answerSheetService!.findAnswerSheet(surveyCaseId);
      surveyCaseService!.findSurveyCase(surveyCaseId);
      surveyFormService!.findSurveyForm(surveyId);
    }
  }

  clear() {
    const { surveyCaseService, surveyFormService, answerSheetService } =
      this.props;

    answerSheetService!.clear();
    surveyCaseService!.clear();
    surveyFormService!.clear();
  }

  onSetAnswer(question: QuestionModel, answer: any) {
    //
    const { answerSheetService } = this.props;
    answerSheetService!.changeEvaluationSheetProp(question, answer);
  }

  // add survey optional check by gon
  isValidation() {
    const { surveyFormService, answerSheetService } = this.props;
    const { surveyForm } = surveyFormService!;
    const { questions } = surveyForm!;
    const { answerMap } = answerSheetService!;
    let rtn = true;
    if (questions && questions.length) {
      questions.map((question) => {
        const answer =
          answerMap.get(question.sequence.toSequenceString()) ||
          new AnswerItemModel();
        const answerItems = question.answerItems;
        // 필수체크 아니고 전체설문 응답으로 바꾸면 optional 풀어
        if (!question.optional) {
          switch (question.questionItemType) {
            case QuestionItemType.Choice:
              if (answerItems instanceof ChoiceQuestionItems) {
                if (answer.itemNumbers.length === 0) rtn = false;
                if (answerItems.multipleChoice) {
                  if (answer.itemNumbers.length < 2) rtn = false;
                }
              }
              break;
            case QuestionItemType.Criterion: // 척도는 상중하, 매우좋다-좋다-나쁘다-매우나쁘다 이런거 만들어 놓고 가져다 쓰는 건가봐.
              if (answer.criteriaItem.value === undefined) rtn = false;
              break;
            case QuestionItemType.Essay:
              if (answer.sentence === '') rtn = false;
              break;
          }
        }
      });
    }
    return rtn;
  }

  onSaveAnswerSheet(finished: boolean) {
    const {
      answerSheetService,
      surveyCaseService,
      onSaveCallback,
      serviceId,
      serviceType,
    } = this.props;
    const { answerSheet } = answerSheetService!;
    const { surveyCase } = surveyCaseService!;

    if (!finished) {
      if (answerSheet && answerSheet.id && answerSheet.id.length) {
        answerSheetService!.saveAnswerSheet().then(() => {
          this.onCloseModal();
          if (onSaveCallback) onSaveCallback();
        }); // .then(this.onCloseModal);
      } else {
        answerSheetService!.changeAnswerSheetProp(
          'surveyCaseId',
          surveyCase.id
        );
        answerSheetService!
          .openAnswerSheet(
            surveyCase.id,
            surveyCase.roundPart.round,
            serviceId,
            serviceType
          )
          .then((answerSheetId) => {
            answerSheetService!.changeAnswerSheetProp('id', answerSheetId);
            return answerSheetService!.saveAnswerSheet();
          })
          .then(() => {
            this.onCloseModal();
            if (onSaveCallback) onSaveCallback();
          }); // .then(this.onCloseModal);
      }
    } else if (finished) {
      // add survey optional check by gon
      // 제출전에는 필수 체크. optional=false (필수)
      if (!this.isValidation()) {
        reactAlert({
          title: 'Survey 안내',
          message: '전체 설문문항에 응답해주시기 바랍니다.',
        });
      } else {
        reactConfirm({
          title: '알림',
          message: '설문을 최종 제출 하시겠습니까?',
          onOk: () => this.onSaveAnswerSubmission(),
        });
      }
    }
  }

  // add survey optional check by gon
  onSaveAnswerSubmission() {
    const {
      answerSheetService,
      surveyCaseService,
      onSaveCallback,
      serviceId,
      serviceType,
    } = this.props;
    const { answerSheet } = answerSheetService!;
    const { surveyCase } = surveyCaseService!;
    if (answerSheet && answerSheet.id && answerSheet.id.length) {
      answerSheetService!.saveAnswerSheet().then(() => {
        answerSheetService!.submitAnswerSheet(answerSheet.id).then(() => {
          this.onCloseModal();
          if (onSaveCallback) onSaveCallback();
        });
      });
    } else {
      answerSheetService!.changeAnswerSheetProp('surveyCaseId', surveyCase.id);
      answerSheetService!
        .openAnswerSheet(
          surveyCase.id,
          surveyCase.roundPart.round,
          serviceId,
          serviceType
        )
        .then((res) => {
          answerSheet.id = res;
          answerSheetService!.changeAnswerSheetProp('id', res);
          return answerSheetService!.saveAnswerSheet();
        })
        .then(() => answerSheetService!.submitAnswerSheet(answerSheet.id))
        .then(() => {
          this.onCloseModal();
          if (onSaveCallback) onSaveCallback();
        });
    }
  }

  onSubmitClick() {
    this.onSaveAnswerSheet(true);
  }

  render() {
    return null;

    // //
    // const { open } = this.state;
    // const { surveyFormService, answerSheetService, trigger } = this.props;
    // const { surveyForm } = surveyFormService!;
    // if (!surveyForm) {
    //   return null;
    // }
    // const { answerMap, answerSheet } = answerSheetService!;
    // const { questions, criterionList, langSupports } = surveyForm!;
    // const disabled =
    //   answerSheet &&
    //   answerSheet.progress &&
    //   answerSheet.progress === AnswerProgress.Complete;

    // return (
    //   <Modal
    //     open={open}
    //     onOpen={this.onOpenModal}
    //     onClose={this.onCloseModal}
    //     trigger={trigger}
    //     className="base w1000 inner-scroll"
    //   >
    //     <Modal.Header className="res">
    //       {surveyForm && langStringsToString(surveyForm.titles, langSupports)}
    //     </Modal.Header>
    //     <Modal.Content>
    //       <div className="scrolling-80vh">
    //         <div className="content-wrap1">
    //           <List as="ol" className="num-list">
    //             {(questions &&
    //               questions.length &&
    //               questions.map((question) => {
    //                 let answerArea = null;
    //                 const answer =
    //                   answerMap.get(question.sequence.toSequenceString()) ||
    //                   new AnswerItemModel();
    //                 const answerItems = question.answerItems;

    //                 switch (question.questionItemType) {
    //                   case QuestionItemType.Essay:
    //                     if (answerItems instanceof EssayQuestionItems) {
    //                       if (answerItems.maxLength <= 100) {
    //                         answerArea = (
    //                           <ShortAnswerView
    //                             langSupports={langSupports}
    //                             answer={answer}
    //                             disabled={disabled}
    //                             onSetAnswer={(value) =>
    //                               this.onSetAnswer(question, value)
    //                             }
    //                           />
    //                         );
    //                       } else {
    //                         answerArea = (
    //                           <EssayView
    //                             langSupports={langSupports}
    //                             answer={answer}
    //                             disabled={disabled}
    //                             onSetAnswer={(value) =>
    //                               this.onSetAnswer(question, value)
    //                             }
    //                           />
    //                         );
    //                       }
    //                     }

    //                     break;
    //                   case QuestionItemType.Choice:
    //                     if (answerItems instanceof ChoiceQuestionItems) {
    //                       if (answerItems.multipleChoice) {
    //                         answerArea = (
    //                           <MultiChoiceView
    //                             langSupports={langSupports}
    //                             answer={answer}
    //                             disabled={disabled}
    //                             items={answerItems.items || []}
    //                             onSetAnswer={(value) =>
    //                               this.onSetAnswer(question, value)
    //                             }
    //                           />
    //                         );
    //                       } else {
    //                         answerArea = (
    //                           <SingleChoiceView
    //                             langSupports={langSupports}
    //                             question={question}
    //                             answer={answer}
    //                             disabled={disabled}
    //                             items={answerItems.items || []}
    //                             onSetAnswer={(value) =>
    //                               this.onSetAnswer(question, value)
    //                             }
    //                           />
    //                         );
    //                       }
    //                     }

    //                     break;
    //                   case QuestionItemType.Criterion:
    //                     if (answerItems instanceof CriterionQuestionItems) {
    //                       const index = criterionList
    //                         .map((criterion) => criterion.number)
    //                         .findIndex(
    //                           (number) => number === answerItems.criterionNumber
    //                         );
    //                       const criterion =
    //                         index >= 0
    //                           ? criterionList[index]
    //                           : new CriterionModel();
    //                       answerArea = (
    //                         <CriterionView
    //                           langSupports={langSupports}
    //                           question={question}
    //                           answer={answer}
    //                           disabled={disabled}
    //                           items={criterion.criteriaItems || []}
    //                           onSetAnswer={(value) =>
    //                             this.onSetAnswer(question, value)
    //                           }
    //                         />
    //                       );
    //                     }
    //                     break;
    //                 }
    //                 return (
    //                   <List.Item
    //                     as="li"
    //                     key={question.sequence.toSequenceString()}
    //                   >
    //                     <div className="ol-title">{question.sentence}</div>
    //                     <div className="ol-answer">{answerArea}</div>
    //                   </List.Item>
    //                 );
    //               })) ||
    //               null}
    //           </List>
    //         </div>
    //       </div>
    //     </Modal.Content>
    //     <Modal.Actions className="actions">
    //       <Button className="w190 pop d" onClick={this.onCloseModal}>
    //         취소
    //       </Button>
    //       {!disabled && (
    //         <>
    //           <Button
    //             className="w190 pop s"
    //             onClick={() => this.onSaveAnswerSheet(false)}
    //           >
    //             저장
    //           </Button>
    //           <Button
    //             className="w190 pop p"
    //             onClick={() => this.onSubmitClick()}
    //           >
    //             제출
    //           </Button>
    //         </>
    //       )}
    //     </Modal.Actions>
    //   </Modal>
    // );
  }
}

export default AnswerSheetModalContainer;

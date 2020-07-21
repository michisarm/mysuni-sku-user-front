import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAutobind, reactConfirm } from '@nara.platform/accent';

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
import { LectureServiceType } from '../../../lecture/model';

interface Props extends RouteComponentProps<RouteParams> {
  surveyCaseService?: SurveyCaseService
  surveyFormService?: SurveyFormService
  answerSheetService?: AnswerSheetService

  surveyId: string
  surveyCaseId: string
  trigger?: React.ReactNode
  onSaveCallback?:() => void
  // serviceId: string
  // serviceType: string
}

interface RouteParams {
  cineroomId: string,
  collegeId: string,
  coursePlanId: string,
  serviceType: LectureServiceType,
  serviceId: string
}

interface States {
  open: boolean
}

@inject(mobxHelper.injectFrom(
  'survey.surveyCaseService',
  'survey.surveyFormService',
  'survey.answerSheetService',
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
    const { surveyCaseService, surveyFormService, answerSheetService, surveyId, surveyCaseId } = this.props;

    if (surveyId && surveyCaseId) {
      answerSheetService!.findAnswerSheet(surveyCaseId);
      surveyCaseService!.findSurveyCase(surveyCaseId);
      surveyFormService!.findSurveyForm(surveyId);
    }
  }

  clear() {
    const { surveyCaseService, surveyFormService, answerSheetService } = this.props;

    answerSheetService!.clear();
    surveyCaseService!.clear();
    surveyFormService!.clear();
  }

  onSetAnswer(question: QuestionModel, answer: any) {
    //
    const { answerSheetService } = this.props;
    answerSheetService!.changeEvaluationSheetProp(question, answer);
  }

  onSaveAnswerSheet(finished: boolean) {
    const { answerSheetService, surveyCaseService, onSaveCallback, match } = this.props;
    const { serviceId, serviceType } = match.params;
    const { answerSheet } = answerSheetService!;
    const { surveyCase } = surveyCaseService!;
    if (!finished) {
      if (answerSheet.id && answerSheet.id.length) {
        answerSheetService!.saveAnswerSheet().then(() => {
          this.onCloseModal();
          if (onSaveCallback) onSaveCallback();
        }); // .then(this.onCloseModal);
      } else {
        answerSheetService!.changeAnswerSheetProp('surveyCaseId', surveyCase.id);
        answerSheetService!.openAnswerSheet(surveyCase.id, surveyCase.roundPart.round, serviceId, serviceType)
          .then((answerSheetId) => {
            answerSheetService!.changeAnswerSheetProp('id', answerSheetId);
            return answerSheetService!.saveAnswerSheet();
          }).then(() => {
            this.onCloseModal();
            if (onSaveCallback) onSaveCallback();
          }); // .then(this.onCloseModal);
      }
    }
    else if (finished) {
      if (answerSheet.id && answerSheet.id.length) {
        answerSheetService!.saveAnswerSheet()
          .then(()=>{
            answerSheetService!.submitAnswerSheet(answerSheet.id)
              .then(() => {
                this.onCloseModal();
                if (onSaveCallback) onSaveCallback();
              });
          });
        /*
        answerSheetService!.submitAnswerSheet(answerSheet.id)
          .then(this.onCloseModal);
         */
      } else {
         answerSheetService!.changeAnswerSheetProp('surveyCaseId', surveyCase.id);
         answerSheetService!.openAnswerSheet(surveyCase.id, surveyCase.roundPart.round, serviceId, serviceType)
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
  }

  onSubmitClick() {

    /*if(this.onCheckSurvey()){
      console.log('설문제출');
      reactConfirm({ title: '알림', message: '설문을 최종 제출 하시겠습니까?', onOk: () => this.onSaveAnswerSheet(true) });
    }*/
    reactConfirm({ title: '알림', message: '설문을 최종 제출 하시겠습니까?', onOk: () => this.onSaveAnswerSheet(true) });

  }

  onCheckSurvey() {
    const { answerSheetService } = this.props;
    const { answerSheet } = answerSheetService!;
    let valueCheck = 0;
    //console.log('1>>>>>>>> ',JSON.stringify(answerSheet));
    //console.log('2>>>>>>>> ',JSON.stringify(answerSheet.evaluationSheet));
    //console.log('2>>>>>>>> ',JSON.stringify(answerSheet.evaluationSheet.answers));

    if(answerSheet && answerSheet.evaluationSheet && answerSheet.evaluationSheet.answers.length > 0){
      answerSheet.evaluationSheet.answers.map((answer, index) => {
        //console.log(answer.answerItem);
        //console.log(answer.answerItem.itemNumbers);
        if(!answer.answerItem.itemNumbers || answer.answerItem.itemNumbers[0] === ''){
          valueCheck++;
        }
      });
      //console.log(valueCheck);
      if(valueCheck > 0){
        alert('빈 설문을 작성해주세요!');
        return false;
      }else{
        return true;
      }
    }else{
      alert('빈 설문을 작성해주세요!');
      return false;
    }
  }

  render() {
    //
    const { open } = this.state;
    const { surveyFormService, answerSheetService, trigger } = this.props;
    const { surveyForm } = surveyFormService!;
    const { answerMap, answerSheet } = answerSheetService!;
    const { questions, criterionList } = surveyForm!;
    const disabled = answerSheet && answerSheet.progress && answerSheet.progress === AnswerProgress.Complete;

    return (
      <Modal
        open={open}
        onOpen={this.onOpenModal}
        onClose={this.onCloseModal}
        trigger={trigger}
        className="base w1000 inner-scroll"
      >
        <Modal.Header className="res">
          {surveyForm && surveyForm.title}
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-80vh">
            <div className="content-wrap1">
              <List as="ol" className="num-list">
                {
                  questions && questions.length
                  && questions.map(question => {
                    let answerArea = null;
                    const answer = answerMap.get(question.sequence.toSequenceString()) || new AnswerItemModel();
                    const answerItems = question.answerItems;

                    switch (question.questionItemType) {
                      case QuestionItemType.Essay:
                        if (answerItems instanceof EssayQuestionItems) {
                          if (answerItems.maxLength <= 100) {
                            answerArea = (
                              <ShortAnswerView answer={answer} disabled={disabled} onSetAnswer={(value) => this.onSetAnswer(question, value)} />
                            );
                          }
                          else {
                            answerArea = (
                              <EssayView answer={answer} disabled={disabled} onSetAnswer={(value) => this.onSetAnswer(question, value)} />
                            );
                          }
                        }

                        break;
                      case QuestionItemType.Choice:
                        if (answerItems instanceof ChoiceQuestionItems) {
                          if (answerItems.multipleChoice) {
                            answerArea = (
                              <MultiChoiceView
                                answer={answer}
                                disabled={disabled}
                                items={answerItems.items || []}
                                onSetAnswer={(value) => this.onSetAnswer(question, value)}
                              />
                            );
                          }
                          else {
                            answerArea = (
                              <SingleChoiceView
                                question={question}
                                answer={answer}
                                disabled={disabled}
                                items={answerItems.items || []}
                                onSetAnswer={(value) => this.onSetAnswer(question, value)}
                              />
                            );
                          }
                        }

                        break;
                      case QuestionItemType.Criterion:
                        if (answerItems instanceof CriterionQuestionItems) {
                          const index = criterionList.map(criterion => criterion.number).findIndex(number => number === answerItems.criterionNumber);
                          const criterion = index >= 0 ? criterionList[index] : new CriterionModel();
                          answerArea = (
                            <CriterionView
                              question={question}
                              answer={answer}
                              disabled={disabled}
                              items={criterion.criteriaItems || []}
                              onSetAnswer={(value) => this.onSetAnswer(question, value)}
                            />
                          );
                        }
                        break;
                    }
                    return (
                      <List.Item as="li" key={question.sequence.toSequenceString()}>
                        <div className="ol-title">
                          {question.sentence}
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
          {
            !disabled && (
              <>
                <Button className="w190 pop s" onClick={() => this.onSaveAnswerSheet(false)}>저장</Button>
                <Button className="w190 pop p" onClick={() => this.onSubmitClick()}>제출</Button>
              </>
            )
          }
        </Modal.Actions>
      </Modal>
    );
  }
}

export default withRouter(AnswerSheetModalContainer);
// export default AnswerSheetModalContainer;

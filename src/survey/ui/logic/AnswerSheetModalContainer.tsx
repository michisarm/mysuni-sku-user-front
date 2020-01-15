import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';

import { Modal, List, Button } from 'semantic-ui-react';
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

interface Props {
  surveyCaseService?: SurveyCaseService
  surveyFormService?: SurveyFormService
  answerSheetService?: AnswerSheetService

  surveyId: string
  trigger?: React.ReactNode
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
    const { surveyCaseService, surveyFormService, answerSheetService, surveyId } = this.props;

    if (surveyId) {
      answerSheetService!.findAnswerSheet(surveyId);
      const surveyCase = await surveyCaseService!.findSurveyCase(surveyId);
      surveyFormService!.findSurveyForm(surveyCase.surveyFormId);
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
    const { answerSheetService, surveyCaseService } = this.props;
    const { answerSheet } = answerSheetService!;
    const { surveyCase } = surveyCaseService!;
    if (!finished) {
      if (answerSheet.id && answerSheet.id.length) {
        answerSheetService!.saveAnswerSheet();
      } else {
        answerSheetService!.changeAnswerSheetProp('surveyCaseId', surveyCase.id);
        answerSheetService!.openAnswerSheet(surveyCase.id, surveyCase.roundPart.round)
          .then(() => answerSheetService!.saveAnswerSheet())
          .then(this.onCloseModal);
      }
    }
    else if (finished) {
      if (answerSheet.id && answerSheet.id.length) {
        answerSheetService!.submitAnswerSheet(answerSheet.id);
      } else {
        answerSheetService!.changeAnswerSheetProp('surveyCaseId', surveyCase.id);
        answerSheetService!.openAnswerSheet(surveyCase.id, surveyCase.roundPart.round)
          .then(() => answerSheetService!.submitAnswerSheet(answerSheet.id))
          .then(this.onCloseModal);
      }
    }
  }

  render() {
    //
    const { open } = this.state;
    const { surveyFormService, answerSheetService, trigger } = this.props;
    const { surveyForm } = surveyFormService!;
    const { answerMap } = answerSheetService!;
    const { questions, criterionList } = surveyForm!;


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
                              <ShortAnswerView answer={answer} onSetAnswer={(value) => this.onSetAnswer(question, value)} />
                            );
                          }
                          else {
                            answerArea = (
                              <EssayView answer={answer} onSetAnswer={(value) => this.onSetAnswer(question, value)} />
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
          <Button className="w190 pop s" onClick={() => this.onSaveAnswerSheet(false)}>저장</Button>
          <Button className="w190 pop p" onClick={() => this.onSaveAnswerSheet(true)}>제출</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AnswerSheetModalContainer;

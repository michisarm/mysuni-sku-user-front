
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import depot from '@nara.drama/depot';
import { AnswerSheetModal, CubeReportModal } from 'assistant';
import { AnswerSheetModal as SurveyAnswerSheetModal } from 'survey';

import { DatePeriod } from 'shared/model';
import { CubeType } from 'personalcube/personalcube/model';
import { OverviewField } from 'personalcube';
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import StudentApi from '../../../shared/present/apiclient/StudentApi';
import LectureExam from '../../../shared/LectureExam';

interface Props {
  viewObject: any
  typeViewObject: any
}


interface State {
  multiple: boolean,
  categoryOpen: boolean,
}

@reactAutobind
@observer
class LectureOverviewView extends Component<Props, State> {
  //
  state = {
    multiple: false,
    categoryOpen: false,
  };

  panelRef = React.createRef<any>();
  itemRefs: any[] = [];

  examModal: any = null;
  surveyModal: any = null;
  reportModal: any = null;
  applyReferenceModel: any = null;

  componentDidMount() {
    //
    this.setMultiple();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.viewObject !== this.props.viewObject && prevProps.viewObject.subCategories !== this.props.viewObject.subCategories) {
      this.setMultiple();
    }
  }

  setItemsRef(element: any, index: number) {
    this.itemRefs[index] = element;
  }

  setMultiple() {
    //
    const { offsetHeight: panelHeight } = this.panelRef.current.getPanelRef();

    const categoriesHeight = this.itemRefs
      .map((itemRef) => itemRef.getPanelRef().offsetHeight)
      .reduce((prev, current) => prev + current, 0);

    if (categoriesHeight > panelHeight) {
      this.setState({ multiple: true });
    }
  }

  onToggleCategory() {
    //
    this.setState((state) => ({
      categoryOpen: !state.categoryOpen,
    }));
  }

  getPeriodDate(datePeriod: DatePeriod) {
    if (!datePeriod) return '';
    return `${datePeriod.startDate} ~ ${datePeriod.endDate}`;
  }

  onApplyReference() {
    this.applyReferenceModel.onOpenModal();
  }

  onReport() {
    this.reportModal.onOpenModal();
  }

  onTest() {
    this.examModal.onOpenModal();
  }

  // truefree 2020-04-03
  // Test 응시 못하는 조건일 땐 Alert 띄워 달라길래....
  onTestNotReady() {
    // reactAlert({ title: 'Test&Report 안내', message: '모든 컨텐츠를 학습해야 Test응시(Report제출)가 가능합니다.' });
  }

  onSurvey() {
    this.surveyModal.onOpenModal();
  }

  onClickDownloadReport(fileBoxId: string) {
    //
    depot.downloadDepot(fileBoxId);
  }

  testCallback() {
    const { viewObject } = this.props;
    // const { id: studentId } = student!;

    if (viewObject) {
      StudentApi.instance.modifyStudentForExam(viewObject.studentId, viewObject.examId)
        .then(() => {
          // if (this.init()) this.init();
        });
    }
  }

  renderSubCategories() {
    //
    const { viewObject } = this.props;

    if (!viewObject.subCategories || viewObject.subCategories.length < 1) {
      return null;
    }

    const subCategoriesPerMain = viewObject.subCategories.reduce((prev: any, subCategory: any) => {
      //
      const subCategories: string[] = prev[subCategory.college.name] || [];

      subCategories.push(subCategory.channel.name);
      return {
        ...prev,
        [subCategory.college.name]: subCategories,
      };
    }, {});

    return Object.entries(subCategoriesPerMain).map(([categoryName, subCategories]: any[], index: number) => (
      <OverviewField.Item
        key={`sub-category-${index}`}
        ref={(element) => this.setItemsRef(element, index)}
        title={categoryName}
        content={subCategories.join(' / ')}
      />
    ));
  }

  render() {
    //
    const { viewObject, typeViewObject } = this.props;

    if (!viewObject.category) {
      return null;
    }

    const { multiple, categoryOpen } = this.state;
    const cubeType = viewObject.cubeType;

    return (
      <OverviewField.Wrapper>
        <OverviewField.Description
          description={viewObject.description}
        />

        {
          viewObject && viewObject.examId && (
            <AnswerSheetModal
              examId={viewObject.examId}
              ref={examModal => this.examModal = examModal}
              onSaveCallback={this.testCallback}
            />
          )
        }

        <CubeReportModal
          downloadFileBoxId ={viewObject.reportFileBoxId}
          ref={reportModal => this.reportModal = reportModal}
          downloadReport = {this.onClickDownloadReport}
          rollBookId={viewObject.rollBookId}
        />

        {
          viewObject && viewObject.surveyId && (
            <SurveyAnswerSheetModal
              surveyId={viewObject.surveyId}
              surveyCaseId={viewObject.surveyCaseId}
              ref={surveyModal => this.surveyModal = surveyModal}
              // onSaveCallback={this.testCallback}
            />
          )
        }

        {
          viewObject && (
            <LectureExam
              onReport={viewObject.reportFileBoxId ? this.onReport : undefined}
              onTest={viewObject.examId ? this.onTest : undefined}
              onTestNotReady={viewObject.examId ? this.onTestNotReady : undefined}
              onSurvey={viewObject.surveyId ? this.onSurvey : undefined}
              viewObject={viewObject}
              type={viewObject.examType}
              name={viewObject.examName}
            />
          )
        }

        <OverviewField.FileDownload
          fileBoxIds={[ viewObject.fileBoxId ]}
        />

        <OverviewField.List
          ref={this.panelRef}
          className={classNames('sub-category fn-parents', { open: categoryOpen })}
          header={(
            <OverviewField.Title
              icon="category"
              text="서브채널"
            />
          )}
        >
          {this.renderSubCategories()}
          { multiple && (
            <Button
              icon
              className={classNames('right btn-blue fn-more-toggle', { 'btn-more': !categoryOpen, 'btn-hide': categoryOpen })}
              onClick={this.onToggleCategory}
            >
              {categoryOpen ? 'hide' : 'more'} <Icon className={classNames({ more2: !categoryOpen, hide2: categoryOpen })} />
            </Button>
          )}
        </OverviewField.List>

        { cubeType === CubeType.ClassRoomLecture && typeViewObject.applyingPeriod && (
          <OverviewField.List icon className="period-area">
            <OverviewField.Item
              titleIcon="period"
              title="수강신청기간"
              content={this.getPeriodDate(typeViewObject.applyingPeriod)}
            />
            <OverviewField.Item
              titleIcon="cancellation"
              title="취소가능기간"
              content={(
                <>
                  {this.getPeriodDate(typeViewObject.cancellablePeriod)}
                  { typeViewObject.cancellationPenalty && (
                    <div className="info">
                      No Show Penalty : {typeViewObject.cancellationPenalty}
                    </div>
                  )}
                </>
              )}
            />
          </OverviewField.List>
        )}

        {
          (typeViewObject.classrooms || viewObject.goal || viewObject.applicants
          || viewObject.organizerName) && (
            <OverviewField.List
              icon
              header={ typeViewObject.classrooms ? (
                <OverviewField.Table
                  titleIcon="series"
                  titleText="차수정보"
                  classrooms={typeViewObject.classrooms}
                />
              ) : null }
            >
              {
                viewObject.goal && (
                  <OverviewField.Item
                    titleIcon="goal"
                    title="학습목표"
                    content={viewObject.goal}
                  />
                ) || null
              }
              {
                viewObject.applicants && (
                  <OverviewField.Item
                    titleIcon="target"
                    title="대상"
                    content={viewObject.applicants}
                  />
                ) || null
              }
              {
                viewObject.organizerName && (
                  <OverviewField.Item
                    titleIcon="host"
                    title="교육기관 출처"
                    content={viewObject.organizerName}
                  />
                )
              }
            </OverviewField.List>
          ) || null
        }
        {
          (typeViewObject.location || viewObject.completionTerms || viewObject.guide)
          && (
            <OverviewField.List className="info-box2">
              { cubeType === CubeType.ClassRoomLecture && (
                <OverviewField.Item
                  title="장소"
                  content={typeViewObject.location}
                />
              )}
              <OverviewField.Item
                title="이수조건"
                content={viewObject.completionTerms}
              />
              <OverviewField.Item
                title="기타안내"
                className="quill-des"
                contentHtml={viewObject.guide}
              />
            </OverviewField.List>
          ) || null
        }
        <OverviewField.List className="tab-wrap" icon>
          <OverviewField.Item
            titleIcon="tag2"
            title="태그"
            content={viewObject.tags.map((tag: string, index: number) => (
              tag && <span key={`tag-${index}`} className="ui label tag">{tag}</span>
            ))}
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    );
  }
}

export default LectureOverviewView;

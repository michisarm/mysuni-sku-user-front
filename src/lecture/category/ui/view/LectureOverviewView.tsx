
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { DatePeriod } from 'shared';
import { CubeType } from 'personalcube/personalcube';
import { OverviewField } from 'personalcube';
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';


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
              tag && <Button key={`tag-${index}`} className="tag">{tag}</Button>
            ))}
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    );
  }
}

export default LectureOverviewView;

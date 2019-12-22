
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { DatePeriod, OverviewField } from 'shared';
import { CubeType } from 'personalcube/personalcube';
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';


interface Props {
  viewObject: any
  typeViewObject: any
}


interface State {
  categoryOpen: boolean,
}

@reactAutobind
@observer
class LectureOverviewView extends Component<Props, State> {
  //
  state = {
    categoryOpen: false,
  };

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

    const { categoryOpen } = this.state;
    const cubeType = viewObject.cubeType;

    return (
      <OverviewField.Wrapper>
        <OverviewField.Description
          description={viewObject.description}
        />
        <OverviewField.FileDownload
          fileBoxIds={[ viewObject.fileBoxId, typeViewObject.fileBoxId ]}
        />
        <OverviewField.List
          className={classNames('sub-category fn-parents', { open: categoryOpen })}
          header={(
            <OverviewField.Title
              icon="category"
              text="Sub Category"
            />
          )}
        >
          {this.renderSubCategories()}
          <Button
            icon
            className={classNames('right btn-blue fn-more-toggle', { 'btn-more': !categoryOpen, 'btn-hide': categoryOpen })}
            onClick={this.onToggleCategory}
          >
            {categoryOpen ? 'hide' : 'more'} <Icon className={classNames({ more2: !categoryOpen, hide2: categoryOpen })} />
          </Button>
        </OverviewField.List>

        { cubeType === CubeType.ClassRoomLecture && typeViewObject.applyingPeriod && (
          <OverviewField.List icon className="period-area">
            <OverviewField.Item
              titleIcon="period"
              title="Registration Period"
              content={this.getPeriodDate(typeViewObject.applyingPeriod)}
            />
            <OverviewField.Item
              titleIcon="cancellation"
              title="Cancellation Period"
              content={(
                <>
                  {this.getPeriodDate(typeViewObject.cancellablePeriod)}
                  { typeViewObject.cancellationPenalty && (
                    <div className="info">
                      Cancellation penalty : {typeViewObject.cancellationPenalty}
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
                  titleText="Class Series"
                  classrooms={typeViewObject.classrooms}
                />
              ) : null }
            >
              {
                viewObject.goal && (
                  <OverviewField.Item
                    titleIcon="goal"
                    title="Goal"
                    content={viewObject.goal}
                  />
                ) || null
              }
              {
                viewObject.applicants && (
                  <OverviewField.Item
                    titleIcon="target"
                    title="Target"
                    content={viewObject.applicants}
                  />
                ) || null
              }
              {
                viewObject.organizerName && (
                  <OverviewField.Item
                    titleIcon="host"
                    title="Host"
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
                  title="Place"
                  content={typeViewObject.location}
                />
              )}
              <OverviewField.Item
                title="Requirements"
                content={viewObject.completionTerms}
              />
              <OverviewField.Item
                title="Other Guides"
                className="quill-des"
                contentHtml={viewObject.guide}
              />
            </OverviewField.List>
          ) || null
        }
        <OverviewField.List className="tab-wrap" icon>
          <OverviewField.Item
            titleIcon="tag2"
            title="Tag"
            content={viewObject.tags.map((tag: string) => (
              tag && <Button className="tag">{tag}</Button>
            ))}
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    );
  }
}

export default LectureOverviewView;

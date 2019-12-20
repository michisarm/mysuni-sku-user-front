
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { DatePeriod, OverviewField } from 'shared';
import { CubeType, PersonalCubeModel } from 'personalcube/personalcube';
import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';


interface Props {
  personalCube: PersonalCubeModel,
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
    return `${datePeriod.startDate} ~ ${datePeriod.endDate}`;
  }

  renderSubCategories() {
    //
    const { personalCube } = this.props;

    if (!personalCube.subCategories || personalCube.subCategories.length < 1) {
      return null;
    }

    const subCategoriesPerMain = personalCube.subCategories.reduce((prev: any, subCategory) => {
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
    const { personalCube, viewObject, typeViewObject } = this.props;

    if (!personalCube.category) {
      return null;
    }

    const { categoryOpen } = this.state;
    const cubeType = personalCube.contents.type;

    return (
      <OverviewField.Wrapper>
        <OverviewField.Description
          description={viewObject.description}
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

        { cubeType === CubeType.ClassRoomLecture && (
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

        <OverviewField.List icon>
          <OverviewField.Item
            titleIcon="goal"
            title="Goal"
            content={viewObject.goal}
          />
          <OverviewField.Item
            titleIcon="target"
            title="Target"
            content={viewObject.applicants}
          />
          <OverviewField.Item
            titleIcon="host"
            title="Hots"
            content={viewObject.organizerName}
          />
        </OverviewField.List>

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
            contentHtml={viewObject.guide}
          />
        </OverviewField.List>

        <OverviewField.List className="tab-wrap" icon>
          <OverviewField.Item
            titleIcon="tag2"
            title="Tag"
            content={viewObject.tags}
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    );
  }
}

export default LectureOverviewView;

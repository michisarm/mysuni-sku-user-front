
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import CategoryContentWrapperView from '../view/CategoryContentWrapperView';
import SubCategoriesView from '../view/SubCategoriesView';
import LecturesWrapperView from '../view/LecturesWrapperView';
import SortingView from '../view/SortingView';
import SeeMoreButtonView from '../view/SeeMoreButtonView';
import { DescriptionView } from '../view/CategoryLecturesElementsView';


interface State {
  categoriesOpen: boolean,
  sorting: string,
}

@reactAutobind
class CategoryLecturesContainer extends Component<{}, State> {
  //
  static subCategories = [
    { id: 'AIFundamental', text: 'AI Fundamental', active: false },
    { id: 'SpeechAI', text: 'Speech AI', active: true },
  ];

  state = {
    categoriesOpen: false,
    sorting: 'latest',
  };


  onToggleCategories() {
    //
    this.setState((state) => ({
      categoriesOpen: !state.categoriesOpen,
    }));
  }

  onChangeSorting(e: any, data: any) {
    //
    this.setState({
      sorting: data.value,
    });
  }

  onClickSeeMore() {
    console.log('click see more');
  }

  render() {
    //
    const { subCategories } = CategoryLecturesContainer;
    const { categoriesOpen, sorting } = this.state;

    return (
      <CategoryContentWrapperView>
        <SubCategoriesView
          open={categoriesOpen}
          subCategories={subCategories}
          onToggle={this.onToggleCategories}
        />
        <LecturesWrapperView
          header={
            <>
              <DescriptionView
                name="AI College"
                count={230}
              />
              <SortingView
                value={sorting}
                onChange={this.onChangeSorting}
              />
            </>
          }
        >
          <>
            Content
            <SeeMoreButtonView
              onClick={this.onClickSeeMore}
            />
          </>
        </LecturesWrapperView>
      </CategoryContentWrapperView>
    );
  }
}

export default CategoryLecturesContainer;

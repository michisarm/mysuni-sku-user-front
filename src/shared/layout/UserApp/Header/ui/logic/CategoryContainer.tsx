
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import HeaderCategoryModel from '../../model/HeaderCategoryModel';
import CategoryMenuView from '../view/CategoryView';


interface Props extends RouteComponentProps {
}

interface State {
  categoryOpen: boolean,
  activeCategory?: HeaderCategoryModel,
}

@reactAutobind
class CategoryContainer extends Component<Props, State> {
  //
  state = {
    categoryOpen: false,
    activeCategory: undefined,
  };


  onClickCategory() {
    //
    this.setState((state) => ({
      categoryOpen: !state.categoryOpen,
    }));
  }

  onActiveCategory(e: any, category: HeaderCategoryModel) {
    //
    this.setState(() => ({
      activeCategory: category,
    }));
  }

  onClickSubCategory(e: any, category: HeaderCategoryModel) {
    if (category.path) {
      this.props.history.push(category.path);
    }
  }

  render() {
    //
    const categories: HeaderCategoryModel[] = [];
    const { categoryOpen, activeCategory } = this.state;

    return (
      <CategoryMenuView
        open={categoryOpen}
        categories={categories}
        activeCategory={activeCategory}
        onClick={this.onClickCategory}
        onActiveCategory={this.onActiveCategory}
        onClickSubCategory={this.onClickSubCategory}
      />
    );
  }
}

export default withRouter(CategoryContainer);

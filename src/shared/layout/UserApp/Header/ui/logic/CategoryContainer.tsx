
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import CategoryModel from '../../model/CategoryModel';
import CategoryMenuView from '../view/CategoryView';


interface Props extends RouteComponentProps {
}

interface State {
  categoryOpen: boolean,
  activeCategory?: { id: string, text: string, path?: string, sub?: [] },
}

@reactAutobind
class CategoryContainer extends Component<Props, State> {
  //
  static categories = [
    { id: 'ai', text: 'AI', sub: [
      { id: 'ai-all', path: '/lecture/category/ai', text: 'AI 전체보기' },
    ]},
    { id: 'dt', text: 'DT' },
    { id: 'happy', text: '행복' },
    { id: 'sv', text: 'SV' },
    { id: 'design', text: '혁신디자인' },
    { id: 'global', text: 'Global' },
    { id: 'leadership', text: 'Leadership' },
    { id: 'management', text: 'Management' },
  ];

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

  onActiveCategory(e: any, category: { id: string, text: string}) {
    //
    this.setState(() => ({
      activeCategory: category,
    }));
  }

  onClickSubCategory(e: any, category: CategoryModel) {
    if (category.path) {
      this.props.history.push(category.path);
    }
  }

  render() {
    //
    const { categories } = CategoryContainer;
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

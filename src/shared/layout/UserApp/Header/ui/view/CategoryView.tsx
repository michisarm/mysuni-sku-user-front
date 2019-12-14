
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button } from 'semantic-ui-react';
import CategoryModel from '../../model/CategoryModel';


interface Props {
  open: boolean,
  categories: CategoryModel[],
  activeCategory?: CategoryModel,
  onClick: (e: any) => void,
  onActiveCategory: (e: any, category: CategoryModel) => void,
  onClickSubCategory: (e: any, category: CategoryModel) => void,
}

@reactAutobind
class CategoryView extends Component<Props> {
  //
  render() {
    //
    const {
      open, categories, activeCategory,
      onClick, onActiveCategory, onClickSubCategory,
    } = this.props;

    return (
      <div className="g-menu-detail">
        <Button className="detail-open" onClick={onClick}>Category</Button>

        <div className="layer" style={{ display: open ? 'block' : 'none' }}>
          <div className="table-css">
            <div className="row head">
              <div className="cell v-middle">College</div>
              <div className="cell v-middle">Channel</div>
            </div>
            <div className="row body">
              <div className="cell vtop">
                <div className="select-area">
                  <div className="scrolling">
                    { categories.map((category) => (
                      <Button
                        key={`category_${category.id}`}
                        className={activeCategory && activeCategory.id === category.id ? 'active' : ''}
                        onClick={(e) => onActiveCategory(e, category)}
                      >
                        {category.text}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="cell vtop">
                <div className="select-area">
                  <div className="scrolling">
                    { activeCategory && Array.isArray(activeCategory.sub) && (
                      activeCategory.sub.map((subCategory) => (
                        <Button key={`sub-category-${subCategory.id}`} onClick={(e) => onClickSubCategory(e, subCategory)}>{subCategory.text}<span>(125)</span></Button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button className="close" onClick={onClick}>
            <i className="new16x17 icon"><span className="blind">close</span></i>
          </Button>
        </div>
      </div>
    );
  }
}

export default CategoryView;

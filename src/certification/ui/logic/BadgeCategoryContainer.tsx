
import React, {FunctionComponent} from 'react';
import {Button, Image} from 'semantic-ui-react';
import classNames from 'classnames';

interface BadgeCategoryProps {
  categories: any,
  categorySelection: string,
  onClickBadgeCategory: (e: any, categoryId: any) => void,
}

const BadgeCategoryContainer: FunctionComponent<BadgeCategoryProps> = ( { categories, categorySelection, onClickBadgeCategory} ) => {
  //
  return (
    <div className="badge-category">
      <ul>
        { categories.map( (category: any, index: number) => (
          <li
            key={`badge-category-${index}`}
            className={ classNames('fn-parent', (category.categoryId === categorySelection) ? 'on' : '' )}
          >
            <Button className="fn-click" onClick={(e) => onClickBadgeCategory(e, category.categoryId)}>
              <span className="icon">
                <span>
                  <Image src={category.iconUrl}/>
                </span>
              </span>
              <span className="title">
                <span className="ellipsis">{category.name}</span>
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BadgeCategoryContainer;

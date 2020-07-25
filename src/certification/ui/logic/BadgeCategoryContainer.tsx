
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
  const domainPath = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server'?
    window.location.protocol + '//' + window.location.host : 'http://ma.mysuni.sk.com';

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
                  <Image src={category.iconUrl && (domainPath + category.iconUrl)} alt={category.name}/>
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

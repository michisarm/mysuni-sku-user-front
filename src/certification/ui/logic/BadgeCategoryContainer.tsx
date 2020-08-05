
import React, {FunctionComponent} from 'react';
import {Button, Image} from 'semantic-ui-react';
import classNames from 'classnames';


enum CategoryImageURL {
  BADGE_CATEGORY_1 = '/static/media/AI_DT.png',
  BADGE_CATEGORY_2 = '/static/media/job.png',
  BADGE_CATEGORY_3 = '/static/media/biz.png',
  BADGE_CATEGORY_4 = '/static/media/happiness.png',
  BADGE_CATEGORY_5 = '/static/media/BM_design.png',
}

interface BadgeCategoryProps {
  categories: any,
  categorySelection: string,
  onClickBadgeCategory: (e: any, categoryId: any) => void,
}

const BadgeCategoryContainer: FunctionComponent<BadgeCategoryProps> = ( { categories, categorySelection, onClickBadgeCategory} ) => {
  //
  const domainPath = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server'?
    window.location.protocol + '//' + window.location.host : 'http://ma.mysuni.sk.com';

  console.log( categories );

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
                  {/*<Image src={domainPath + category.iconUrl} alt={category.name}/>*/}
                  {/*<Image src={category.iconUrl && (domainPath + category.iconUrl)} alt={category.name}/>*/}
                  <Image src={domainPath + CategoryImageURL[category.categoryId as keyof typeof CategoryImageURL]} alt={category.name}/>
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

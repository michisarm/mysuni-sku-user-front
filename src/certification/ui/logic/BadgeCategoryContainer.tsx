import React, { FunctionComponent } from 'react';
import { Button, Image } from 'semantic-ui-react';
import { getPublicUrl } from 'shared/helper/envHelper';
import classNames from 'classnames';

import ReactGA from 'react-ga';

enum CategoryImageURL {
  BDGCAT_AIDT = '/static/media/icon-ai.png',
  BDGCAT_JOB = '/static/media/icon-common.png',
  BDGCAT_BIZ = '/static/media/icon-biz.png',
  BDGCAT_HAPPY = '/static/media/icon-happy.png',
  BDGCAT_BM = '/static/media/icon-bmdesign.png',
}

interface BadgeCategoryProps {
  categories: any;
  categorySelection: string;
  onClickBadgeCategory: (e: any, categoryId: any) => void;
}

const BadgeCategoryContainer: FunctionComponent<BadgeCategoryProps> = ({
  categories,
  categorySelection,
  onClickBadgeCategory,
}) => {
  //
  const domainPath =
    process.env.NODE_ENV !== 'development'
      ? window.location.protocol + '//' + window.location.host
      : 'http://10.178.66.114';

  const gaOnClick = (category: any): void => {

    // react-ga 
    ReactGA.event({
      category: 'Certification',
      action: 'Click',
      label: `Certification-${category.name}`,
    });
  }

  return (
    <div className="badge-category">
      <ul>
        {categories.map((category: any, index: number) => (
          <li 
            key={`badge-category-${index}`}
            className={classNames(
              'fn-parent',
              category.categoryId === categorySelection ? 'on' : ''
            )}
            onClick={() => gaOnClick(category)}
          >
            <Button
              className="fn-click"
              onClick={e => onClickBadgeCategory(e, category.categoryId)}
            >
              <span className="icon">
                <span>
                  {/*<Image src={domainPath + category.iconUrl} alt={category.name}/>*/}
                  {/*<Image src={category.iconUrl && (domainPath + category.iconUrl)} alt={category.name}/>*/}
                  <Image
                    src={
                      // domainPath +
                      `${getPublicUrl()}${
                        CategoryImageURL[
                          category.categoryId as keyof typeof CategoryImageURL
                        ]
                      }`
                    }
                    alt={category.name}
                  />
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
